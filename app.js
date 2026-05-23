const storageKey = "gestao-locacoes-v1";
const authKey = "gestao-locacoes-auth-v1";
const sessionKey = "gestao-locacoes-session-v1";
const reminderSessionKey = "gestao-locacoes-contract-reminder-v1";
const syncKey = "gestao-locacoes-sync-v1";
const companyName = "Imobiliaria Rio dos Passos Ltda";

const initialState = {
  properties: [],
  clients: [],
  contracts: [],
  expenses: [],
};

let state = loadState();
let syncConfig = loadSyncConfig();
let reportMode = "analytic";

const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "UTC",
});

const viewTitles = {
  dashboard: "Painel",
  properties: "Imoveis",
  clients: "Clientes",
  contracts: "Contratos",
  expenses: "Despesas",
  reports: "Relatorios",
  settings: "Acesso e nuvem",
};

const chargeRules = [
  {
    key: "condoFeeResponsible",
    label: "Taxa de condominio",
    kind: "monthly",
    day: 5,
    baseLabel: "Dia 05 de cada mes",
  },
  {
    key: "iptuResponsible",
    label: "IPTU",
    kind: "annual",
    month: 1,
    day: 10,
    baseLabel: "10/02",
  },
  {
    key: "spuResponsible",
    label: "SPU",
    kind: "annual",
    month: 5,
    day: 30,
    baseLabel: "30/06",
  },
  {
    key: "fireFeeResponsible",
    label: "Taxa de bombeiros",
    kind: "annual",
    month: 7,
    day: 31,
    baseLabel: "31/08",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  initializeAuth();
  bindNavigation();
  bindForms();
  bindUtilities();
  bindTableActions();
  renderAll();
});

function loadState() {
  const stored = localStorage.getItem(storageKey);
  if (!stored) return structuredClone(initialState);

  try {
    return { ...structuredClone(initialState), ...JSON.parse(stored) };
  } catch {
    return structuredClone(initialState);
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function loadSyncConfig() {
  try {
    return JSON.parse(localStorage.getItem(syncKey)) || { endpoint: "", token: "" };
  } catch {
    return { endpoint: "", token: "" };
  }
}

function saveSyncConfig() {
  localStorage.setItem(syncKey, JSON.stringify(syncConfig));
}

function initializeAuth() {
  saveAuthUsers(getStoredAccessUsers());

  document.body.classList.toggle("locked", sessionStorage.getItem(sessionKey) !== "active");
  const syncForm = document.getElementById("sync-form");
  if (syncForm) {
    syncForm.elements.endpoint.value = syncConfig.endpoint || "";
    syncForm.elements.token.value = syncConfig.token || "";
  }
  const accessForm = document.getElementById("access-form");
  if (accessForm) {
    accessForm.reset();
    accessForm.elements.id.value = "";
  }
  updateSyncStatus();
}

function getStoredAccessUsers() {
  try {
    const stored = JSON.parse(localStorage.getItem(authKey));
    if (Array.isArray(stored?.users) && stored.users.length) {
      return stored.users.map(normalizeAccessUser);
    }
    if (stored?.username && stored?.password) {
      return [normalizeAccessUser(stored)];
    }
  } catch {
    return getDefaultAccessUsers();
  }
  return getDefaultAccessUsers();
}

function getDefaultAccessUsers() {
  return [{ id: uid("user"), username: "admin", password: encodeCredential("admin123"), updatedAt: new Date().toISOString() }];
}

function normalizeAccessUser(user) {
  return {
    id: user.id || uid("user"),
    username: String(user.username || "admin").trim(),
    password: user.password || encodeCredential("admin123"),
    updatedAt: user.updatedAt || new Date().toISOString(),
  };
}

function saveAuthUsers(users) {
  localStorage.setItem(authKey, JSON.stringify({ users: users.map(normalizeAccessUser) }));
}

function encodeCredential(value) {
  return btoa(unescape(encodeURIComponent(String(value))));
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function bindNavigation() {
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.view;
      document.querySelectorAll(".nav-button").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".view").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(target).classList.add("active");
      document.getElementById("view-title").textContent = viewTitles[target];
      renderAll();
    });
  });
}

function bindForms() {
  document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    login(event.currentTarget);
  });

  document.getElementById("property-form").addEventListener("submit", (event) => {
    event.preventDefault();
    upsertFromForm(event.currentTarget, "properties", "property");
  });

  document.getElementById("client-form").addEventListener("submit", (event) => {
    event.preventDefault();
    upsertFromForm(event.currentTarget, "clients", "client");
  });

  document.getElementById("contract-form").addEventListener("submit", (event) => {
    event.preventDefault();
    upsertFromForm(event.currentTarget, "contracts", "contract", normalizeContract);
  });

  document.getElementById("expense-form").addEventListener("submit", (event) => {
    event.preventDefault();
    upsertFromForm(event.currentTarget, "expenses", "expense", normalizeExpense);
  });

  document.querySelectorAll("[data-reset]").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById(button.dataset.reset).reset();
      document.getElementById(button.dataset.reset).elements.id.value = "";
    });
  });

  document.getElementById("access-form").addEventListener("submit", (event) => {
    event.preventDefault();
    updateAccess(event.currentTarget);
  });

  document.getElementById("sync-form").addEventListener("submit", (event) => {
    event.preventDefault();
    updateSyncConfig(event.currentTarget);
  });

  ["report-property", "report-client", "report-status", "report-expense-type", "report-start", "report-end", "report-min-value", "report-max-value"].forEach((id) => {
    document.getElementById(id).addEventListener("input", renderReports);
    document.getElementById(id).addEventListener("change", renderReports);
  });

  document.querySelectorAll("[data-report-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      reportMode = button.dataset.reportMode;
      document.querySelectorAll("[data-report-mode]").forEach((item) => item.classList.toggle("active", item === button));
      renderReports();
    });
  });
}

function bindUtilities() {
  document.getElementById("seed-data").addEventListener("click", () => {
    state = createSampleData();
    saveState();
    renderAll();
  });

  document.getElementById("clear-data").addEventListener("click", () => {
    if (!confirm("Deseja apagar todos os dados cadastrados neste navegador?")) return;
    state = structuredClone(initialState);
    saveState();
    renderAll();
  });

  document.getElementById("export-csv").addEventListener("click", exportReportsCsv);
  document.getElementById("export-excel").addEventListener("click", exportReportsExcel);
  document.getElementById("export-pdf").addEventListener("click", exportReportsPdf);
  document.getElementById("open-property-document").addEventListener("click", openPropertyDocumentFromForm);
  document.getElementById("logout").addEventListener("click", logout);
  document.getElementById("sync-download").addEventListener("click", downloadFromCloud);
  document.getElementById("sync-upload").addEventListener("click", uploadToCloud);
}

function openPropertyDocumentFromForm() {
  const form = document.getElementById("property-form");
  const link = form.elements.documentLink.value.trim();
  if (!link) {
    alert("Informe o link da documentacao do imovel no Google Drive.");
    return;
  }
  try {
    const url = new URL(link);
    window.open(url.href, "_blank", "noopener");
  } catch {
    alert("Informe um link valido para abrir a documentacao.");
  }
}

function login(form) {
  const users = getStoredAccessUsers();
  const data = Object.fromEntries(new FormData(form).entries());
  const validAccess = users.some((user) => data.username.trim() === user.username && encodeCredential(data.password) === user.password);

  if (!validAccess) {
    setText("login-message", "Usuario ou senha invalidos.");
    return;
  }

  sessionStorage.setItem(sessionKey, "active");
  document.body.classList.remove("locked");
  form.reset();
  setText("login-message", "");
  renderAll();
}

function logout() {
  sessionStorage.removeItem(sessionKey);
  document.body.classList.add("locked");
}

function updateAccess(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const username = data.username.trim();
  const password = data.password.trim();
  const users = getStoredAccessUsers();
  const existingIndex = users.findIndex((user) => user.id === data.id);
  const duplicate = users.some((user) => user.username.toLowerCase() === username.toLowerCase() && user.id !== data.id);

  if (duplicate) {
    setText("settings-message", "Ja existe um usuario com este nome.");
    return;
  }
  if (!data.id && !password) {
    setText("settings-message", "Informe uma senha para cadastrar o usuario.");
    return;
  }
  if (password && password.length < 6) {
    setText("settings-message", "A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  const user = {
    id: data.id || uid("user"),
    username,
    password: password ? encodeCredential(password) : users[existingIndex]?.password,
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }

  saveAuthUsers(users);
  form.reset();
  form.elements.id.value = "";
  renderAccessUsers();
  setText("settings-message", "Usuario de acesso salvo.");
}

function updateSyncConfig(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  syncConfig = {
    endpoint: data.endpoint.trim(),
    token: data.token.trim(),
  };
  saveSyncConfig();
  updateSyncStatus();
  setText("settings-message", syncConfig.endpoint ? "Configuracao de nuvem salva." : "Sincronizacao online desativada.");
}

function upsertFromForm(form, collectionName, prefix, normalizer = (value) => value) {
  const data = Object.fromEntries(new FormData(form).entries());
  const record = normalizer({
    ...data,
    id: data.id || uid(prefix),
    updatedAt: new Date().toISOString(),
  });

  const index = state[collectionName].findIndex((item) => item.id === record.id);
  if (index >= 0) {
    state[collectionName][index] = record;
  } else {
    state[collectionName].push(record);
  }

  saveState();
  form.reset();
  form.elements.id.value = "";
  renderAll();
}

function normalizeContract(record) {
  return {
    ...record,
    monthlyValue: Number(record.monthlyValue || 0),
    dueDay: Number(record.dueDay || 1),
    condoFeeResponsible: record.condoFeeResponsible || "cliente",
    iptuResponsible: record.iptuResponsible || "cliente",
    spuResponsible: record.spuResponsible || "cliente",
    fireFeeResponsible: record.fireFeeResponsible || "cliente",
  };
}

function normalizeExpense(record) {
  return {
    ...record,
    amount: Number(record.amount || 0),
  };
}

async function downloadFromCloud() {
  if (!ensureSyncConfigured()) return;
  setText("settings-message", "Baixando dados da nuvem...");
  try {
    const response = await fetch(syncConfig.endpoint, { headers: getSyncHeaders() });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    state = sanitizeRemoteState(payload.state || payload);
    saveState();
    renderAll();
    setText("settings-message", "Dados baixados e aplicados com sucesso.");
  } catch (error) {
    setText("settings-message", `Nao foi possivel baixar: ${error.message}`);
  }
}

async function uploadToCloud() {
  if (!ensureSyncConfigured()) return;
  setText("settings-message", "Enviando dados para a nuvem...");
  try {
    const response = await fetch(syncConfig.endpoint, {
      method: "PUT",
      headers: { ...getSyncHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ company: companyName, updatedAt: new Date().toISOString(), state }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    setText("settings-message", "Dados enviados para a nuvem com sucesso.");
  } catch (error) {
    setText("settings-message", `Nao foi possivel enviar: ${error.message}`);
  }
}

function ensureSyncConfigured() {
  if (!syncConfig.endpoint) {
    setText("settings-message", "Informe e salve um endpoint HTTPS antes de sincronizar.");
    return false;
  }
  if (!syncConfig.endpoint.startsWith("https://")) {
    setText("settings-message", "Use um endpoint HTTPS para proteger os dados.");
    return false;
  }
  return true;
}

function getSyncHeaders() {
  return syncConfig.token ? { Authorization: `Bearer ${syncConfig.token}` } : {};
}

function sanitizeRemoteState(remoteState) {
  return {
    properties: Array.isArray(remoteState.properties) ? remoteState.properties : [],
    clients: Array.isArray(remoteState.clients) ? remoteState.clients : [],
    contracts: Array.isArray(remoteState.contracts) ? remoteState.contracts.map(normalizeContract) : [],
    expenses: Array.isArray(remoteState.expenses) ? remoteState.expenses.map(normalizeExpense) : [],
  };
}

function updateSyncStatus() {
  const status = document.getElementById("sync-status");
  if (!status) return;
  status.textContent = syncConfig.endpoint ? "Nuvem configurada" : "Offline local";
}

function renderAll() {
  populateSelects();
  renderDashboard();
  renderProperties();
  renderClients();
  renderContracts();
  renderExpenses();
  renderReports();
  renderAccessUsers();
  scheduleContractExpirationReminder();
}

function scheduleContractExpirationReminder() {
  if (document.body.classList.contains("locked")) return;
  if (sessionStorage.getItem(reminderSessionKey) === "shown") return;
  const expiringContracts = getExpiringContracts(30);
  if (!expiringContracts.length) return;
  sessionStorage.setItem(reminderSessionKey, "shown");
  setTimeout(() => showContractExpirationReminder(expiringContracts), 250);
}

function getExpiringContracts(daysAhead) {
  return state.contracts
    .map((contract) => ({
      contract,
      property: findProperty(contract.propertyId),
      client: findClient(contract.clientId),
      days: daysUntil(contract.endDate),
    }))
    .filter((item) => item.days >= 0 && item.days <= daysAhead)
    .sort((a, b) => a.days - b.days);
}

function showContractExpirationReminder(expiringContracts) {
  const visibleRows = expiringContracts.slice(0, 8).map((item) => {
    const property = item.property?.description || "Imovel nao localizado";
    const client = item.client?.name || "Cliente nao localizado";
    return `- ${property} | ${client} | vence em ${item.days} dia(s), em ${formatDate(item.contract.endDate)}`;
  });
  const extraCount = expiringContracts.length - visibleRows.length;
  const extraText = extraCount > 0 ? `\n\nE mais ${extraCount} contrato(s). Consulte o painel para ver todos.` : "";
  alert(`Lembrete: ${expiringContracts.length} contrato(s) vencem nos proximos 30 dias.\n\n${visibleRows.join("\n")}${extraText}`);
}

function populateSelects() {
  populateSelect(document.querySelector("#contract-form [name='propertyId']"), state.properties, "Selecione o imovel", "description");
  populateSelect(document.querySelector("#expense-form [name='propertyId']"), state.properties, "Selecione o imovel", "description");
  populateSelect(document.querySelector("#contract-form [name='clientId']"), state.clients, "Selecione o cliente", "name");
  populateSelect(document.getElementById("report-property"), state.properties, "Todos os imoveis", "description", true);
  populateSelect(document.getElementById("report-client"), state.clients, "Todos os clientes", "name", true);
}

function populateSelect(select, rows, placeholder, labelKey, includeAll = false) {
  const current = select.value;
  select.innerHTML = "";
  select.append(new Option(placeholder, includeAll ? "all" : ""));
  rows.forEach((row) => select.append(new Option(row[labelKey], row.id)));
  if ([...select.options].some((option) => option.value === current)) {
    select.value = current;
  }
}

function renderDashboard() {
  const activeContracts = state.contracts.filter((contract) => getContractStatus(contract).key !== "expired");
  const monthlyRevenue = activeContracts.reduce((sum, contract) => sum + contract.monthlyValue, 0);
  const expensesTotal = state.expenses.reduce((sum, expense) => sum + expense.amount, 0);

  setText("metric-properties", state.properties.length);
  setText("metric-active-contracts", activeContracts.length);
  setText("metric-revenue", formatMoney(monthlyRevenue));
  setText("metric-expenses", formatMoney(expensesTotal));

  const upcoming = getExpiringContracts(90);

  setText("upcoming-count", `${upcoming.length} itens`);
  renderList(
    "upcoming-list",
    upcoming,
    (item) => `
      <strong>${escapeHtml(item.property?.description || "Imovel nao localizado")}</strong>
      <span>${escapeHtml(item.client?.name || "Cliente nao localizado")} - termina em ${item.days} dias</span>
      <span>Vigencia ate ${formatDate(item.contract.endDate)} | Reajuste: ${escapeHtml(item.contract.adjustmentFrequency)} por ${escapeHtml(item.contract.adjustmentMethod)}</span>
    `,
  );

  renderPropertyResult();
}

function renderPropertyResult() {
  updateFinancialPeriodCaption();
  const rows = state.properties.map(getPropertyFinancials);

  renderTable(
    "property-result-body",
    rows,
    (row) => `
      <td>
        <strong>${escapeHtml(row.property.description)}</strong>
        <span class="mini-line">${row.area ? `${formatArea(row.area)} m2` : "Area nao informada"}</span>
      </td>
      <td>${renderPeriodValues(row.revenue)}</td>
      <td>${renderPeriodValues(row.expenses)}</td>
      <td>${renderPeriodValues(row.net, true)}</td>
      <td>${renderPeriodValues(row.netPerSquareMeter, true)}</td>
    `,
  );
}

function getPropertyFinancials(property) {
  const referenceDate = getFinancialReferenceDate();
  const currentMonthStart = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
  const currentMonthEnd = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + 1, 0);
  const yearStart = new Date(referenceDate.getFullYear(), 0, 1);
  const area = parseAreaValue(property.area);
  const propertyContracts = state.contracts.filter((contract) => contract.propertyId === property.id);

  const revenue = propertyContracts.reduce(
    (totals, contract) => {
      const monthlyValue = Number(contract.monthlyValue || 0);
      totals.current += contractOverlapsPeriod(contract, currentMonthStart, currentMonthEnd) ? monthlyValue : 0;
      totals.annual += monthlyValue * countContractMonthsInPeriod(contract, yearStart, referenceDate);
      totals.accumulated += monthlyValue * countContractMonthsInPeriod(contract, parseDate(contract.startDate), referenceDate);
      return totals;
    },
    createPeriodTotals(),
  );

  const propertyExpenses = state.expenses.filter((expense) => expense.propertyId === property.id);
  const expenses = {
    current: sumExpensesInPeriod(propertyExpenses, currentMonthStart, currentMonthEnd),
    annual: sumExpensesInPeriod(propertyExpenses, yearStart, today),
    accumulated: propertyExpenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
  };
  const net = subtractPeriodTotals(revenue, expenses);
  const netPerSquareMeter = area ? dividePeriodTotals(net, area) : createPeriodTotals();

  return { property, area, revenue, expenses, net, netPerSquareMeter };
}

function getFinancialReferenceDate() {
  const dates = [
    ...state.expenses.map((expense) => parseDate(expense.expenseDate)),
    ...state.contracts.flatMap((contract) => [contract.updatedAt ? new Date(contract.updatedAt) : null, parseDate(contract.startDate)]),
  ].filter(Boolean);
  return dates.length ? new Date(Math.max(...dates.map((date) => date.getTime()))) : new Date();
}

function getFinancialPeriodLabels() {
  const referenceDate = getFinancialReferenceDate();
  return {
    current: new Intl.DateTimeFormat("pt-BR", { month: "2-digit", year: "numeric" }).format(referenceDate),
    annual: String(referenceDate.getFullYear()),
    accumulated: "Acumulado",
  };
}

function updateFinancialPeriodCaption() {
  const caption = document.getElementById("financial-period-caption");
  if (!caption) return;
  const labels = getFinancialPeriodLabels();
  caption.textContent = `Competencia ${labels.current}, ano ${labels.annual} e acumulado`;
}

function createPeriodTotals() {
  return { current: 0, annual: 0, accumulated: 0 };
}

function subtractPeriodTotals(left, right) {
  return {
    current: left.current - right.current,
    annual: left.annual - right.annual,
    accumulated: left.accumulated - right.accumulated,
  };
}

function dividePeriodTotals(totals, divisor) {
  return {
    current: totals.current / divisor,
    annual: totals.annual / divisor,
    accumulated: totals.accumulated / divisor,
  };
}

function renderPeriodValues(totals, highlightBalance = false) {
  const labels = getFinancialPeriodLabels();
  return `
    <div class="period-values">
      ${renderPeriodValue(labels.current, totals.current, highlightBalance)}
      ${renderPeriodValue(labels.annual, totals.annual, highlightBalance)}
      ${renderPeriodValue(labels.accumulated, totals.accumulated, highlightBalance)}
    </div>
  `;
}

function renderPeriodValue(label, value, highlightBalance) {
  const tone = highlightBalance && value < 0 ? "negative" : highlightBalance && value > 0 ? "positive" : "";
  return `
    <span class="period-value ${tone}">
      <small>${label}</small>
      <strong>${formatMoney(value)}</strong>
    </span>
  `;
}

function sumExpensesInPeriod(expenses, startDate, endDate) {
  return expenses
    .filter((expense) => isDateInPeriod(parseDate(expense.expenseDate), startDate, endDate))
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
}

function countContractMonthsInPeriod(contract, periodStart, periodEnd) {
  const contractStart = parseDate(contract.startDate);
  const contractEnd = parseDate(contract.endDate);
  if (!contractStart || !contractEnd || !periodStart || !periodEnd) return 0;

  const start = maxDate(firstDayOfMonth(contractStart), firstDayOfMonth(periodStart));
  const end = minDate(firstDayOfMonth(contractEnd), firstDayOfMonth(periodEnd));
  if (start > end) return 0;
  return (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth() + 1;
}

function contractOverlapsPeriod(contract, periodStart, periodEnd) {
  const contractStart = parseDate(contract.startDate);
  const contractEnd = parseDate(contract.endDate);
  return Boolean(contractStart && contractEnd && contractStart <= periodEnd && contractEnd >= periodStart);
}

function isDateInPeriod(date, startDate, endDate) {
  return Boolean(date && startDate && endDate && date >= startDate && date <= endDate);
}

function parseDate(value) {
  if (!value) return null;
  const [year, month, day] = String(value).split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function firstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function maxDate(left, right) {
  return left > right ? left : right;
}

function minDate(left, right) {
  return left < right ? left : right;
}

function parseAreaValue(area) {
  const match = String(area || "").match(/\d+(?:[.,]\d+)*/);
  if (!match) return 0;
  const value = match[0];
  const normalized = value.includes(",")
    ? value.replace(/\./g, "").replace(",", ".")
    : value.replace(/\.(?=\d{3}(?:\D|$))/g, "");
  return Number(normalized) || 0;
}

function formatArea(value) {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(value);
}

function renderProperties() {
  renderTable(
    "properties-body",
    state.properties,
    (property) => `
      <td>${escapeHtml(property.description)}</td>
      <td>${escapeHtml(property.type)}</td>
      <td>${escapeHtml(property.area)}</td>
      <td>${escapeHtml(property.location)}</td>
      <td>${renderDocumentLink(property.documentLink)}</td>
      <td>${actions("properties", property.id, "property-form")}</td>
    `,
  );
}

function renderDocumentLink(link) {
  if (!link) return "-";
  return `<a href="${escapeHtml(link)}" target="_blank" rel="noopener">Abrir documento</a>`;
}

function renderClients() {
  renderTable(
    "clients-body",
    state.clients,
    (client) => `
      <td>${escapeHtml(client.document)}</td>
      <td>${escapeHtml(client.name)}</td>
      <td>${escapeHtml(client.contact)}</td>
      <td>${escapeHtml(client.phone)}</td>
      <td>${escapeHtml(client.email || "-")}</td>
      <td>${actions("clients", client.id, "client-form")}</td>
    `,
  );
}

function renderContracts() {
  renderTable(
    "contracts-body",
    state.contracts,
    (contract) => {
      const property = findProperty(contract.propertyId);
      const client = findClient(contract.clientId);
      return `
        <td>${escapeHtml(property?.description || "-")}</td>
        <td>${escapeHtml(client?.name || "-")}</td>
        <td>${formatDate(contract.startDate)} a ${formatDate(contract.endDate)}</td>
        <td>${formatMoney(contract.monthlyValue)}</td>
        <td>${escapeHtml(contract.adjustmentFrequency)} - ${escapeHtml(contract.adjustmentMethod)}</td>
        <td>${renderChargeSummary(contract)}</td>
        <td>
          <div class="actions-cell">
            <button class="small-button" data-whatsapp="${contract.id}" type="button">WhatsApp</button>
            <button class="small-button" data-whatsapp-attachment="${contract.id}" type="button">WhatsApp + anexo</button>
            <button class="small-button" data-email="${contract.id}" type="button">E-mail</button>
          </div>
        </td>
        <td>${actions("contracts", contract.id, "contract-form")}</td>
      `;
    },
  );

  document.querySelectorAll("[data-whatsapp]").forEach((button) => {
    button.addEventListener("click", () => openWhatsApp(button.dataset.whatsapp));
  });
  document.querySelectorAll("[data-email]").forEach((button) => {
    button.addEventListener("click", () => openEmail(button.dataset.email));
  });
  document.querySelectorAll("[data-whatsapp-attachment]").forEach((button) => {
    button.addEventListener("click", () => shareChargesAttachment(button.dataset.whatsappAttachment));
  });
}

function renderExpenses() {
  renderTable(
    "expenses-body",
    state.expenses,
    (expense) => `
      <td>${escapeHtml(findProperty(expense.propertyId)?.description || "-")}</td>
      <td>${escapeHtml(expense.expenseType)}</td>
      <td>${formatDate(expense.expenseDate)}</td>
      <td>${formatMoney(expense.amount)}</td>
      <td>${escapeHtml(expense.note || "-")}</td>
      <td>${actions("expenses", expense.id, "expense-form")}</td>
    `,
  );
}

function renderAccessUsers() {
  const body = document.getElementById("access-users-body");
  if (!body) return;
  renderTable(
    "access-users-body",
    getStoredAccessUsers(),
    (user) => `
      <td>${escapeHtml(user.username)}</td>
      <td>${formatDateTime(user.updatedAt)}</td>
      <td>
        <div class="actions-cell">
          <button class="small-button" data-edit-user="${user.id}" type="button">Editar</button>
          <button class="small-button" data-delete-user="${user.id}" type="button">Excluir</button>
        </div>
      </td>
    `,
  );
}

function renderReports() {
  updateReportModeVisibility();
  const propertyId = document.getElementById("report-property").value;
  const clientId = document.getElementById("report-client").value;
  const status = document.getElementById("report-status").value;
  const filters = getReportFilters();

  const rows = state.contracts
    .filter((contract) => propertyId === "all" || contract.propertyId === propertyId)
    .filter((contract) => clientId === "all" || contract.clientId === clientId)
    .filter((contract) => status === "all" || getContractStatus(contract).key === status)
    .filter((contract) => contractMatchesReportFilters(contract, filters))
    .map(toReportRow);

  renderReportMetrics(rows);
  renderPropertyReports(rows, filters);
  renderExpenseTypeReport(rows, filters);
  renderChargesReport(propertyId, clientId, status, filters);
  renderSummaryReport(rows, filters);

  renderTable(
    "reports-body",
    rows,
    (row) => `
      <td>${escapeHtml(row.property)}</td>
      <td>${escapeHtml(row.client)}</td>
      <td>${escapeHtml(row.contact)}</td>
      <td>${row.period}</td>
      <td>${formatMoney(row.monthlyValue)}</td>
      <td>${formatMoney(row.expenses)}</td>
      <td><span class="status ${row.statusKey}">${row.status}</span></td>
    `,
  );
}

function updateReportModeVisibility() {
  document.querySelectorAll(".analytic-report").forEach((item) => item.classList.toggle("hidden", reportMode !== "analytic"));
  const summary = document.getElementById("summary-report");
  if (summary) summary.classList.toggle("active", reportMode === "summary");
}

function getReportFilters() {
  return {
    expenseType: document.getElementById("report-expense-type").value,
    startDate: document.getElementById("report-start").value,
    endDate: document.getElementById("report-end").value,
    minValue: Number(document.getElementById("report-min-value").value || 0),
    maxValue: Number(document.getElementById("report-max-value").value || 0),
  };
}

function contractMatchesReportFilters(contract, filters) {
  const startsBeforeEnd = !filters.endDate || parseDate(contract.startDate) <= parseDate(filters.endDate);
  const endsAfterStart = !filters.startDate || parseDate(contract.endDate) >= parseDate(filters.startDate);
  const aboveMin = !filters.minValue || Number(contract.monthlyValue || 0) >= filters.minValue;
  const belowMax = !filters.maxValue || Number(contract.monthlyValue || 0) <= filters.maxValue;
  return startsBeforeEnd && endsAfterStart && aboveMin && belowMax;
}

function renderReportMetrics(rows) {
  const revenue = rows.reduce((sum, row) => sum + row.monthlyValue, 0);
  const ownerExpenses = rows.reduce((sum, row) => sum + row.ownerExpenses, 0);
  const tenantCharges = getFilteredChargeRows().filter((row) => row.responsible === "cliente" && rows.some((reportRow) => reportRow.contractId === row.contractId)).length;
  const averageTicket = rows.length ? revenue / rows.length : 0;
  const propertyTotals = rows.reduce((totals, row) => {
    totals[row.property] = (totals[row.property] || 0) + row.monthlyValue;
    return totals;
  }, {});
  const topProperty = Object.entries(propertyTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  const netMargin = revenue ? ((revenue - ownerExpenses) / revenue) * 100 : 0;

  setText("report-revenue", formatMoney(revenue));
  setText("report-owner-expenses", formatMoney(ownerExpenses));
  setText("report-net-revenue", formatMoney(revenue - ownerExpenses));
  setText("report-tenant-charges", tenantCharges);
  setText("report-contract-count", rows.length);
  setText("report-average-ticket", formatMoney(averageTicket));
  setText("report-top-property", topProperty);
  setText("report-net-margin", `${formatNumber(netMargin)}%`);
}

function renderSummaryReport(reportRows, filters = getReportFilters()) {
  const summary = getSummaryReportData(reportRows, filters);
  setText("summary-period", getSummaryPeriodLabel(filters));
  setText("summary-properties", summary.propertyCount);
  setText("summary-clients", summary.clientCount);
  setText("summary-active-contracts", summary.activeContracts);
  setText("summary-ending-contracts", summary.endingContracts);
  setText("summary-gross-revenue", formatMoney(summary.revenue));
  setText("summary-entered-expenses", formatMoney(summary.expenses));
  setText("summary-net-result", formatMoney(summary.netResult));
  setText("summary-net-margin", `${formatNumber(summary.netMargin)}%`);

  renderTable(
    "summary-report-body",
    [
      { indicator: "Carteira filtrada", result: `${summary.contractCount} contrato(s)`, note: `${summary.activeContracts} ativo(s), ${summary.endingContracts} a vencer e ${summary.expiredContracts} encerrado(s).` },
      { indicator: "Receita bruta mensal", result: formatMoney(summary.revenue), note: `Ticket medio de ${formatMoney(summary.averageTicket)} por contrato filtrado.` },
      { indicator: "Despesas apropriadas", result: formatMoney(summary.expenses), note: `${summary.expenseCount} lancamento(s) de despesa no recorte atual.` },
      { indicator: "Resultado liquido", result: formatMoney(summary.netResult), note: `Margem gerencial de ${formatNumber(summary.netMargin)}% sobre a receita filtrada.` },
      { indicator: "Maior receita", result: summary.topProperty, note: summary.topProperty === "-" ? "Sem imovel com receita no filtro." : "Imovel com maior participacao na receita bruta." },
      { indicator: "Encargos do cliente", result: `${summary.tenantCharges} encargo(s)`, note: "Quantidade de impostos e taxas sob responsabilidade do cliente." },
    ],
    (row) => `
      <td>${escapeHtml(row.indicator)}</td>
      <td>${escapeHtml(row.result)}</td>
      <td>${escapeHtml(row.note)}</td>
    `,
  );

  renderTable(
    "summary-property-body",
    summary.propertyRows,
    (row) => `
      <td>${escapeHtml(row.property)}</td>
      <td>${formatMoney(row.revenue)}</td>
      <td>${formatMoney(row.expenses)}</td>
      <td>${formatMoney(row.netResult)}</td>
      <td>${formatNumber(row.participation)}%</td>
    `,
  );
}

function getSummaryReportData(reportRows, filters = getReportFilters()) {
  const revenue = reportRows.reduce((sum, row) => sum + row.monthlyValue, 0);
  const clientIds = new Set(reportRows.map((row) => row.clientId));
  const reportPropertyIds = new Set(reportRows.map((row) => row.propertyId));
  const expenses = getFilteredExpenses(filters).filter((expense) => reportPropertyIds.size ? reportPropertyIds.has(expense.propertyId) : true);
  const propertyIds = new Set([...reportPropertyIds, ...expenses.map((expense) => expense.propertyId)]);
  const expensesTotal = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const activeContracts = reportRows.filter((row) => row.statusKey === "active").length;
  const endingContracts = reportRows.filter((row) => row.statusKey === "ending").length;
  const expiredContracts = reportRows.filter((row) => row.statusKey === "expired").length;
  const tenantCharges = getFilteredChargeRows().filter((row) => row.responsible === "cliente" && reportRows.some((reportRow) => reportRow.contractId === row.contractId)).length;
  const averageTicket = reportRows.length ? revenue / reportRows.length : 0;
  const netResult = revenue - expensesTotal;
  const netMargin = revenue ? (netResult / revenue) * 100 : 0;
  const propertyRows = [...propertyIds]
    .map((propertyId) => {
      const property = findProperty(propertyId);
      const propertyRevenue = reportRows.filter((row) => row.propertyId === propertyId).reduce((sum, row) => sum + row.monthlyValue, 0);
      const propertyExpenses = expenses.filter((expense) => expense.propertyId === propertyId).reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
      return {
        property: property?.description || "-",
        revenue: propertyRevenue,
        expenses: propertyExpenses,
        netResult: propertyRevenue - propertyExpenses,
        participation: revenue ? (propertyRevenue / revenue) * 100 : 0,
      };
    })
    .sort((a, b) => b.revenue - a.revenue);

  return {
    revenue,
    expenses: expensesTotal,
    expenseCount: expenses.length,
    netResult,
    netMargin,
    propertyCount: propertyIds.size,
    clientCount: clientIds.size,
    contractCount: reportRows.length,
    activeContracts,
    endingContracts,
    expiredContracts,
    tenantCharges,
    averageTicket,
    topProperty: propertyRows[0]?.property || "-",
    propertyRows,
  };
}

function getSummaryPeriodLabel(filters = getReportFilters()) {
  if (filters.startDate && filters.endDate) return `${formatDate(filters.startDate)} a ${formatDate(filters.endDate)}`;
  if (filters.startDate) return `A partir de ${formatDate(filters.startDate)}`;
  if (filters.endDate) return `Ate ${formatDate(filters.endDate)}`;
  return "Todos os periodos";
}

function renderPropertyReports(reportRows, filters = getReportFilters()) {
  const rows = state.properties
    .map((property) => {
      const propertyContracts = reportRows.filter((row) => row.propertyId === property.id);
      const revenue = propertyContracts.reduce((sum, row) => sum + row.monthlyValue, 0);
      const enteredExpenses = getEnteredExpenses(property.id, filters);
      const ownerCharges = propertyContracts.reduce((sum, row) => sum + row.ownerChargeCount, 0);
      const ownerExpenses = enteredExpenses;
      return {
        property: property.description,
        revenue,
        enteredExpenses,
        ownerCharges,
        netRevenue: revenue - ownerExpenses,
      };
    })
    .filter((row) => row.revenue > 0 || row.enteredExpenses > 0 || row.ownerCharges > 0);

  renderTable(
    "property-report-body",
    rows,
    (row) => `
      <td>${escapeHtml(row.property)}</td>
      <td>${formatMoney(row.revenue)}</td>
      <td>${formatMoney(row.enteredExpenses)}</td>
      <td>${row.ownerCharges} taxa(s)</td>
      <td>${formatMoney(row.netRevenue)}</td>
    `,
  );

  renderChart("expense-chart", rows, "enteredExpenses", "expense");
  renderChart("net-chart", rows, "netRevenue", "net");
}

function renderExpenseTypeReport(reportRows, filters = getReportFilters()) {
  const propertyIds = new Set(reportRows.map((row) => row.propertyId));
  const expenses = getFilteredExpenses(filters).filter((expense) => propertyIds.has(expense.propertyId));
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const grouped = expenses.reduce((rows, expense) => {
    const key = expense.expenseType || "Outros";
    rows[key] ||= { expenseType: key, count: 0, total: 0 };
    rows[key].count += 1;
    rows[key].total += Number(expense.amount || 0);
    return rows;
  }, {});

  renderTable(
    "expense-type-report-body",
    Object.values(grouped).sort((a, b) => b.total - a.total),
    (row) => `
      <td>${escapeHtml(row.expenseType)}</td>
      <td>${row.count}</td>
      <td>${formatMoney(row.total)}</td>
      <td>${total ? formatNumber((row.total / total) * 100) : "0"}%</td>
    `,
  );
}

function renderChargesReport(propertyId, clientId, status, filters = getReportFilters()) {
  const rows = getFilteredChargeRows(propertyId, clientId, status).filter((row) => contractMatchesReportFilters(row.contract, filters));

  renderTable(
    "charges-report-body",
    rows,
    (row) => `
      <td>${escapeHtml(row.property)}</td>
      <td>${escapeHtml(row.client)}</td>
      <td>${escapeHtml(row.charge)}</td>
      <td>${escapeHtml(capitalize(row.responsible))}</td>
      <td>${escapeHtml(row.baseDue)}</td>
      <td>${formatDate(row.adjustedDue)}</td>
    `,
  );
}

function renderChart(id, rows, valueKey, tone) {
  const target = document.getElementById(id);
  const visibleRows = rows.filter((row) => row[valueKey] !== 0);
  if (!visibleRows.length) {
    target.innerHTML = document.getElementById("empty-template").innerHTML;
    return;
  }

  const max = Math.max(...visibleRows.map((row) => Math.abs(row[valueKey])));
  target.innerHTML = visibleRows
    .map((row) => {
      const width = Math.max(3, Math.round((Math.abs(row[valueKey]) / max) * 100));
      const barClass = [
        "chart-bar",
        tone === "expense" ? "expense" : "",
        row[valueKey] < 0 ? "negative" : "",
      ].join(" ");
      return `
        <div class="chart-row">
          <div class="chart-label">
            <span>${escapeHtml(row.property)}</span>
            <strong>${formatMoney(row[valueKey])}</strong>
          </div>
          <div class="chart-track">
            <div class="${barClass}" style="width: ${width}%"></div>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderChargeSummary(contract) {
  return chargeRules
    .map((rule) => {
      const responsible = contract[rule.key] || "cliente";
      return `<span class="mini-line">${escapeHtml(rule.label)}: ${escapeHtml(capitalize(responsible))}</span>`;
    })
    .join("");
}

function renderTable(bodyId, rows, rowTemplate) {
  const body = document.getElementById(bodyId);
  if (!rows.length) {
    body.innerHTML = `<tr><td colspan="8">${document.getElementById("empty-template").innerHTML}</td></tr>`;
    return;
  }
  body.innerHTML = rows.map((row) => `<tr>${rowTemplate(row)}</tr>`).join("");
}

function renderList(id, rows, template) {
  const target = document.getElementById(id);
  if (!rows.length) {
    target.innerHTML = document.getElementById("empty-template").innerHTML;
    return;
  }
  target.innerHTML = rows.map((row) => `<article class="list-item">${template(row)}</article>`).join("");
}

function actions(collection, id, formId) {
  return `
    <div class="actions-cell">
      <button class="small-button" data-edit="${collection}:${id}:${formId}" type="button">Editar</button>
      <button class="small-button" data-delete="${collection}:${id}" type="button">Excluir</button>
    </div>
  `;
}

function editRecord(collection, id, formId) {
  const record = state[collection].find((item) => item.id === id);
  const form = document.getElementById(formId);
  if (!record) return;

  Object.entries(record).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value;
  });
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindTableActions() {
  document.querySelector(".content").addEventListener("click", (event) => {
    const editUserButton = event.target.closest("[data-edit-user]");
    if (editUserButton) {
      editAccessUser(editUserButton.dataset.editUser);
      return;
    }

    const deleteUserButton = event.target.closest("[data-delete-user]");
    if (deleteUserButton) {
      deleteAccessUser(deleteUserButton.dataset.deleteUser);
      return;
    }

    const editButton = event.target.closest("[data-edit]");
    if (editButton) {
      const [collection, id, formId] = editButton.dataset.edit.split(":");
      editRecord(collection, id, formId);
      return;
    }

    const deleteButton = event.target.closest("[data-delete]");
    if (deleteButton) {
      const [collection, id] = deleteButton.dataset.delete.split(":");
      deleteRecord(collection, id);
    }
  });
}

function deleteRecord(collection, id) {
  if (!confirm("Deseja excluir este registro?")) return;
  state[collection] = state[collection].filter((item) => item.id !== id);
  saveState();
  renderAll();
}

function editAccessUser(id) {
  const user = getStoredAccessUsers().find((item) => item.id === id);
  const form = document.getElementById("access-form");
  if (!user || !form) return;
  form.elements.id.value = user.id;
  form.elements.username.value = user.username;
  form.elements.password.value = "";
  form.scrollIntoView({ behavior: "smooth", block: "start" });
  setText("settings-message", "Informe uma nova senha para alterar ou salve sem senha para manter a atual.");
}

function deleteAccessUser(id) {
  const users = getStoredAccessUsers();
  const user = users.find((item) => item.id === id);
  if (!user) return;
  if (users.length === 1) {
    setText("settings-message", "Mantenha pelo menos um usuario de acesso.");
    return;
  }
  if (!confirm(`Deseja excluir o usuario ${user.username}?`)) return;
  saveAuthUsers(users.filter((item) => item.id !== id));
  renderAccessUsers();
  setText("settings-message", "Usuario excluido.");
}

function toReportRow(contract) {
  const property = findProperty(contract.propertyId);
  const client = findClient(contract.clientId);
  const expenses = state.expenses
    .filter((expense) => expense.propertyId === contract.propertyId)
    .reduce((sum, expense) => sum + expense.amount, 0);
  const ownerChargeCount = chargeRules.filter((rule) => (contract[rule.key] || "cliente") === "locador").length;
  const status = getContractStatus(contract);

  return {
    contractId: contract.id,
    propertyId: contract.propertyId,
    clientId: contract.clientId,
    property: property?.description || "-",
    client: client?.name || "-",
    contact: client ? `${client.contact} | ${client.phone}` : "-",
    period: `${formatDate(contract.startDate)} a ${formatDate(contract.endDate)}`,
    monthlyValue: contract.monthlyValue,
    expenses,
    ownerExpenses: expenses,
    ownerChargeCount,
    status: status.label,
    statusKey: status.key,
  };
}

function getContractStatus(contract) {
  const days = daysUntil(contract.endDate);
  if (days < 0) return { key: "expired", label: "Encerrado" };
  if (days <= 90) return { key: "ending", label: "A vencer" };
  return { key: "active", label: "Ativo" };
}

function openWhatsApp(contractId) {
  const message = buildContractMessage(contractId);
  if (!message.client?.phone) {
    alert("Cliente sem telefone cadastrado.");
    return;
  }
  const phone = message.client.phone.replace(/\D/g, "");
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message.text)}`, "_blank");
}

function openEmail(contractId) {
  const message = buildContractMessage(contractId);
  if (!message.client?.email) {
    alert("Cliente sem e-mail cadastrado.");
    return;
  }
  const subject = encodeURIComponent("Aviso sobre contrato de locacao");
  const body = encodeURIComponent(message.text);
  window.location.href = `mailto:${message.client.email}?subject=${subject}&body=${body}`;
}

async function shareChargesAttachment(contractId) {
  const message = buildContractMessage(contractId);
  const attachment = buildChargesAttachment(contractId);
  if (!attachment || !message.client?.phone) {
    alert("Contrato sem cliente, telefone ou taxas para gerar anexo.");
    return;
  }

  const file = new File([attachment.csv], attachment.fileName, { type: "text/csv" });
  const sharePayload = {
    title: "Impostos e taxas do contrato",
    text: message.text,
    files: [file],
  };

  if (navigator.canShare && navigator.canShare(sharePayload) && navigator.share) {
    await navigator.share(sharePayload);
    return;
  }

  downloadTextFile(attachment.csv, attachment.fileName, "text/csv;charset=utf-8");
  openWhatsApp(contractId);
  alert("O anexo foi baixado. No WhatsApp, clique no icone de anexar e selecione o arquivo gerado.");
}

function buildChargesAttachment(contractId) {
  const contract = state.contracts.find((item) => item.id === contractId);
  if (!contract) return null;

  const property = findProperty(contract.propertyId);
  const client = findClient(contract.clientId);
  const rows = chargeRules.map((rule) => {
    const dueDate = getChargeDueDate(rule);
    return [
      property?.description || "-",
      client?.name || "-",
      rule.label,
      capitalize(contract[rule.key] || "cliente"),
      rule.baseLabel,
      formatDate(toIsoDate(adjustToPreviousBusinessDay(dueDate))),
    ];
  });

  const csvRows = [
    ["Imovel", "Cliente", "Imposto ou taxa", "Responsavel", "Vencimento base", "Vencimento ajustado"],
    ...rows,
  ];
  const csv = csvRows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(";")).join("\n");
  const safeName = `${property?.description || "imovel"}-${client?.name || "cliente"}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

  return {
    csv,
    fileName: `impostos-taxas-${safeName || "contrato"}.csv`,
  };
}

function downloadTextFile(content, fileName, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function buildContractMessage(contractId) {
  const contract = state.contracts.find((item) => item.id === contractId);
  const client = findClient(contract?.clientId);
  const property = findProperty(contract?.propertyId);
  const dueDate = nextDueDate(contract?.dueDay);
  const text = `Ola, ${client?.contact || client?.name || ""}. Lembramos que o contrato do imovel ${property?.description || ""} possui aluguel mensal de ${formatMoney(contract?.monthlyValue || 0)} com vencimento em ${formatDate(dueDate)}. Vigencia atual: ${formatDate(contract?.startDate)} a ${formatDate(contract?.endDate)}.`;
  return { client, text };
}

function nextDueDate(day) {
  const today = new Date();
  const due = new Date(today.getFullYear(), today.getMonth(), Math.min(Number(day || 1), 28));
  if (due < today) due.setMonth(due.getMonth() + 1);
  return due.toISOString().slice(0, 10);
}

function exportReportsCsv() {
  const rows = reportMode === "summary"
    ? [["Indicador", "Resultado", "Leitura gerencial"]]
    : [["Imovel", "Cliente", "Contato", "Vigencia", "Valor mensal", "Despesa vinculada", "Status"]];
  const selector = reportMode === "summary" ? "#summary-report-body tr" : "#reports-body tr";
  document.querySelectorAll(selector).forEach((tr) => {
    const cells = [...tr.querySelectorAll("td")].map((td) => td.innerText.replace(/\s+/g, " ").trim());
    if (cells.length) rows.push(cells);
  });

  const csv = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(";")).join("\n");
  downloadTextFile(csv, reportMode === "summary" ? "relatorio-gerencial-locacoes.csv" : "relatorio-locacoes.csv", "text/csv;charset=utf-8");
}

function exportReportsExcel() {
  renderReports();
  const analyticTables = [
    { title: "Resultado por imovel", selector: "#property-report-body", headers: ["Imovel", "Receita mensal", "Despesas apropriadas", "Taxas do locador", "Receita liquida"] },
    { title: "Despesas por tipo", selector: "#expense-type-report-body", headers: ["Despesa", "Quantidade", "Total", "Participacao"] },
    { title: "Encargos e vencimentos", selector: "#charges-report-body", headers: ["Imovel", "Cliente", "Encargo", "Responsavel", "Vencimento base", "Vencimento ajustado"] },
    { title: "Contratos filtrados", selector: "#reports-body", headers: ["Imovel", "Cliente", "Contato", "Vigencia", "Valor mensal", "Despesa vinculada", "Status"] },
  ];
  const summaryTables = [
    { title: "Resumo executivo", selector: "#summary-report-body", headers: ["Indicador", "Resultado", "Leitura gerencial"] },
    { title: "Resultado gerencial por imovel", selector: "#summary-property-body", headers: ["Imovel", "Receita", "Despesas", "Resultado", "Participacao na receita"] },
  ];
  const tables = reportMode === "summary" ? summaryTables : analyticTables;
  const sections = tables.map((table) => `
    <h2>${escapeHtml(table.title)}</h2>
    <table>
      <thead><tr>${table.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
      <tbody>${document.querySelector(table.selector).innerHTML}</tbody>
    </table>
  `);
  const workbook = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="UTF-8" /></head>
      <body>${sections.join("<br />")}</body>
    </html>
  `;
  downloadTextFile(workbook, reportMode === "summary" ? "relatorio-gerencial-locacoes.xls" : "relatorio-locacoes.xls", "application/vnd.ms-excel;charset=utf-8");
}

function exportReportsPdf() {
  renderReports();
  const report = document.getElementById("reports").cloneNode(true);
  report.querySelectorAll("button").forEach((button) => button.remove());
  const styles = document.querySelector("link[rel='stylesheet']").href;
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Permita pop-ups para gerar o PDF.");
    return;
  }

  printWindow.document.write(`
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Relatorio - ${companyName}</title>
        <link rel="stylesheet" href="${styles}" />
        <style>
          body { background: #fff; padding: 24px; }
          .view { display: grid; gap: 18px; }
          .print-header { display: flex; align-items: center; gap: 18px; margin-bottom: 18px; }
          .print-header img { width: 220px; }
          .report-actions, .filters { display: none; }
          .panel, .metric { box-shadow: none; }
        </style>
      </head>
      <body>
        <header class="print-header">
          <img src="logo-imobiliaria-rio.svg" alt="${companyName}" />
          <div>
            <h1>Relatorio ${reportMode === "summary" ? "sintetico gerencial" : "analitico"}</h1>
            <p>Gerado em ${formatDate(toIsoDate(new Date()))}</p>
          </div>
        </header>
        ${report.outerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 400);
}

function createSampleData() {
  const propertyA = { id: uid("property"), description: "Sala comercial 204", type: "Sala comercial", area: "45 m2", location: "Aldeota, Fortaleza" };
  const propertyB = { id: uid("property"), description: "Terreno BR-116", type: "Terreno", area: "1.800 m2", location: "Eusebio, CE" };
  const clientA = { id: uid("client"), document: "12.345.678/0001-90", name: "Comercial Lima Ltda", contact: "Mariana Lima", phone: "5585999999999", email: "cliente@example.com" };
  const clientB = { id: uid("client"), document: "123.456.789-00", name: "Joao Pereira", contact: "Joao Pereira", phone: "5585888888888", email: "joao@example.com" };

  return {
    properties: [propertyA, propertyB],
    clients: [clientA, clientB],
    contracts: [
      { id: uid("contract"), propertyId: propertyA.id, clientId: clientA.id, startDate: "2026-01-01", endDate: "2027-01-01", monthlyValue: 2800, adjustmentFrequency: "Anual", adjustmentMethod: "IPCA", dueDay: 10, condoFeeResponsible: "cliente", iptuResponsible: "locador", spuResponsible: "locador", fireFeeResponsible: "cliente" },
      { id: uid("contract"), propertyId: propertyB.id, clientId: clientB.id, startDate: "2025-08-01", endDate: "2026-07-31", monthlyValue: 5200, adjustmentFrequency: "Anual", adjustmentMethod: "IGP-M", dueDay: 5, condoFeeResponsible: "locador", iptuResponsible: "cliente", spuResponsible: "cliente", fireFeeResponsible: "cliente" },
    ],
    expenses: [
      { id: uid("expense"), propertyId: propertyA.id, expenseType: "Manutencao", expenseDate: "2026-05-10", amount: 450, note: "Reparo eletrico" },
      { id: uid("expense"), propertyId: propertyB.id, expenseType: "Impostos e taxas", expenseDate: "2026-04-20", amount: 1300, note: "Taxa municipal" },
    ],
  };
}

function getFilteredChargeRows(propertyId = document.getElementById("report-property")?.value || "all", clientId = document.getElementById("report-client")?.value || "all", status = document.getElementById("report-status")?.value || "all") {
  return state.contracts
    .filter((contract) => propertyId === "all" || contract.propertyId === propertyId)
    .filter((contract) => clientId === "all" || contract.clientId === clientId)
    .filter((contract) => status === "all" || getContractStatus(contract).key === status)
    .flatMap((contract) => {
      const property = findProperty(contract.propertyId);
      const client = findClient(contract.clientId);
      return chargeRules.map((rule) => {
        const dueDate = getChargeDueDate(rule);
        return {
          property: property?.description || "-",
          client: client?.name || "-",
          charge: rule.label,
          contract,
          contractId: contract.id,
          responsible: contract[rule.key] || "cliente",
          baseDue: rule.baseLabel,
          adjustedDue: toIsoDate(adjustToPreviousBusinessDay(dueDate)),
        };
      });
    });
}

function getChargeDueDate(rule) {
  const today = new Date();
  if (rule.kind === "monthly") {
    const dueDate = new Date(today.getFullYear(), today.getMonth(), rule.day);
    if (dueDate < today) dueDate.setMonth(dueDate.getMonth() + 1);
    return dueDate;
  }

  const dueDate = new Date(today.getFullYear(), rule.month, rule.day);
  if (dueDate < today) dueDate.setFullYear(dueDate.getFullYear() + 1);
  return dueDate;
}

function adjustToPreviousBusinessDay(date) {
  const adjusted = new Date(date);
  while (adjusted.getDay() === 0 || adjusted.getDay() === 6) {
    adjusted.setDate(adjusted.getDate() - 1);
  }
  return adjusted;
}

function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function getFilteredExpenses(filters = getReportFilters()) {
  return state.expenses
    .filter((expense) => filters.expenseType === "all" || expense.expenseType === filters.expenseType)
    .filter((expense) => !filters.startDate || parseDate(expense.expenseDate) >= parseDate(filters.startDate))
    .filter((expense) => !filters.endDate || parseDate(expense.expenseDate) <= parseDate(filters.endDate));
}

function getEnteredExpenses(propertyId, filters = getReportFilters()) {
  return getFilteredExpenses(filters)
    .filter((expense) => expense.propertyId === propertyId)
    .reduce((sum, expense) => sum + expense.amount, 0);
}

function capitalize(value) {
  return String(value || "").charAt(0).toUpperCase() + String(value || "").slice(1);
}

function findProperty(id) {
  return state.properties.find((property) => property.id === id);
}

function findClient(id) {
  return state.clients.find((client) => client.id === id);
}

function daysUntil(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${dateString}T00:00:00`);
  return Math.ceil((target - today) / 86400000);
}

function formatMoney(value) {
  return moneyFormatter.format(Number(value || 0));
}

function formatNumber(value) {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(Number(value || 0));
}

function formatDate(dateString) {
  if (!dateString) return "-";
  return dateFormatter.format(new Date(`${dateString}T00:00:00Z`));
}

function formatDateTime(dateString) {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(dateString));
}

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
