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

console.log("financial-rules.test.mjs OK");