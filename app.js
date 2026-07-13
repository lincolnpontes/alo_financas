const APP_ID = 'alo-financas';
const APP_VERSION = '1.0.2';
const STORAGE_KEY = 'alo_financas_db_v1';
const SECURITY_KEY = 'alo_financas_security_v1';
const SESSION_UNLOCK_KEY = 'alo_financas_unlocked_v1';
const SYNC_SETTINGS_KEY = 'alo_financas_sync_settings_v1';
const SYNC_META_KEY = 'alo_financas_sync_meta_v1';
const SYNC_TOKEN_KEY = 'alo_financas_sync_token_v1';
const SYNC_USER_KEY = 'alo_financas_sync_user_v1';
const SYNC_REVISION_KEY = 'alo_financas_sync_revision_v1';
const LAST_LOGIN_KEY = 'alo_financas_last_login_v1';
const SYNC_DEBOUNCE_MS = 1800;

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const DATE_LONG = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
const MONTH_LONG = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' });

const EXPENSE_CATEGORIES = ['Casa', 'Cartao', 'Saude', 'Internet', 'Mercado', 'Transporte', 'Familia', 'Impostos', 'Outros'];
const INCOME_CATEGORIES = ['Salario', 'Extra', 'Reembolso', 'Rendimento', 'Pix', 'Outros'];
const ACCOUNT_TYPES = ['Conta corrente', 'Poupança', 'Investimento', 'Dinheiro', 'Carteira digital'];
const FLOW_CATEGORIES = ['Familia', 'Trabalho', 'Reembolso', 'Emprestimo', 'Outros'];
const DEFAULT_MARKET_CATEGORIES = ['Feira', 'Mercado', 'Limpeza', 'Higiene', 'Bebidas', 'Pet', 'Farmacia'];
const OWNERS = ['Lincoln', 'Aryana', 'Casa'];

const ICONS = {
  'badge-dollar-sign': '<path d="M3 11.5 12 2l9 9.5-9 9.5-9-9.5Z"></path><path d="M12 7v9"></path><path d="M14.5 9.5c-.4-.5-1.1-.8-2.1-.8-1.2 0-2 .5-2 1.3 0 2 4.4.8 4.4 3 0 .8-.8 1.4-2.1 1.4-1.1 0-2-.4-2.6-1"></path>',
  'calendar-days': '<path d="M8 2v4"></path><path d="M16 2v4"></path><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path>',
  check: '<path d="m20 6-11 11-5-5"></path>',
  'chevron-left': '<path d="m15 18-6-6 6-6"></path>',
  'chevron-right': '<path d="m9 18 6-6-6-6"></path>',
  cloud: '<path d="M17.5 19H8a6 6 0 1 1 1.1-11.9A7 7 0 0 1 22 11.5 4.5 4.5 0 0 1 17.5 19Z"></path>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"></rect><rect x="2" y="2" width="13" height="13" rx="2"></rect>',
  download: '<path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path>',
  'download-cloud': '<path d="M17.5 19H8a6 6 0 1 1 1.1-11.9A7 7 0 0 1 22 11.5 4.5 4.5 0 0 1 17.5 19Z"></path><path d="M12 11v7"></path><path d="m9 15 3 3 3-3"></path>',
  'edit-3': '<path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"></path>',
  'hand-coins': '<path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.5.7L3 17"></path><path d="m7 21 1.6-1.6c.4-.4 1-.6 1.5-.6H16c1 0 1.8-.4 2.4-1.1l3.2-4a2 2 0 0 0-3-2.6l-2.9 2.9"></path><path d="M2 16l6 6"></path><circle cx="16" cy="6" r="3"></circle><path d="M16 4.5v3"></path><path d="M14.5 6h3"></path>',
  'key-round': '<path d="M2 18v3h3l8.1-8.1"></path><circle cx="16" cy="8" r="6"></circle><path d="M18 6h.01"></path>',
  'layout-dashboard': '<rect x="3" y="3" width="7" height="9" rx="1"></rect><rect x="14" y="3" width="7" height="5" rx="1"></rect><rect x="14" y="12" width="7" height="9" rx="1"></rect><rect x="3" y="16" width="7" height="5" rx="1"></rect>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path>',
  'log-in': '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><path d="m10 17 5-5-5-5"></path><path d="M15 12H3"></path>',
  package: '<path d="m7.5 4.3 9 5.2"></path><path d="M3.3 7 12 12l8.7-5"></path><path d="M12 22V12"></path><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>',
  'package-check': '<path d="m7.5 4.3 9 5.2"></path><path d="M3.3 7 12 12l8.7-5"></path><path d="M12 22V12"></path><path d="M21 12.5V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l2-1.1"></path><path d="m16 19 2 2 4-4"></path>',
  'package-plus': '<path d="m7.5 4.3 9 5.2"></path><path d="M3.3 7 12 12l8.7-5"></path><path d="M12 22V12"></path><path d="M21 12.5V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l2-1.1"></path><path d="M19 15v6"></path><path d="M16 18h6"></path>',
  'piggy-bank': '<path d="M19 5c-1.5 1.2-2 2.5-2 4"></path><path d="M2 9.5A6.5 6.5 0 0 1 8.5 3H14a7 7 0 0 1 7 7v2a4 4 0 0 1-4 4h-1l-1 4h-4l-1-4H8l-1 4H3l1.2-4.8A6.5 6.5 0 0 1 2 9.5Z"></path><path d="M16 10h.01"></path><path d="M2 11h4"></path>',
  plus: '<path d="M12 5v14"></path><path d="M5 12h14"></path>',
  receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"></path><path d="M8 7h8"></path><path d="M8 11h8"></path><path d="M8 15h5"></path>',
  'refresh-cw': '<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"></path><path d="M3 21v-5h5"></path><path d="M3 12A9 9 0 0 1 18.5 5.8L21 8"></path><path d="M21 3v5h-5"></path>',
  search: '<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7Z"></path><path d="M22 2 11 13"></path>',
  settings: '<path d="M12.2 2h-.4l-1 2.6a7.8 7.8 0 0 0-1.8.8L6.4 4.3l-.3.3-2 3.4.2.4 2.1.6a8 8 0 0 0 0 2L4.3 11.6l-.2.4 2 3.4.3.3L9 14.6c.6.4 1.2.6 1.8.8l1 2.6h.4l1-2.6c.6-.2 1.2-.4 1.8-.8l2.6 1.1.3-.3 2-3.4-.2-.4-2.1-.6a8 8 0 0 0 0-2l2.1-.6.2-.4-2-3.4-.3-.3L15 5.4a7.8 7.8 0 0 0-1.8-.8L12.2 2Z"></path><circle cx="12" cy="10" r="3"></circle>',
  'shopping-basket': '<path d="m5 11 4-7"></path><path d="m19 11-4-7"></path><path d="M2 11h20"></path><path d="m3.5 11 1.6 8.1A2 2 0 0 0 7 21h10a2 2 0 0 0 2-1.9l1.5-8.1"></path><path d="M9 15v2"></path><path d="M15 15v2"></path>',
  'trash-2': '<path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 15H6L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path>',
  undo: '<path d="M9 14 4 9l5-5"></path><path d="M4 9h10a6 6 0 1 1 0 12h-1"></path>',
  upload: '<path d="M12 21V9"></path><path d="m17 14-5-5-5 5"></path><path d="M5 3h14"></path>',
  'upload-cloud': '<path d="M17.5 19H8a6 6 0 1 1 1.1-11.9A7 7 0 0 1 22 11.5 4.5 4.5 0 0 1 17.5 19Z"></path><path d="M12 18v-7"></path><path d="m9 14 3-3 3 3"></path>',
  wallet: '<path d="M20 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v10H5a3 3 0 0 1-3-3V7"></path><path d="M16 14h.01"></path>',
  x: '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>'
};

let db = normalizeDB(loadStoredDB());
let state = {
  view: 'dashboard',
  month: currentMonth(),
  expenseFilter: 'all',
  marketFilter: 'all',
  productSearch: '',
  deferredInstall: null,
  idleTimer: null
};

let syncState = {
  settings: loadSyncSettings(),
  meta: loadSyncMeta(),
  token: sessionStorage.getItem(SYNC_TOKEN_KEY) || '',
  user: readJSON(sessionStorage.getItem(SYNC_USER_KEY), null),
  revision: Number(sessionStorage.getItem(SYNC_REVISION_KEY) || 0),
  busy: false,
  timer: null
};

document.addEventListener('DOMContentLoaded', init);

function init() {
  decorateIcons();
  bindEvents();
  $('#monthPicker').value = state.month;
  $('#syncUrlInput').value = syncState.settings.url || '';
  $('#syncOwnerLoginInput').value = syncState.settings.ownerLogin || 'lincoln';
  $('#syncLoginInput').value = localStorage.getItem(LAST_LOGIN_KEY) || syncState.settings.ownerLogin || 'lincoln';
  $('#lockAfterSelect').value = String(loadSecurity().lockAfterMinutes || 15);
  render();
  registerServiceWorker();
  prepareInstallPrompt();
  startIdleLock();
  ensureUnlocked().then(() => initializeSync().catch(() => renderSyncStatus()));
}

function bindEvents() {
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('input', handleDocumentInput);
  document.addEventListener('change', handleDocumentChange);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') resetIdleLock();
  });

  $('#recordForm').addEventListener('submit', saveRecordFromForm);
  $('#productForm').addEventListener('submit', saveProductFromForm);
  $('#orderForm').addEventListener('submit', saveOrderFromForm);
  $('#pinForm').addEventListener('submit', handlePinSubmit);
  $('#syncSetupForm').addEventListener('submit', handleSyncSetup);
  $('#syncLoginForm').addEventListener('submit', handleSyncLogin);
  $('#importFileInput').addEventListener('change', handleImportFile);
  $('#pinDialog').addEventListener('cancel', event => event.preventDefault());
}

function handleDocumentClick(event) {
  const button = event.target.closest('button');
  if (!button) return;

  const viewButton = button.closest('[data-view]');
  if (viewButton) {
    setView(viewButton.dataset.view);
    return;
  }

  const jumpButton = button.closest('[data-view-jump]');
  if (jumpButton) {
    setView(jumpButton.dataset.viewJump);
    return;
  }

  const closeButton = button.closest('[data-close-dialog]');
  if (closeButton) {
    closeDialog(closeButton.dataset.closeDialog);
    return;
  }

  const openRecord = button.closest('[data-open-record]');
  if (openRecord) {
    openRecordDialog(openRecord.dataset.openRecord);
    return;
  }

  if (button.matches('[data-open-product]')) {
    openProductDialog();
    return;
  }

  const editRecord = button.closest('[data-edit-record]');
  if (editRecord) {
    openRecordDialog(editRecord.dataset.editRecord, editRecord.dataset.id);
    return;
  }

  const editProduct = button.closest('[data-edit-product]');
  if (editProduct) {
    openProductDialog(editProduct.dataset.id);
    return;
  }

  const addProductToList = button.closest('[data-add-product-list]');
  if (addProductToList) {
    addProductToShoppingList(addProductToList.dataset.id);
    return;
  }

  const cycleRecord = button.closest('[data-cycle-record]');
  if (cycleRecord) {
    cycleRecordStatus(cycleRecord.dataset.cycleRecord, cycleRecord.dataset.id);
    return;
  }

  const listStatus = button.closest('[data-list-status]');
  if (listStatus) {
    setShoppingStatus(listStatus.dataset.id, listStatus.dataset.listStatus);
    return;
  }

  const expenseFilter = button.closest('[data-expense-filter]');
  if (expenseFilter) {
    state.expenseFilter = expenseFilter.dataset.expenseFilter;
    renderFinances();
    return;
  }

  const marketFilter = button.closest('[data-market-filter]');
  if (marketFilter) {
    state.marketFilter = marketFilter.dataset.marketFilter;
    renderMarket();
    return;
  }

  if (button.id === 'prevMonthBtn') shiftMonth(-1);
  if (button.id === 'nextMonthBtn') shiftMonth(1);
  if (button.id === 'deleteRecordBtn') deleteCurrentRecord();
  if (button.id === 'deleteProductBtn') deleteCurrentProduct();
  if (button.id === 'exportBtn') exportData();
  if (button.id === 'importBtn') $('#importFileInput').click();
  if (button.id === 'changePinBtn') showPinDialog('change');
  if (button.id === 'lockBtn' || button.id === 'lockNowBtn') lockApp();
  if (button.id === 'syncNowBtn') syncNow();
  if (button.id === 'pullSyncBtn') pullRemoteData({ merge: true, notify: true });
  if (button.id === 'pushSyncBtn') pushRemoteData(true, true);
  if (button.id === 'logoutSyncBtn') logoutSync();
  if (button.id === 'installBtn') installApp();
}

function handleDocumentInput(event) {
  if (event.target.id === 'productSearch') {
    state.productSearch = event.target.value;
    renderShoppingList();
  }
  resetIdleLock();
}

function handleDocumentChange(event) {
  if (event.target.id === 'monthPicker') {
    state.month = event.target.value || currentMonth();
    render();
  }

  if (event.target.id === 'lockAfterSelect') {
    const security = loadSecurity();
    security.lockAfterMinutes = Number(event.target.value || 15);
    saveSecurity(security);
    resetIdleLock();
    toast('Bloqueio atualizado.', 'good');
  }
}

function setView(view) {
  state.view = view;
  render();
}

function render() {
  ensureRecurringForMonth();
  $$('.view').forEach(section => {
    const active = section.id === `view-${state.view}`;
    section.hidden = !active;
    section.classList.toggle('is-active', active);
  });

  $$('[data-view]').forEach(button => {
    button.classList.toggle('is-active', button.dataset.view === state.view);
  });

  $('#monthPicker').value = state.month;
  $('#dashboardMonthLabel').textContent = capitalize(monthLabel(state.month));
  $('#todayLabel').textContent = DATE_LONG.format(new Date());
  renderDashboard();
  renderFinances();
  renderMarket();
  renderSettings();
  renderSyncStatus();
}

function renderDashboard() {
  const totals = calculateTotals();
  const dueSoon = visible(db.finances.expenses)
    .filter(item => item.month === state.month && item.status !== 'paid')
    .sort((a, b) => Number(a.dueDay || 0) - Number(b.dueDay || 0))
    .slice(0, 6);
  const neededItems = visible(db.pantry.list)
    .filter(item => item.status !== 'bought')
    .sort((a, b) => Number(b.updatedAt || b.createdAt || 0) - Number(a.updatedAt || a.createdAt || 0))
    .slice(0, 6);

  $('#metricGrid').innerHTML = [
    metricEmoji('Receitas', totals.incomeTotal, 'Previsto no mês', '💲', 'income'),
    metricEmoji('Despesas', totals.expenseTotal, 'Total do mês', '💲', 'expense'),
    metricEmoji('Pendente', totals.expenseOpen, 'Ainda falta pagar', '⚠️', 'pending'),
    metricEmoji('Poupança e contas', totals.accountTotal, 'Patrimônio disponível', '🐖', 'savings'),
    metricEmoji('Saldo do mês', totals.monthBalance, totals.monthBalance >= 0 ? 'Sobra prevista' : 'Falta prevista', '💰', totals.monthBalance >= 0 ? 'balance' : 'expense'),
    metricEmoji('Lista da feira', neededItems.length, 'Itens pendentes', '🛒', 'market', false)
  ].join('');

  $('#upcomingList').innerHTML = dueSoon.length
    ? dueSoon.map(item => stackRow(item.title, `${statusLabel('expense', item.status)} - dia ${item.dueDay || '-'}`, formatMoney(item.amount), 'calendar-days', item.status === 'debt' ? 'danger' : 'warning')).join('')
    : emptyState('Sem vencimentos abertos neste mês.');

  $('#marketPreview').innerHTML = neededItems.length
    ? neededItems.map(item => stackRow(item.name, `${item.qty || 1} ${item.unit || 'un'} - ${marketStatusLabel(item.status)}`, item.site || '', item.status === 'ordered' ? 'send' : 'shopping-basket', item.status === 'ordered' ? 'violet' : '')).join('')
    : emptyState('Lista de feira vazia.');

  const accounts = visible(db.finances.accounts).slice(0, 6);
  $('#accountPreview').innerHTML = accounts.length
    ? accounts.map(item => stackRow(item.name, item.type || 'Conta', formatMoney(item.balance), 'piggy-bank', '')).join('')
    : emptyState('Nenhuma conta cadastrada.');
}

function renderFinances() {
  const totals = calculateTotals();
  $('#financeSummary').innerHTML = [
    summaryTile('Recebido', totals.incomeReceived),
    summaryTile('Esperado', totals.incomeOpen),
    summaryTile('Pago', totals.expensePaid),
    summaryTile('Devendo', totals.expenseOpen)
  ].join('');

  renderExpenseList();
  renderIncomeList();
  renderAccountList();
  renderReceivableList();
  renderDebtList();
  setSegmentActive('#expenseFilter', 'expenseFilter', state.expenseFilter);
}

function renderExpenseList() {
  let items = visible(db.finances.expenses).filter(item => item.month === state.month);
  if (state.expenseFilter === 'open') items = items.filter(item => item.status !== 'paid');
  if (state.expenseFilter === 'paid') items = items.filter(item => item.status === 'paid');
  items.sort((a, b) => Number(a.dueDay || 99) - Number(b.dueDay || 99) || a.title.localeCompare(b.title));

  $('#expenseList').innerHTML = items.length
    ? items.map(item => financeRow('expense', item)).join('')
    : emptyState('Nenhuma despesa neste mês.');
}

function renderIncomeList() {
  const items = visible(db.finances.incomes)
    .filter(item => item.month === state.month)
    .sort((a, b) => Number(a.day || 99) - Number(b.day || 99) || a.title.localeCompare(b.title));

  $('#incomeList').innerHTML = items.length
    ? items.map(item => financeRow('income', item)).join('')
    : emptyState('Nenhuma receita neste mês.');
}

function renderAccountList() {
  const items = visible(db.finances.accounts).sort((a, b) => a.name.localeCompare(b.name));
  $('#accountList').innerHTML = items.length
    ? items.map(item => financeRow('account', item)).join('')
    : emptyState('Cadastre conta, poupanca ou investimento.');
}

function renderReceivableList() {
  const items = visible(db.finances.receivables).sort(sortByOpenDate);
  $('#receivableList').innerHTML = items.length
    ? items.map(item => financeRow('receivable', item)).join('')
    : emptyState('Nada a receber.');
}

function renderDebtList() {
  const items = visible(db.finances.debts).sort(sortByOpenDate);
  $('#debtList').innerHTML = items.length
    ? items.map(item => financeRow('debt', item)).join('')
    : emptyState('Nenhuma dívida avulsa.');
}

function renderMarket() {
  renderQuickOptions();
  renderShoppingList();
  setSegmentActive('#marketFilter', 'marketFilter', state.marketFilter);
}

function renderQuickOptions() {
  $('#categoryOptions').innerHTML = marketCategories()
    .map(category => `<option value="${escapeAttr(category)}"></option>`)
    .join('');
}

function renderShoppingList() {
  const query = normalizeText(state.productSearch);
  const products = visible(db.pantry.products)
    .filter(product => !query || normalizeText([product.name, product.category, product.goodBrands, product.badBrands].join(' ')).includes(query))
    .sort((a, b) => a.name.localeCompare(b.name));
  const latestByProduct = new Map();
  visible(db.pantry.list).forEach(item => {
    const previous = latestByProduct.get(item.productId);
    if (!previous || Number(item.updatedAt || 0) >= Number(previous.updatedAt || 0)) latestByProduct.set(item.productId, item);
  });

  let entries = products.map(product => ({ product, item: latestByProduct.get(product.id) || null }));
  if (state.marketFilter !== 'all') entries = entries.filter(entry => entry.item?.status === state.marketFilter);
  entries.sort((a, b) => {
    const order = { needed: 1, ordered: 2, bought: 3 };
    const statusA = a.item?.status || 'stocked';
    const statusB = b.item?.status || 'stocked';
    return (order[statusA] || 9) - (order[statusB] || 9) || a.product.name.localeCompare(b.product.name);
  });

  $('#shoppingList').innerHTML = entries.length
    ? entries.map(shoppingRow).join('')
    : emptyState(state.productSearch ? 'Nenhum produto encontrado.' : 'Nenhum item neste filtro.');
}

function renderSettings() {
  const totals = calculateTotals();
  const security = loadSecurity();
  $('#securityStatus').textContent = security.hash ? 'PIN ativo' : 'Sem PIN';
  $('#securityStatus').classList.toggle('good', Boolean(security.hash));
  $('#versionPill').textContent = `v${APP_VERSION}`;
  $('#appStats').innerHTML = [
    miniStat('Registros', visible(db.finances.expenses).length + visible(db.finances.incomes).length + visible(db.pantry.list).length),
    miniStat('Produtos', visible(db.pantry.products).length),
    miniStat('Reservas', totals.accountTotal),
    miniStat('Atualizado', shortDateTime(db.updatedAt))
  ].join('');
  renderAudit();
}

function renderSyncStatus() {
  const pill = $('#syncStatusPill');
  const detail = $('#syncDetailText');
  if (!syncEnabled()) {
    pill.textContent = 'Local';
    pill.className = 'status-pill';
    detail.textContent = 'Modo local';
    return;
  }

  if (syncState.meta.conflict) {
    pill.textContent = 'Conflito';
    pill.className = 'status-pill badge debt';
    detail.textContent = 'Revise puxando ou enviando os dados.';
    return;
  }

  if (!syncState.user) {
    pill.textContent = 'Login';
    pill.className = 'status-pill';
    detail.textContent = 'URL configurada';
    return;
  }

  pill.textContent = syncState.meta.localDirty ? 'Pendente' : 'Sincronizado';
  pill.className = `status-pill ${syncState.meta.localDirty ? '' : 'good'}`;
  detail.textContent = syncState.meta.lastSyncAt ? `Ultima sincronizacao: ${shortDateTime(syncState.meta.lastSyncAt)}` : syncState.user.name || syncState.user.login;
}

function metric(label, value, helper, icon, tone = '', currency = true) {
  const display = currency ? formatMoney(value) : String(value);
  return `
    <article class="metric ${tone}">
      <span class="icon-chip">${iconSvg(icon)}</span>
      <div>
        <small>${escapeHTML(label)}</small>
        <strong>${escapeHTML(display)}</strong>
      </div>
      <small>${escapeHTML(helper)}</small>
    </article>
  `;
}

function metricEmoji(label, value, helper, emoji, tone = '', currency = true) {
  const display = currency ? formatMoney(value) : String(value);
  return `
    <article class="metric metric-${escapeAttr(tone)}">
      <span class="metric-emoji" aria-hidden="true">${emoji}</span>
      <div class="metric-copy">
        <small>${escapeHTML(label)}</small>
        <strong>${escapeHTML(display)}</strong>
      </div>
      <small>${escapeHTML(helper)}</small>
    </article>
  `;
}

function renderAudit() {
  const entries = visible(db.audit)
    .sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0))
    .slice(0, 60);
  $('#auditCount').textContent = `${entries.length} ${entries.length === 1 ? 'ação' : 'ações'}`;
  $('#auditList').innerHTML = entries.length
    ? entries.map(entry => `
        <div class="audit-row">
          <span class="audit-avatar">${escapeHTML(initials(entry.actor))}</span>
          <div>
            <strong>${escapeHTML(entry.actor || 'Neste aparelho')}</strong>
            <p>${escapeHTML(entry.action)} <b>${escapeHTML(entry.summary)}</b></p>
          </div>
          <time datetime="${new Date(entry.createdAt).toISOString()}">${escapeHTML(shortDateTime(entry.createdAt))}</time>
        </div>
      `).join('')
    : emptyState('As próximas alterações aparecerão aqui.');
}

function summaryTile(label, value) {
  return `<article class="summary-tile"><span>${escapeHTML(label)}</span><strong>${escapeHTML(formatMoney(value))}</strong></article>`;
}

function miniStat(label, value) {
  const display = typeof value === 'number' ? formatMoney(value) : String(value);
  return `<article class="mini-stat"><span>${escapeHTML(label)}</span><strong>${escapeHTML(display)}</strong></article>`;
}

function stackRow(title, subtitle, right, icon, tone = '') {
  return `
    <div class="stack-row">
      <span class="row-icon ${tone}">${iconSvg(icon)}</span>
      <div class="data-main">
        <strong>${escapeHTML(title)}</strong>
        <small>${escapeHTML(subtitle)}</small>
      </div>
      <div class="row-amount">${escapeHTML(right || '')}</div>
    </div>
  `;
}

function financeRow(type, item) {
  const config = rowConfig(type, item);
  const badge = statusBadge(type, item.status);
  const amount = type === 'account' ? item.balance : item.amount;
  const subtitle = config.subtitle;
  const cycle = type !== 'account'
    ? `<button class="icon-btn" type="button" title="${escapeAttr(config.cycleTitle)}" aria-label="${escapeAttr(config.cycleTitle)}" data-cycle-record="${type}" data-id="${escapeAttr(item.id)}">${iconSvg(config.cycleIcon)}</button>`
    : '';

  return `
    <div class="data-row">
      <span class="row-icon ${config.tone}">${iconSvg(config.icon)}</span>
      <div class="data-main">
        <strong>${escapeHTML(config.title)}</strong>
        <small>${escapeHTML(subtitle)}</small>
      </div>
      <div class="row-amount">
        <span>${escapeHTML(formatMoney(amount))}</span>
        ${badge}
      </div>
      <div class="row-actions">
        ${cycle}
        <button class="icon-btn" type="button" title="Editar" aria-label="Editar" data-edit-record="${type}" data-id="${escapeAttr(item.id)}">${iconSvg('edit-3')}</button>
      </div>
    </div>
  `;
}

function rowConfig(type, item) {
  if (type === 'expense') {
    const recurringLabel = item.recurring ? ' · fixa todo mês' : '';
    return {
      title: item.title,
      subtitle: `${item.category || 'Despesa'} · dia ${item.dueDay || '-'} · ${item.owner || 'Casa'}${recurringLabel}`,
      icon: 'receipt',
      tone: item.status === 'paid' ? '' : item.status === 'debt' ? 'danger' : 'warning',
      cycleTitle: item.status === 'paid' ? 'Marcar aberto' : 'Marcar pago',
      cycleIcon: item.status === 'paid' ? 'undo' : 'check'
    };
  }
  if (type === 'income') {
    const recurringLabel = item.recurring ? ' · fixa todo mês' : '';
    return {
      title: item.title,
      subtitle: `${item.category || 'Receita'} · dia ${item.day || '-'} · ${item.owner || 'Casa'}${recurringLabel}`,
      icon: 'hand-coins',
      tone: item.status === 'received' ? '' : 'info',
      cycleTitle: item.status === 'received' ? 'Marcar esperado' : 'Marcar recebido',
      cycleIcon: item.status === 'received' ? 'undo' : 'check'
    };
  }
  if (type === 'account') {
    return {
      title: item.name,
      subtitle: `${item.type || 'Conta'} - atualizado ${shortDateTime(item.updatedAt || item.createdAt)}`,
      icon: 'piggy-bank',
      tone: '',
      cycleTitle: '',
      cycleIcon: ''
    };
  }
  if (type === 'receivable') {
    return {
      title: item.person || item.title,
      subtitle: `${item.title || 'A receber'} - ${dateOrDash(item.dueDate)}`,
      icon: 'badge-dollar-sign',
      tone: item.status === 'received' ? '' : 'info',
      cycleTitle: item.status === 'received' ? 'Marcar aberto' : 'Marcar recebido',
      cycleIcon: item.status === 'received' ? 'undo' : 'check'
    };
  }
  return {
    title: item.person || item.title,
    subtitle: `${item.title || 'Divida'} - ${dateOrDash(item.dueDate)}`,
    icon: 'calendar-days',
    tone: item.status === 'paid' ? '' : 'danger',
    cycleTitle: item.status === 'paid' ? 'Marcar aberto' : 'Marcar pago',
    cycleIcon: item.status === 'paid' ? 'undo' : 'check'
  };
}

function shoppingRow(entry) {
  const { product, item } = entry;
  const status = item?.status || 'stocked';
  const brandLine = productHints(product);
  const ordered = status === 'ordered';
  const bought = status === 'bought';
  const needed = status === 'needed';
  const qty = item?.qty || product.defaultQty || 1;
  const unit = item?.unit || product.unit || 'un';
  const statusText = status === 'stocked' ? 'Em casa' : marketStatusLabel(status);
  const statusControls = item
    ? `
        <button class="market-action need-action ${needed ? 'is-selected' : ''}" type="button" data-list-status="needed" data-id="${escapeAttr(item.id)}" title="Marcar pendente">${iconSvg('shopping-basket')}<span>Pendente</span></button>
        <button class="market-action order-action ${ordered ? 'is-selected' : ''}" type="button" data-list-status="ordered" data-id="${escapeAttr(item.id)}" title="Registrar pedido">${iconSvg('send')}<span>Pedir</span></button>
        <button class="market-action bought-action ${bought ? 'is-selected' : ''}" type="button" data-list-status="bought" data-id="${escapeAttr(item.id)}" title="Marcar comprado">${iconSvg('check')}<span>Comprei</span></button>
      `
    : `<button class="market-action need-action" type="button" data-add-product-list="${escapeAttr(product.id)}" title="Adicionar como pendente">${iconSvg('plus')}<span>Está faltando</span></button>`;
  return `
    <article class="shopping-item status-${escapeAttr(status)}">
      <button class="shopping-status-mark" type="button" ${item ? `data-list-status="needed" data-id="${escapeAttr(item.id)}"` : `data-add-product-list="${escapeAttr(product.id)}"`} title="Marcar como pendente" aria-label="Marcar ${escapeAttr(product.name)} como pendente">
        ${needed ? '⚠️' : ordered ? '📦' : bought ? '✓' : iconSvg('shopping-basket')}
      </button>
      <div class="data-main">
        <div class="shopping-title-line">
          <strong>${escapeHTML(product.name)}</strong>
          <span class="badge ${escapeAttr(status)}">${escapeHTML(statusText)}</span>
        </div>
        <small>${escapeHTML(`${product.category || 'Mercado'} · ${qty} ${unit}${item?.site ? ` · ${item.site}` : ''}`)}</small>
        ${brandLine ? `<small>${brandLine}</small>` : ''}
      </div>
      <div class="shopping-actions">
        ${statusControls}
        <button class="market-action edit-action" type="button" title="Editar produto" aria-label="Editar produto" data-edit-product data-id="${escapeAttr(product.id)}">${iconSvg('edit-3')}</button>
      </div>
    </article>
  `;
}

function productRow(product) {
  const hints = productHints(product);
  return `
    <div class="data-row">
      <div class="data-main">
        <strong>${escapeHTML(product.name)}</strong>
        <small>${escapeHTML(`${product.category || 'Mercado'} - ${product.defaultQty || 1} ${product.unit || 'un'}`)}</small>
        ${hints ? `<small>${hints}</small>` : ''}
      </div>
      <div class="row-actions">
        <button class="icon-btn" type="button" title="Adicionar a lista" aria-label="Adicionar a lista" data-add-product-list="${escapeAttr(product.id)}">${iconSvg('plus')}</button>
        <button class="icon-btn" type="button" title="Editar" aria-label="Editar" data-edit-product data-id="${escapeAttr(product.id)}">${iconSvg('edit-3')}</button>
      </div>
    </div>
  `;
}

function productHints(product) {
  const parts = [];
  if (product.goodBrands) parts.push(`Boas: ${product.goodBrands}`);
  if (product.badBrands) parts.push(`Evitar: ${product.badBrands}`);
  return escapeHTML(parts.join(' | '));
}

function statusBadge(type, status) {
  const label = type === 'market' ? marketStatusLabel(status) : statusLabel(type, status);
  return `<span class="badge ${escapeAttr(status || '')}">${escapeHTML(label)}</span>`;
}

function statusLabel(type, status) {
  const maps = {
    expense: { pending: 'A pagar', paid: 'Pago', scheduled: 'Agendado', debt: 'Devendo' },
    income: { expected: 'Esperando', received: 'Recebido' },
    receivable: { open: 'Aberto', received: 'Recebido' },
    debt: { open: 'Aberto', paid: 'Pago' }
  };
  return maps[type]?.[status] || status || '-';
}

function marketStatusLabel(status) {
  return { needed: 'Falta', ordered: 'Pedido', bought: 'Comprado' }[status] || status || '-';
}

function emptyState(message) {
  return `<div class="empty-state">${escapeHTML(message)}</div>`;
}

function calculateTotals() {
  const expenses = visible(db.finances.expenses).filter(item => item.month === state.month);
  const incomes = visible(db.finances.incomes).filter(item => item.month === state.month);
  const accounts = visible(db.finances.accounts);
  const receivables = visible(db.finances.receivables);
  const debts = visible(db.finances.debts);

  const expenseTotal = sum(expenses, 'amount');
  const expensePaid = sum(expenses.filter(item => item.status === 'paid'), 'amount');
  const expenseOpen = sum(expenses.filter(item => item.status !== 'paid'), 'amount');
  const incomeTotal = sum(incomes, 'amount');
  const incomeReceived = sum(incomes.filter(item => item.status === 'received'), 'amount');
  const incomeOpen = sum(incomes.filter(item => item.status !== 'received'), 'amount');
  const accountTotal = sum(accounts, 'balance');
  const receivableOpen = sum(receivables.filter(item => item.status !== 'received'), 'amount');
  const debtOpen = sum(debts.filter(item => item.status !== 'paid'), 'amount');

  return {
    expenseTotal,
    expensePaid,
    expenseOpen,
    incomeTotal,
    incomeReceived,
    incomeOpen,
    accountTotal,
    receivableOpen,
    debtOpen,
    monthBalance: incomeTotal - expenseTotal
  };
}

function openRecordDialog(type, id = '') {
  const config = recordConfig(type);
  const item = id ? getCollection(type).find(entry => entry.id === id) : null;
  $('#recordDialogTitle').textContent = item ? `Editar ${config.singular}` : `${config.newLabel} ${config.singular}`;
  $('#recordType').value = type;
  $('#recordId').value = id;
  $('#recordName').value = item?.title || item?.name || item?.person || '';
  $('#recordAmount').value = item ? formatNumberInput(type === 'account' ? item.balance : item.amount) : '';
  $('#recordDay').value = item?.dueDay || item?.day || item?.dueDate || '';
  $('#recordDay').type = config.dateField ? 'date' : 'text';
  $('#recordDayLabel').textContent = config.dayLabel;
  $('#recordDayWrap').hidden = !config.showDay;
  $('#recordStatus').closest('label').hidden = !config.showStatus;
  $('#recordOwner').closest('label').hidden = !config.showOwner;
  $('#recordCategory').closest('label').hidden = !config.showCategory;
  $('#recordAccount').closest('label').hidden = !config.showAccount;
  const supportsRecurring = type === 'expense' || type === 'income';
  const recurrence = item?.recurrenceId ? db.finances.recurring.find(entry => entry.id === item.recurrenceId) : null;
  $('#recordRecurringWrap').hidden = !supportsRecurring;
  $('#recordRecurring').checked = supportsRecurring && Boolean(recurrence ? recurrence.active : item?.recurring);
  $('#recordNotes').value = item?.notes || '';
  $('#deleteRecordBtn').hidden = !item;

  fillSelect($('#recordStatus'), config.statuses, item?.status || config.defaultStatus);
  fillSelect($('#recordOwner'), OWNERS.map(owner => [owner, owner]), item?.owner || 'Casa');
  fillSelect($('#recordCategory'), config.categories.map(category => [category, category]), item?.category || item?.type || config.categories[0]);
  fillSelect($('#recordAccount'), accountOptions(), item?.accountId || '');

  $('#recordDialog').showModal();
  $('#recordName').focus();
}

function saveRecordFromForm(event) {
  event.preventDefault();
  const type = $('#recordType').value;
  const config = recordConfig(type);
  const collection = getCollection(type);
  const id = $('#recordId').value || uid(type);
  const now = Date.now();
  const existing = collection.find(item => item.id === id);
  const isNew = !existing;
  const amount = parseMoney($('#recordAmount').value);
  if (!Number.isFinite(amount)) return toast('Informe um valor válido.', 'error');

  let item = existing || { id, createdAt: now };
  item.updatedAt = now;
  item.notes = $('#recordNotes').value.trim();

  if (type === 'account') {
    item.name = $('#recordName').value.trim();
    item.balance = amount;
    item.type = $('#recordCategory').value;
    if (!item.name) return toast('Informe o nome da conta.', 'error');
  } else if (type === 'receivable' || type === 'debt') {
    item.person = $('#recordName').value.trim();
    item.title = $('#recordCategory').value;
    item.amount = amount;
    item.dueDate = $('#recordDay').value;
    item.status = $('#recordStatus').value || config.defaultStatus;
    item.owner = $('#recordOwner').value;
    item.category = $('#recordCategory').value;
    if (!item.person) return toast('Informe a pessoa ou origem.', 'error');
  } else {
    item.title = $('#recordName').value.trim();
    item.amount = amount;
    item.month = state.month;
    item.status = $('#recordStatus').value || config.defaultStatus;
    item.owner = $('#recordOwner').value;
    item.category = $('#recordCategory').value;
    item.accountId = $('#recordAccount').value;
    if (type === 'expense') item.dueDay = clampDay($('#recordDay').value);
    if (type === 'income') item.day = clampDay($('#recordDay').value);
    if (!item.title) return toast('Informe o nome.', 'error');

    const wantsRecurring = $('#recordRecurring').checked;
    if (wantsRecurring) {
      const recurrenceId = item.recurrenceId || uid('recurring');
      item.recurrenceId = recurrenceId;
      item.recurring = true;
      upsertRecurrence(recurrenceId, type, item);
    } else {
      item.recurring = false;
      if (item.recurrenceId) {
        const recurrence = db.finances.recurring.find(entry => entry.id === item.recurrenceId);
        if (recurrence) {
          recurrence.active = false;
          recurrence.updatedAt = now;
        }
      }
    }
  }

  if (!existing) collection.push(item);
  addAudit(isNew ? 'cadastrou' : 'alterou', recordEntityLabel(type), recordDisplayName(type, item));
  saveData();
  closeDialog('recordDialog');
  toast('Registro salvo.', 'good');
}

function deleteCurrentRecord() {
  const type = $('#recordType').value;
  const id = $('#recordId').value;
  if (!id) return;
  if (!confirm('Excluir este registro?')) return;
  const item = getCollection(type).find(entry => entry.id === id);
  markDeleted(getCollection(type), id);
  addAudit('excluiu', recordEntityLabel(type), recordDisplayName(type, item));
  saveData();
  closeDialog('recordDialog');
  toast('Registro excluído.', 'good');
}

function openProductDialog(id = '') {
  const product = id ? db.pantry.products.find(item => item.id === id) : null;
  $('#productDialogTitle').textContent = product ? 'Editar produto' : 'Novo produto';
  $('#productId').value = product?.id || '';
  $('#productName').value = product?.name || '';
  $('#productCategory').value = product?.category || 'Mercado';
  $('#productDefaultQty').value = product?.defaultQty ? formatNumberInput(product.defaultQty) : '';
  $('#productUnit').value = product?.unit || 'un';
  $('#productGoodBrands').value = product?.goodBrands || '';
  $('#productBadBrands').value = product?.badBrands || '';
  $('#productSites').value = product?.sites || '';
  $('#productNotes').value = product?.notes || '';
  $('#deleteProductBtn').hidden = !product;
  renderQuickOptions();
  $('#productDialog').showModal();
  $('#productName').focus();
}

function saveProductFromForm(event) {
  event.preventDefault();
  const id = $('#productId').value || uid('product');
  const now = Date.now();
  const existing = db.pantry.products.find(item => item.id === id);
  const name = $('#productName').value.trim();
  if (!name) return toast('Informe o produto.', 'error');

  const product = existing || { id, createdAt: now };
  product.name = name;
  product.category = $('#productCategory').value.trim() || 'Mercado';
  product.defaultQty = parseDecimal($('#productDefaultQty').value) || 1;
  product.unit = $('#productUnit').value.trim() || 'un';
  product.goodBrands = $('#productGoodBrands').value.trim();
  product.badBrands = $('#productBadBrands').value.trim();
  product.sites = $('#productSites').value.trim();
  product.notes = $('#productNotes').value.trim();
  product.updatedAt = now;

  if (!existing) db.pantry.products.push(product);
  if (!db.pantry.categories.includes(product.category)) db.pantry.categories.push(product.category);
  addAudit(existing ? 'alterou' : 'cadastrou', 'produto', product.name);
  saveData();
  closeDialog('productDialog');
  toast('Produto salvo.', 'good');
}

function deleteCurrentProduct() {
  const id = $('#productId').value;
  if (!id) return;
  if (!confirm('Excluir este produto?')) return;
  const product = db.pantry.products.find(item => item.id === id);
  markDeleted(db.pantry.products, id);
  addAudit('excluiu', 'produto', product?.name || 'Produto');
  saveData();
  closeDialog('productDialog');
  toast('Produto excluído.', 'good');
}

function handleQuickNeedSubmit(event) {
  event.preventDefault();
  const name = $('#quickProductInput').value.trim();
  if (!name) return toast('Digite um produto.', 'error');
  const product = ensureProduct(name, $('#quickQtyInput').value, $('#quickUnitInput').value);
  addProductToShoppingList(product.id, $('#quickQtyInput').value, $('#quickUnitInput').value);
  $('#quickProductInput').value = '';
  $('#quickQtyInput').value = '';
  $('#quickUnitInput').value = '';
}

function ensureProduct(name, qty = '', unit = '') {
  const found = visible(db.pantry.products).find(product => normalizeText(product.name) === normalizeText(name));
  if (found) return found;
  const now = Date.now();
  const product = {
    id: uid('product'),
    name,
    category: 'Mercado',
    defaultQty: parseDecimal(qty) || 1,
    unit: unit.trim() || 'un',
    goodBrands: '',
    badBrands: '',
    sites: '',
    notes: '',
    createdAt: now,
    updatedAt: now
  };
  db.pantry.products.push(product);
  return product;
}

function addProductToShoppingList(productId, qty = '', unit = '') {
  const product = db.pantry.products.find(item => item.id === productId);
  if (!product) return;
  const active = visible(db.pantry.list).find(item => item.productId === productId && item.status !== 'bought');
  const now = Date.now();
  if (active) {
    active.qty = parseDecimal(qty) || active.qty || product.defaultQty || 1;
    active.unit = (unit || active.unit || product.unit || 'un').trim();
    active.status = 'needed';
    active.updatedAt = now;
  } else {
    db.pantry.list.push({
      id: uid('list'),
      productId,
      name: product.name,
      qty: parseDecimal(qty) || product.defaultQty || 1,
      unit: (unit || product.unit || 'un').trim(),
      status: 'needed',
      site: '',
      note: product.notes || '',
      createdAt: now,
      updatedAt: now
    });
  }
  addAudit('marcou como pendente', 'item da feira', product.name);
  saveData();
  toast('Item na lista.', 'good');
}

function setShoppingStatus(id, status) {
  const item = db.pantry.list.find(entry => entry.id === id);
  if (!item) return;
  if (status === 'ordered') {
    openOrderDialog(id);
    return;
  }
  item.status = status;
  item.updatedAt = Date.now();
  if (status === 'bought') item.boughtAt = item.updatedAt;
  addAudit(status === 'bought' ? 'marcou como comprado' : 'marcou como pendente', 'item da feira', item.name);
  saveData();
}

function openOrderDialog(id) {
  const item = db.pantry.list.find(entry => entry.id === id);
  if (!item) return;
  const product = db.pantry.products.find(entry => entry.id === item.productId);
  $('#orderItemId').value = id;
  $('#orderSiteInput').value = item.site || product?.sites || '';
  $('#orderDialog').showModal();
  $('#orderSiteInput').focus();
}

function saveOrderFromForm(event) {
  event.preventDefault();
  const item = db.pantry.list.find(entry => entry.id === $('#orderItemId').value);
  if (!item) return;
  item.site = $('#orderSiteInput').value.trim();
  item.status = 'ordered';
  item.updatedAt = Date.now();
  addAudit('registrou pedido', 'item da feira', `${item.name}${item.site ? ` em ${item.site}` : ''}`);
  saveData();
  closeDialog('orderDialog');
  toast('Pedido registrado.', 'good');
}

function cycleRecordStatus(type, id) {
  const item = getCollection(type).find(entry => entry.id === id);
  if (!item) return;
  if (type === 'expense') item.status = item.status === 'paid' ? 'pending' : 'paid';
  if (type === 'income') item.status = item.status === 'received' ? 'expected' : 'received';
  if (type === 'receivable') item.status = item.status === 'received' ? 'open' : 'received';
  if (type === 'debt') item.status = item.status === 'paid' ? 'open' : 'paid';
  item.updatedAt = Date.now();
  addAudit('alterou o status de', recordEntityLabel(type), `${recordDisplayName(type, item)} para ${statusLabel(type, item.status)}`);
  saveData();
}

function upsertRecurrence(id, type, item) {
  const now = Date.now();
  let recurrence = db.finances.recurring.find(entry => entry.id === id);
  if (!recurrence) {
    recurrence = { id, type, startMonth: state.month, createdAt: now };
    db.finances.recurring.push(recurrence);
  }
  Object.assign(recurrence, {
    type,
    title: item.title,
    amount: item.amount,
    dueDay: item.dueDay,
    day: item.day,
    owner: item.owner,
    category: item.category,
    accountId: item.accountId,
    notes: item.notes,
    active: true,
    updatedAt: now,
    deletedAt: 0
  });
}

function ensureRecurringForMonth() {
  const created = [];
  visible(db.finances.recurring).filter(item => item.active && item.startMonth <= state.month).forEach(recurrence => {
    const collection = recurrence.type === 'income' ? db.finances.incomes : db.finances.expenses;
    const alreadyCreated = collection.some(item => item.recurrenceId === recurrence.id && item.month === state.month);
    if (alreadyCreated) return;
    const now = Date.now();
    const item = {
      id: uid(recurrence.type),
      recurrenceId: recurrence.id,
      recurring: true,
      title: recurrence.title,
      amount: recurrence.amount,
      month: state.month,
      owner: recurrence.owner,
      category: recurrence.category,
      accountId: recurrence.accountId,
      notes: recurrence.notes,
      status: recurrence.type === 'income' ? 'expected' : 'pending',
      createdAt: now,
      updatedAt: now,
      deletedAt: 0
    };
    if (recurrence.type === 'income') item.day = recurrence.day;
    else item.dueDay = recurrence.dueDay;
    collection.push(item);
    created.push(item.title);
  });

  if (!created.length) return;
  addAudit('incluiu automaticamente', 'recorrência mensal', `${created.join(', ')} em ${monthLabel(state.month)}`, { actor: 'Sistema' });
  db.updatedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  syncState.meta.localDirty = true;
  saveSyncMeta();
  scheduleSync();
}

function recordConfig(type) {
  const configs = {
    expense: {
      singular: 'despesa',
      newLabel: 'Nova',
      showDay: true,
      dayLabel: 'Dia do pagamento',
      showStatus: true,
      showOwner: true,
      showCategory: true,
      showAccount: true,
      categories: EXPENSE_CATEGORIES,
      statuses: [['pending', 'A pagar'], ['paid', 'Pago'], ['scheduled', 'Agendado'], ['debt', 'Devendo']],
      defaultStatus: 'pending'
    },
    income: {
      singular: 'receita',
      newLabel: 'Nova',
      showDay: true,
      dayLabel: 'Dia',
      showStatus: true,
      showOwner: true,
      showCategory: true,
      showAccount: true,
      categories: INCOME_CATEGORIES,
      statuses: [['expected', 'Esperando'], ['received', 'Recebido']],
      defaultStatus: 'expected'
    },
    account: {
      singular: 'conta',
      newLabel: 'Nova',
      showDay: false,
      dayLabel: 'Dia',
      showStatus: false,
      showOwner: false,
      showCategory: true,
      showAccount: false,
      categories: ACCOUNT_TYPES,
      statuses: [],
      defaultStatus: ''
    },
    receivable: {
      singular: 'valor a receber',
      newLabel: 'Novo',
      showDay: true,
      dateField: true,
      dayLabel: 'Data',
      showStatus: true,
      showOwner: true,
      showCategory: true,
      showAccount: false,
      categories: FLOW_CATEGORIES,
      statuses: [['open', 'Aberto'], ['received', 'Recebido']],
      defaultStatus: 'open'
    },
    debt: {
      singular: 'dívida',
      newLabel: 'Nova',
      showDay: true,
      dateField: true,
      dayLabel: 'Data',
      showStatus: true,
      showOwner: true,
      showCategory: true,
      showAccount: false,
      categories: FLOW_CATEGORIES,
      statuses: [['open', 'Aberto'], ['paid', 'Pago']],
      defaultStatus: 'open'
    }
  };
  return configs[type];
}

function getCollection(type) {
  const map = {
    expense: db.finances.expenses,
    income: db.finances.incomes,
    account: db.finances.accounts,
    receivable: db.finances.receivables,
    debt: db.finances.debts
  };
  return map[type];
}

function accountOptions() {
  return [['', 'Sem conta']].concat(visible(db.finances.accounts).map(item => [item.id, item.name]));
}

function marketCategories() {
  return Array.from(new Set(DEFAULT_MARKET_CATEGORIES.concat(db.pantry.categories || [], visible(db.pantry.products).map(product => product.category).filter(Boolean)))).sort((a, b) => a.localeCompare(b));
}

function saveData(options = {}) {
  db.updatedAt = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  if (!options.skipRender) render();
  if (!options.skipSync) {
    syncState.meta.localDirty = true;
    saveSyncMeta();
    scheduleSync();
  }
}

function loadStoredDB() {
  return readJSON(localStorage.getItem(STORAGE_KEY), defaultDB());
}

function defaultDB() {
  const now = Date.now();
  const seedProducts = [
    ['Arroz', 'Mercado', 1, 'kg'],
    ['Feijão', 'Mercado', 1, 'kg'],
    ['Café', 'Mercado', 1, 'pct'],
    ['Leite', 'Mercado', 2, 'un'],
    ['Ovos', 'Feira', 1, 'bandeja'],
    ['Banana', 'Feira', 1, 'kg'],
    ['Tomate', 'Feira', 1, 'kg'],
    ['Papel higiênico', 'Higiene', 1, 'pct'],
    ['Sabão em pó', 'Limpeza', 1, 'un']
  ].map(([name, category, defaultQty, unit]) => ({
    id: uid('product'),
    name,
    category,
    defaultQty,
    unit,
    goodBrands: '',
    badBrands: '',
    sites: '',
    notes: '',
    createdAt: now,
    updatedAt: now
  }));

  return {
    appId: APP_ID,
    schemaVersion: 1,
    createdAt: now,
    updatedAt: now,
    settings: {
      householdName: 'Nossa casa',
      members: OWNERS
    },
    finances: {
      expenses: [],
      incomes: [],
      recurring: [],
      accounts: [
        { id: uid('account'), name: 'Conta', type: 'Conta corrente', balance: 0, notes: '', createdAt: now, updatedAt: now },
        { id: uid('account'), name: 'Poupança', type: 'Poupança', balance: 0, notes: '', createdAt: now, updatedAt: now }
      ],
      receivables: [],
      debts: []
    },
    pantry: {
      categories: DEFAULT_MARKET_CATEGORIES.slice(),
      products: seedProducts,
      list: []
    },
    audit: []
  };
}

function normalizeDB(input) {
  const base = defaultDB();
  const data = input && typeof input === 'object' ? input : base;
  const normalized = {
    ...base,
    ...data,
    settings: { ...base.settings, ...(data.settings || {}) },
    finances: { ...base.finances, ...(data.finances || {}) },
    pantry: { ...base.pantry, ...(data.pantry || {}) }
  };
  normalized.appId = APP_ID;
  normalized.schemaVersion = 1;
  ['expenses', 'incomes', 'accounts', 'receivables', 'debts', 'recurring'].forEach(key => {
    normalized.finances[key] = Array.isArray(normalized.finances[key]) ? normalized.finances[key].map(normalizeItem) : [];
  });
  ['products', 'list'].forEach(key => {
    normalized.pantry[key] = Array.isArray(normalized.pantry[key]) ? normalized.pantry[key].map(normalizeItem) : [];
  });
  normalized.pantry.categories = Array.isArray(normalized.pantry.categories) ? normalized.pantry.categories : DEFAULT_MARKET_CATEGORIES.slice();
  normalized.audit = Array.isArray(normalized.audit) ? normalized.audit.map(normalizeItem) : [];
  return normalized;
}

function normalizeItem(item) {
  const now = Date.now();
  return {
    createdAt: now,
    updatedAt: now,
    deletedAt: 0,
    ...item
  };
}

async function ensureUnlocked() {
  const security = loadSecurity();
  if (!security.hash) {
    showPinDialog('create');
    return false;
  }
  if (sessionStorage.getItem(SESSION_UNLOCK_KEY) === '1') return true;
  showPinDialog('unlock');
  return false;
}

function showPinDialog(mode) {
  const security = loadSecurity();
  $('#pinMode').value = mode;
  $('#pinError').hidden = true;
  $('#pinError').textContent = '';
  $('#pinInput').value = '';
  $('#pinConfirmInput').value = '';
  $('#currentPinInput').value = '';
  $('#currentPinWrap').hidden = mode !== 'change';
  $('#pinConfirmWrap').hidden = mode === 'unlock';
  $('#pinLabel').textContent = mode === 'unlock' ? 'PIN' : 'Novo PIN';
  $('#pinTitle').textContent = mode === 'create' ? 'Criar PIN' : mode === 'change' ? 'Trocar PIN' : 'Entrar';
  $('#pinSubmitBtn').textContent = mode === 'unlock' ? 'Entrar' : 'Salvar PIN';
  $('#pinDialog').showModal();
  setTimeout(() => (mode === 'change' ? $('#currentPinInput') : $('#pinInput')).focus(), 50);
  if (mode !== 'create' && !security.hash) showPinDialog('create');
}

async function handlePinSubmit(event) {
  event.preventDefault();
  const mode = $('#pinMode').value;
  const security = loadSecurity();
  const pin = $('#pinInput').value.trim();
  const confirmPin = $('#pinConfirmInput').value.trim();
  const currentPin = $('#currentPinInput').value.trim();

  try {
    if (mode === 'unlock') {
      if (!(await verifyPin(pin, security))) throw new Error('PIN incorreto.');
      unlockSession();
      closeDialog('pinDialog');
      initializeSync().catch(() => renderSyncStatus());
      return;
    }

    if (mode === 'change' && !(await verifyPin(currentPin, security))) throw new Error('PIN atual incorreto.');
    if (!/^\d{4,8}$/.test(pin)) throw new Error('Use de 4 a 8 numeros.');
    if (pin !== confirmPin) throw new Error('A confirmacao nao confere.');
    const salt = cryptoRandom();
    const hash = await hashPin(pin, salt);
    saveSecurity({ ...security, salt, hash, updatedAt: Date.now() });
    unlockSession();
    closeDialog('pinDialog');
    renderSettings();
    toast('PIN salvo.', 'good');
  } catch (error) {
    $('#pinError').textContent = error.message;
    $('#pinError').hidden = false;
  }
}

function unlockSession() {
  sessionStorage.setItem(SESSION_UNLOCK_KEY, '1');
  resetIdleLock();
}

function lockApp() {
  sessionStorage.removeItem(SESSION_UNLOCK_KEY);
  showPinDialog('unlock');
}

function loadSecurity() {
  return {
    salt: '',
    hash: '',
    lockAfterMinutes: 15,
    ...readJSON(localStorage.getItem(SECURITY_KEY), {})
  };
}

function saveSecurity(security) {
  localStorage.setItem(SECURITY_KEY, JSON.stringify(security));
}

async function verifyPin(pin, security) {
  if (!security.hash || !security.salt) return false;
  const hash = await hashPin(pin, security.salt);
  return hash === security.hash;
}

async function hashPin(pin, salt) {
  if (!window.crypto?.subtle) throw new Error('Criptografia indisponivel neste navegador.');
  const bytes = new TextEncoder().encode(`${salt}:${pin}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return arrayBufferToBase64(digest);
}

function cryptoRandom() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

function startIdleLock() {
  ['pointerdown', 'keydown', 'touchstart'].forEach(eventName => document.addEventListener(eventName, resetIdleLock, { passive: true }));
  resetIdleLock();
}

function resetIdleLock() {
  clearTimeout(state.idleTimer);
  const security = loadSecurity();
  if (!security.hash || sessionStorage.getItem(SESSION_UNLOCK_KEY) !== '1') return;
  state.idleTimer = setTimeout(() => {
    if (document.visibilityState === 'visible') lockApp();
  }, Number(security.lockAfterMinutes || 15) * 60 * 1000);
}

async function initializeSync() {
  if (!syncEnabled() || sessionStorage.getItem(SESSION_UNLOCK_KEY) !== '1') {
    renderSyncStatus();
    return;
  }
  try {
    const status = await syncRequest('status');
    syncState.meta.initialized = status.initialized === true;
    syncState.meta.serverTime = status.serverTime || 0;
    saveSyncMeta();
    if (syncState.token && syncState.user) await checkRemoteRevision();
  } catch (error) {
    console.warn('Sync status failed', error);
  } finally {
    renderSyncStatus();
  }
}

function syncEnabled() {
  return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/i.test(syncState.settings.url || '');
}

async function handleSyncSetup(event) {
  event.preventDefault();
  const url = $('#syncUrlInput').value.trim().replace(/\/+$/, '');
  if (!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/i.test(url)) return toast('URL do Apps Script invalida.', 'error');
  syncState.settings.url = url;
  syncState.settings.ownerLogin = ($('#syncOwnerLoginInput').value.trim() || 'lincoln').toLowerCase();
  saveSyncSettings();

  try {
    const status = await syncRequest('status', {}, url);
    if (!status.initialized) {
      const ownerPin = $('#syncOwnerPinInput').value.trim();
      const partnerPin = $('#syncPartnerPinInput').value.trim();
      if (!/^\d{4,8}$/.test(ownerPin) || !/^\d{4,8}$/.test(partnerPin)) throw new Error('Use PINs de 4 a 8 numeros.');
      const payload = await syncRequest('bootstrap', {
        installationKey: $('#syncInstallKeyInput').value.trim(),
        ownerName: 'Lincoln',
        ownerLogin: syncState.settings.ownerLogin,
        ownerPin,
        partnerName: 'Aryana',
        partnerLogin: 'aryana',
        partnerPin,
        data: db
      }, url);
      applyAuthPayload(payload);
      syncState.meta.initialized = true;
      syncState.meta.localDirty = false;
      syncState.meta.lastSyncAt = Date.now();
      saveSyncMeta();
    } else {
      syncState.meta.initialized = true;
      saveSyncMeta();
    }
    $('#syncInstallKeyInput').value = '';
    $('#syncOwnerPinInput').value = '';
    $('#syncPartnerPinInput').value = '';
    renderSyncStatus();
    toast('Sincronização configurada.', 'good');
  } catch (error) {
    toast(error.message || 'Falha ao conectar.', 'error');
  }
}

async function handleSyncLogin(event) {
  event.preventDefault();
  if (!syncEnabled()) return toast('Configure a URL primeiro.', 'error');
  const login = $('#syncLoginInput').value.trim().toLowerCase();
  const pin = $('#syncPinInput').value.trim();
  if (!login || !pin) return toast('Informe login e PIN.', 'error');
  try {
    const payload = await syncRequest('login', { login, pin });
    applyAuthPayload(payload);
    localStorage.setItem(LAST_LOGIN_KEY, login);
    $('#syncPinInput').value = '';
    await pullRemoteData({ merge: true, notify: false });
    toast('Login feito.', 'good');
  } catch (error) {
    toast(error.message || 'Login falhou.', 'error');
  }
}

async function syncNow() {
  if (!syncEnabled()) {
    setView('settings');
    toast('Configure a sincronizacao.', 'error');
    return;
  }
  if (!syncState.user) {
    setView('settings');
    toast('Entre no perfil de sincronizacao.', 'error');
    return;
  }
  if (syncState.meta.localDirty) {
    await pushRemoteData(false, true);
  } else {
    await pullRemoteData({ merge: true, notify: true });
  }
}

function scheduleSync() {
  clearTimeout(syncState.timer);
  if (!syncEnabled() || !syncState.user) return;
  syncState.timer = setTimeout(() => pushRemoteData(false, false), SYNC_DEBOUNCE_MS);
}

async function pushRemoteData(force = false, notify = false) {
  if (!syncEnabled() || !syncState.user || syncState.busy) return false;
  if (!force && !syncState.meta.localDirty) return true;
  syncState.busy = true;
  renderSyncStatus();
  try {
    const payload = await syncRequest('save', {
      data: db,
      baseRevision: syncState.revision,
      force
    });
    syncState.revision = Number(payload.revision || syncState.revision || 0);
    sessionStorage.setItem(SYNC_REVISION_KEY, String(syncState.revision));
    syncState.meta.localDirty = false;
    syncState.meta.conflict = false;
    syncState.meta.lastSyncAt = Date.now();
    saveSyncMeta();
    if (notify) toast('Dados enviados.', 'good');
    return true;
  } catch (error) {
    if (error.conflict) {
      await resolveSyncConflict();
      if (notify) toast('Dados mesclados e enviados.', 'good');
      return true;
    }
    syncState.meta.conflict = true;
    saveSyncMeta();
    if (notify) toast(error.message || 'Falha ao enviar.', 'error');
    return false;
  } finally {
    syncState.busy = false;
    renderSyncStatus();
  }
}

async function resolveSyncConflict() {
  const remote = await syncRequest('pull');
  const merged = mergeDB(normalizeDB(remote.data), db);
  db = merged;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  syncState.revision = Number(remote.revision || 0);
  sessionStorage.setItem(SYNC_REVISION_KEY, String(syncState.revision));
  const saved = await syncRequest('save', { data: db, baseRevision: syncState.revision, force: true });
  syncState.revision = Number(saved.revision || syncState.revision || 0);
  sessionStorage.setItem(SYNC_REVISION_KEY, String(syncState.revision));
  syncState.meta.localDirty = false;
  syncState.meta.conflict = false;
  syncState.meta.lastSyncAt = Date.now();
  saveSyncMeta();
  render();
}

async function pullRemoteData(options = {}) {
  const { merge = true, notify = false } = options;
  if (!syncEnabled() || !syncState.user || syncState.busy) return false;
  syncState.busy = true;
  try {
    const payload = await syncRequest('pull');
    const incoming = normalizeDB(payload.data);
    db = merge ? mergeDB(incoming, db) : incoming;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    syncState.revision = Number(payload.revision || syncState.revision || 0);
    sessionStorage.setItem(SYNC_REVISION_KEY, String(syncState.revision));
    syncState.meta.localDirty = merge ? syncState.meta.localDirty : false;
    syncState.meta.conflict = false;
    syncState.meta.lastSyncAt = Date.now();
    saveSyncMeta();
    render();
    if (merge && syncState.meta.localDirty) await pushRemoteData(true, false);
    if (notify) toast('Dados atualizados.', 'good');
    return true;
  } catch (error) {
    if (notify) toast(error.message || 'Falha ao puxar dados.', 'error');
    return false;
  } finally {
    syncState.busy = false;
    renderSyncStatus();
  }
}

async function checkRemoteRevision() {
  if (!syncEnabled() || !syncState.user || syncState.busy) return;
  const status = await syncRequest('check');
  if (Number(status.revision || 0) > syncState.revision && !syncState.meta.localDirty) {
    await pullRemoteData({ merge: false, notify: false });
  }
}

async function syncRequest(action, payload = {}, urlOverride = '') {
  const url = urlOverride || syncState.settings.url;
  const body = {
    appId: APP_ID,
    action,
    token: syncState.token,
    payload
  };
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body)
    });
  } catch (error) {
    throw new Error('Nao consegui acessar o Apps Script. Confira se a URL termina em /exec, se a implantacao esta como Qualquer pessoa, se o script foi autorizado e se o app foi aberto por http/https.');
  }
  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch (error) {
    throw new Error('Resposta invalida do servidor. Confira se voce colou a URL /exec da implantacao do Apps Script.');
  }
  if (!response.ok || json.ok === false) {
    const error = new Error(json.error || 'Falha na sincronizacao.');
    Object.assign(error, json);
    throw error;
  }
  return json;
}

function applyAuthPayload(payload) {
  syncState.token = payload.token || '';
  syncState.user = payload.user || null;
  syncState.revision = Number(payload.revision || 0);
  sessionStorage.setItem(SYNC_TOKEN_KEY, syncState.token);
  sessionStorage.setItem(SYNC_USER_KEY, JSON.stringify(syncState.user));
  sessionStorage.setItem(SYNC_REVISION_KEY, String(syncState.revision));
}

function logoutSync() {
  if (syncState.token && syncEnabled()) syncRequest('logout').catch(() => {});
  syncState.token = '';
  syncState.user = null;
  syncState.revision = 0;
  sessionStorage.removeItem(SYNC_TOKEN_KEY);
  sessionStorage.removeItem(SYNC_USER_KEY);
  sessionStorage.removeItem(SYNC_REVISION_KEY);
  renderSyncStatus();
  toast('Sync desconectado.', 'good');
}

function loadSyncSettings() {
  return { url: '', ownerLogin: 'lincoln', ...readJSON(localStorage.getItem(SYNC_SETTINGS_KEY), {}) };
}

function saveSyncSettings() {
  localStorage.setItem(SYNC_SETTINGS_KEY, JSON.stringify(syncState.settings));
}

function loadSyncMeta() {
  return {
    initialized: false,
    localDirty: false,
    conflict: false,
    lastSyncAt: 0,
    serverTime: 0,
    ...readJSON(localStorage.getItem(SYNC_META_KEY), {})
  };
}

function saveSyncMeta() {
  localStorage.setItem(SYNC_META_KEY, JSON.stringify(syncState.meta));
}

function mergeDB(remote, local) {
  const merged = normalizeDB(remote);
  merged.settings = newerRoot(remote, local) === local ? clone(local.settings) : clone(remote.settings);
  merged.finances.expenses = mergeArray(remote.finances.expenses, local.finances.expenses);
  merged.finances.incomes = mergeArray(remote.finances.incomes, local.finances.incomes);
  merged.finances.recurring = mergeArray(remote.finances.recurring, local.finances.recurring);
  merged.finances.accounts = mergeArray(remote.finances.accounts, local.finances.accounts);
  merged.finances.receivables = mergeArray(remote.finances.receivables, local.finances.receivables);
  merged.finances.debts = mergeArray(remote.finances.debts, local.finances.debts);
  merged.pantry.products = mergeArray(remote.pantry.products, local.pantry.products);
  merged.pantry.list = mergeArray(remote.pantry.list, local.pantry.list);
  merged.audit = mergeArray(remote.audit, local.audit);
  merged.pantry.categories = Array.from(new Set([...(remote.pantry.categories || []), ...(local.pantry.categories || [])]));
  merged.updatedAt = Math.max(Number(remote.updatedAt || 0), Number(local.updatedAt || 0), Date.now());
  return merged;
}

function mergeArray(remoteItems = [], localItems = []) {
  const map = new Map();
  [...remoteItems, ...localItems].forEach(item => {
    if (!item?.id) return;
    const previous = map.get(item.id);
    if (!previous || itemStamp(item) >= itemStamp(previous)) map.set(item.id, clone(item));
  });
  return Array.from(map.values());
}

function newerRoot(remote, local) {
  return Number(local?.updatedAt || 0) >= Number(remote?.updatedAt || 0) ? local : remote;
}

function itemStamp(item) {
  return Math.max(Number(item.updatedAt || 0), Number(item.deletedAt || 0), Number(item.createdAt || 0));
}

function exportData() {
  const backup = clone(db);
  downloadJSON(backup, `alo_financas_backup_${dateStamp()}.json`);
}

function handleImportFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = normalizeDB(JSON.parse(String(reader.result || '{}')));
      if (imported.appId !== APP_ID) throw new Error('Arquivo inválido.');
      if (!confirm('Substituir os dados deste aparelho pelo backup?')) return;
      db = imported;
      addAudit('importou', 'o backup', 'Dados restaurados neste aparelho');
      saveData();
      toast('Backup importado.', 'good');
    } catch (error) {
      toast(error.message || 'Falha ao importar.', 'error');
    } finally {
      event.target.value = '';
    }
  };
  reader.readAsText(file);
}

function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function prepareInstallPrompt() {
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    state.deferredInstall = event;
    $('#installBtn').hidden = false;
  });
}

async function installApp() {
  if (!state.deferredInstall) return;
  state.deferredInstall.prompt();
  await state.deferredInstall.userChoice;
  state.deferredInstall = null;
  $('#installBtn').hidden = true;
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(registration => registration.update()).catch(error => console.warn('Service worker', error));
  }
}

function shiftMonth(delta) {
  state.month = shiftMonthValue(state.month, delta);
  render();
}

function shiftMonthValue(monthValue, delta) {
  const [year, month] = monthValue.split('-').map(Number);
  const date = new Date(year, month - 1 + delta, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function currentMonth() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function monthLabel(monthValue) {
  const [year, month] = monthValue.split('-').map(Number);
  return MONTH_LONG.format(new Date(year, month - 1, 1));
}

function shortDateTime(value) {
  if (!value) return '-';
  return new Date(value).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function dateOrDash(value) {
  if (!value) return '-';
  const [year, month, day] = String(value).split('-').map(Number);
  if (!year || !month || !day) return value;
  return new Date(year, month - 1, day).toLocaleDateString('pt-BR');
}

function dateStamp() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function sortByOpenDate(a, b) {
  const statusA = a.status === 'open' ? 0 : 1;
  const statusB = b.status === 'open' ? 0 : 1;
  return statusA - statusB || String(a.dueDate || '').localeCompare(String(b.dueDate || ''));
}

function clampDay(value) {
  const day = Math.max(1, Math.min(31, Number(String(value).replace(/\D/g, '')) || 1));
  return day;
}

function parseMoney(value) {
  if (typeof value === 'number') return value;
  const normalized = String(value || '')
    .replace(/[^\d,.-]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : NaN;
}

function parseDecimal(value) {
  if (typeof value === 'number') return value;
  const parsed = Number(String(value || '').replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value) {
  return BRL.format(Number(value || 0));
}

function formatNumberInput(value) {
  return Number(value || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function sum(items, key) {
  return items.reduce((total, item) => total + Number(item[key] || 0), 0);
}

function addAudit(action, entity, summary, options = {}) {
  if (!Array.isArray(db.audit)) db.audit = [];
  const actor = options.actor || syncState.user?.name || syncState.user?.login || 'Neste aparelho';
  const now = Date.now();
  db.audit.push({
    id: uid('audit'),
    actor,
    action: `${action} ${entity}`,
    summary: String(summary || '-'),
    createdAt: now,
    updatedAt: now,
    deletedAt: 0
  });
  if (db.audit.length > 500) db.audit = db.audit.sort((a, b) => Number(b.createdAt || 0) - Number(a.createdAt || 0)).slice(0, 500);
}

function recordEntityLabel(type) {
  return ({ expense: 'a despesa', income: 'a receita', account: 'a conta', receivable: 'o valor a receber', debt: 'a dívida' })[type] || 'o registro';
}

function recordDisplayName(type, item) {
  if (!item) return 'Registro';
  return type === 'account' ? item.name : type === 'receivable' || type === 'debt' ? item.person || item.title : item.title;
}

function initials(value) {
  return String(value || '?').trim().split(/\s+/).slice(0, 2).map(part => part[0] || '').join('').toUpperCase();
}

function capitalize(value) {
  const text = String(value || '');
  return text ? text[0].toUpperCase() + text.slice(1) : text;
}

function visible(items) {
  return (items || []).filter(item => !item.deletedAt);
}

function markDeleted(items, id) {
  const item = items.find(entry => entry.id === id);
  if (!item) return;
  item.deletedAt = Date.now();
  item.updatedAt = item.deletedAt;
}

function fillSelect(select, options, value = '') {
  select.innerHTML = options.map(option => {
    const [optionValue, label] = Array.isArray(option) ? option : [option, option];
    return `<option value="${escapeAttr(optionValue)}">${escapeHTML(label)}</option>`;
  }).join('');
  select.value = value;
}

function setSegmentActive(rootSelector, dataName, value) {
  const attr = dataName === 'expenseFilter' ? 'expense-filter' : 'market-filter';
  $$(`${rootSelector} [data-${attr}]`).forEach(button => {
    button.classList.toggle('is-active', button.dataset[dataName] === value);
  });
}

function closeDialog(id) {
  const dialog = document.getElementById(id);
  if (dialog?.open) dialog.close();
}

function toast(message, type = '') {
  const toastEl = document.createElement('div');
  toastEl.className = `toast ${type}`;
  toastEl.textContent = message;
  $('#toastRegion').appendChild(toastEl);
  setTimeout(() => toastEl.remove(), 3400);
}

function decorateIcons() {
  $$('[data-icon]').forEach(element => {
    const name = element.dataset.icon;
    if (!element.querySelector('svg')) element.insertAdjacentHTML('afterbegin', iconSvg(name));
  });
  $$('[data-static-icon]').forEach(element => {
    element.innerHTML = iconSvg(element.dataset.staticIcon);
  });
}

function iconSvg(name) {
  return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.package}</svg>`;
}

function uid(prefix) {
  if (crypto?.randomUUID) return `${prefix}_${crypto.randomUUID()}`;
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
}

function normalizeText(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[char]);
}

function escapeAttr(value) {
  return escapeHTML(value);
}

function readJSON(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach(byte => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function $(selector, root = document) {
  return root.querySelector(selector);
}

function $$(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}
