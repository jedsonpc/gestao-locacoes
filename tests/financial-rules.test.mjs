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

console.log("financial-rules.test.mjs OK");
