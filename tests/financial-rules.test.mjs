import assert from "node:assert/strict";

function parseDate(value) {
  if (!value) return null;
  const [year, month, day] = String(value).split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function parseCompetence(value) {
  if (!value) return null;
  const [year, month] = String(value).split("-").map(Number);
  if (!year || !month) return null;
  return new Date(year, month - 1, 1);
}

function toMonthValue(date) {
  if (!date) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function normalizeCompetence(value, fallbackDate = new Date()) {
  const parsed = parseCompetence(value);
  if (parsed) return toMonthValue(parsed);
  const fallback = fallbackDate instanceof Date ? fallbackDate : parseDate(fallbackDate);
  return toMonthValue(fallback || new Date());
}

function getPaymentCompetenceDate(payment) {
  return parseCompetence(payment?.competence) || parseDate(payment?.paymentDate);
}

function getExpenseCompetenceDate(expense) {
  return parseCompetence(expense?.competence) || parseDate(expense?.expenseDate);
}

function isDateInPeriod(date, startDate, endDate) {
  return Boolean(date && startDate && endDate && date >= startDate && date <= endDate);
}

function firstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function normalizeRentAdjustments(record) {
  const rows = Array.isArray(record.rentAdjustments) ? record.rentAdjustments : [];
  return rows
    .map((row) => {
      const startDate = String(row.startDate || "").trim();
      const endDate = String(row.endDate || "").trim();
      const monthlyValue = Number(row.monthlyValue || 0);
      return {
        competence: normalizeCompetence(row.competence, startDate),
        startDate,
        endDate,
        monthlyValue,
      };
    })
    .filter((row) => row.startDate && row.endDate && row.monthlyValue > 0)
    .sort((left, right) => String(left.startDate).localeCompare(String(right.startDate)));
}

function getContractRentAdjustmentForCompetence(contract, competenceDate = new Date()) {
  const date = competenceDate instanceof Date ? competenceDate : parseCompetence(competenceDate);
  if (!date) return null;
  const monthStart = firstDayOfMonth(date);
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const competence = toMonthValue(date);
  const adjustments = normalizeRentAdjustments(contract);
  return adjustments
    .filter((adjustment) => {
      const start = parseDate(adjustment.startDate);
      const end = parseDate(adjustment.endDate);
      const adjustmentCompetence = normalizeCompetence(adjustment.competence, adjustment.startDate);
      return start && end && competence >= adjustmentCompetence && monthStart <= end && monthEnd >= start;
    })
    .sort((left, right) => String(right.competence || right.startDate).localeCompare(String(left.competence || left.startDate)))[0] || null;
}

function getContractMonthlyValueForCompetence(contract, competenceDate = new Date()) {
  const baseValue = Number(contract?.monthlyValue || 0);
  const date = competenceDate instanceof Date ? competenceDate : parseCompetence(competenceDate);
  if (!contract?.hasAdjustedRent || !date) return baseValue;
  const adjustment = getContractRentAdjustmentForCompetence(contract, date);
  return Number(adjustment?.monthlyValue || baseValue);
}

function getAutomaticReceivablePaymentGroupKey(payment, paymentDate, receivableContractKeys = new Set()) {
  const month = toMonthValue(paymentDate);
  const contractKey = payment.contractId ? `contract:${payment.contractId}:${month}` : "";
  const propertyKey = `property:${payment.propertyId}:${month}`;
  return contractKey && receivableContractKeys.has(contractKey) ? contractKey : propertyKey;
}

function buildAutomaticReceivablesForTest(state, period) {
  const receivables = [];
  const activeContracts = state.contracts.filter((contract) => {
    const start = parseDate(contract.startDate);
    const end = parseDate(contract.endDate);
    return start && end && start <= period.endDate && end >= period.startDate;
  });

  activeContracts.forEach((contract) => {
    period.months.forEach((monthDate) => {
      receivables.push({
        contract,
        property: state.properties.find((property) => property.id === contract.propertyId),
        month: toMonthValue(monthDate),
        dueDate: monthDate,
        expected: Number(contract.monthlyValue || 0),
        received: 0,
      });
    });
  });

  const receivableContractKeys = new Set(receivables.map((item) => `contract:${item.contract.id}:${item.month}`));
  const paymentDetailsByKey = {};
  const paymentsByPropertyMonth = state.payments.reduce((groups, payment) => {
    const paymentDate = getPaymentCompetenceDate(payment);
    if (!isDateInPeriod(paymentDate, period.startDate, period.endDate)) return groups;
    const key = getAutomaticReceivablePaymentGroupKey(payment, paymentDate, receivableContractKeys);
    groups[key] = (groups[key] || 0) + Number(payment.totalAmount || 0);
    paymentDetailsByKey[key] = paymentDetailsByKey[key] || [];
    paymentDetailsByKey[key].push(payment);
    return groups;
  }, {});

  receivables.forEach((item) => {
    const contractKey = `contract:${item.contract.id}:${item.month}`;
    const propertyKey = `property:${item.contract.propertyId}:${item.month}`;
    const contractAvailable = paymentsByPropertyMonth[contractKey] || 0;
    const propertyAvailable = paymentsByPropertyMonth[propertyKey] || 0;
    const propertyReceived = contractAvailable > 0
      ? Math.min(propertyAvailable, Math.max(item.expected - contractAvailable, 0))
      : Math.min(item.expected, propertyAvailable);
    item.received = contractAvailable + propertyReceived;
    const fromContract = Math.min(paymentsByPropertyMonth[contractKey] || 0, item.received);
    paymentsByPropertyMonth[contractKey] = Math.max((paymentsByPropertyMonth[contractKey] || 0) - fromContract, 0);
    paymentsByPropertyMonth[propertyKey] = Math.max((paymentsByPropertyMonth[propertyKey] || 0) - (item.received - fromContract), 0);
  });

  Object.entries(paymentsByPropertyMonth).forEach(([key, amount]) => {
    if (amount <= 0.005) return;
    const payment = paymentDetailsByKey[key]?.[0];
    if (!payment) return;
    const paymentDate = getPaymentCompetenceDate(payment);
    receivables.push({
      contract: state.contracts.find((contract) => contract.id === payment.contractId) || { id: payment.contractId || "", propertyId: payment.propertyId },
      property: state.properties.find((property) => property.id === payment.propertyId),
      month: key.split(":").pop() || toMonthValue(paymentDate),
      dueDate: parseDate(payment.paymentDate) || paymentDate,
      expected: amount,
      received: amount,
      note: "Lancamento recebido sem contrato ativo correspondente no periodo.",
    });
  });

  return receivables;
}

function getFinancialLaunchCategory(collectionName, record) {
  if (collectionName === "expenses") return String(record.expenseType || "").trim().toLowerCase();
  if (collectionName === "payments") return "receita";
  return "";
}

function getFinancialLaunchCompetence(collectionName, record) {
  if (collectionName === "expenses") return normalizeCompetence(record.competence, record.expenseDate);
  if (collectionName === "payments") return normalizeCompetence(record.competence, record.paymentDate);
  return "";
}

function findDuplicateFinancialLaunches(state, collectionName, record) {
  if (!["expenses", "payments"].includes(collectionName)) return [];
  const competence = getFinancialLaunchCompetence(collectionName, record);
  const category = getFinancialLaunchCategory(collectionName, record);
  return state[collectionName].filter((item) => {
    if (item.id === record.id) return false;
    if (getFinancialLaunchCompetence(collectionName, item) !== competence) return false;
    if (getFinancialLaunchCategory(collectionName, item) !== category) return false;
    if (collectionName === "payments") {
      return item.propertyId === record.propertyId && item.contractId === record.contractId;
    }
    return item.propertyId === record.propertyId;
  });
}

assert.equal(normalizeCompetence("", "2026-04-27"), "2026-04");
assert.equal(normalizeCompetence("2026-05", "2026-04-27"), "2026-05");

const state = {
  expenses: [
    { id: "expense-1", propertyId: "property-1", expenseType: "Condominio", expenseDate: "2026-04-10", competence: "2026-04" },
  ],
  payments: [
    { id: "payment-1", propertyId: "property-1", contractId: "contract-1", paymentDate: "2026-04-08", competence: "2026-04" },
  ],
};

assert.equal(findDuplicateFinancialLaunches(state, "expenses", {
  id: "expense-2",
  propertyId: "property-1",
  expenseType: "condominio",
  expenseDate: "2026-04-20",
  competence: "2026-04",
}).length, 1);

assert.equal(findDuplicateFinancialLaunches(state, "expenses", {
  id: "expense-3",
  propertyId: "property-1",
  expenseType: "Seguro",
  expenseDate: "2026-04-20",
  competence: "2026-04",
}).length, 0);

assert.equal(findDuplicateFinancialLaunches(state, "payments", {
  id: "payment-2",
  propertyId: "property-1",
  contractId: "contract-1",
  paymentDate: "2026-04-12",
  competence: "2026-04",
}).length, 1);

const room2705Contract = {
  monthlyValue: 3000,
  hasAdjustedRent: true,
  rentAdjustments: [{
    competence: "2022-01",
    startDate: "2021-12-17",
    endDate: "2022-09-23",
    monthlyValue: 3166.66,
  }],
};

assert.equal(getContractMonthlyValueForCompetence(room2705Contract, "2021-12"), 3000);
assert.equal(getContractMonthlyValueForCompetence(room2705Contract, "2022-01"), 3166.66);
assert.equal(getContractMonthlyValueForCompetence(room2705Contract, "2022-09"), 3166.66);
assert.equal(getContractMonthlyValueForCompetence(room2705Contract, "2022-10"), 3000);

const receivableContractKeys = new Set(["contract:current-contract-2706:2021-06"]);
assert.equal(getAutomaticReceivablePaymentGroupKey({
  propertyId: "property-1779817763051-6ce49e856f2418",
  contractId: "legacy-contract-2706",
}, parseCompetence("2021-06"), receivableContractKeys), "property:property-1779817763051-6ce49e856f2418:2021-06");

assert.equal(getAutomaticReceivablePaymentGroupKey({
  propertyId: "property-1779817763051-6ce49e856f2418",
  contractId: "current-contract-2706",
}, parseCompetence("2021-06"), receivableContractKeys), "contract:current-contract-2706:2021-06");

const erpPeriod2021 = {
  startDate: parseDate("2021-01-01"),
  endDate: parseDate("2021-12-31"),
};
const paidInNextMonth = { paymentDate: "2022-01-05", competence: "2021-12" };
const expensePaidInNextMonth = { expenseDate: "2022-01-10", competence: "2021-12" };

assert.equal(isDateInPeriod(getPaymentCompetenceDate(paidInNextMonth), erpPeriod2021.startDate, erpPeriod2021.endDate), true);
assert.equal(isDateInPeriod(parseDate(paidInNextMonth.paymentDate), erpPeriod2021.startDate, erpPeriod2021.endDate), false);
assert.equal(isDateInPeriod(getExpenseCompetenceDate(expensePaidInNextMonth), erpPeriod2021.startDate, erpPeriod2021.endDate), true);

const legacyContractState = {
  properties: [{ id: "property-2706", description: "Sala 2706" }],
  contracts: [{
    id: "legacy-contract-2706",
    propertyId: "property-2706",
    clientId: "client-1",
    startDate: "2014-10-30",
    endDate: "2016-08-29",
    monthlyValue: 2888.5,
  }],
  payments: [{
    propertyId: "property-2706",
    contractId: "legacy-contract-2706",
    paymentDate: "2021-06-29",
    competence: "2021-06",
    totalAmount: 2500,
  }],
};
const legacyReceivables = buildAutomaticReceivablesForTest({
  ...legacyContractState,
  clients: [{ id: "client-1", name: "BDO" }],
}, { ...erpPeriod2021, months: [parseCompetence("2021-06")] });
assert.equal(legacyReceivables.length, 1);
assert.equal(legacyReceivables[0].property.description, "Sala 2706");
assert.equal(legacyReceivables[0].month, "2021-06");
assert.equal(legacyReceivables[0].expected, 2500);
assert.equal(legacyReceivables[0].received, 2500);

const interestPaymentReceivables = buildAutomaticReceivablesForTest({
  properties: [{ id: "property-1402", description: "Sala 1402" }],
  clients: [{ id: "client-1", name: "Agencia Soma" }],
  contracts: [{
    id: "contract-1402",
    propertyId: "property-1402",
    clientId: "client-1",
    startDate: "2018-09-30",
    endDate: "2022-08-29",
    monthlyValue: 2800,
  }],
  payments: [{
    propertyId: "property-1402",
    contractId: "contract-1402",
    paymentDate: "2021-11-01",
    competence: "2021-11",
    amount: 3500,
    chargeAmount: 300,
    totalAmount: 3800,
  }],
}, { ...erpPeriod2021, months: [parseCompetence("2021-11")] });
assert.equal(interestPaymentReceivables.length, 1);
assert.equal(interestPaymentReceivables[0].expected, 2800);
assert.equal(interestPaymentReceivables[0].received, 3800);

console.log("financial-rules.test.mjs OK");
