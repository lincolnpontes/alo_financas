const APP_ID = 'alo-financas';
const APP_VERSION = '1.0.12';
const STORAGE_KEY = 'alo_financas_db_v1';
const SYNC_SETTINGS_KEY = 'alo_financas_sync_settings_v1';
const SYNC_META_KEY = 'alo_financas_sync_meta_v1';
const SYNC_TOKEN_KEY = 'alo_financas_sync_token_v1';
const SYNC_USER_KEY = 'alo_financas_sync_user_v1';
const SYNC_REVISION_KEY = 'alo_financas_sync_revision_v1';
const LAST_LOGIN_KEY = 'alo_financas_last_login_v1';
const SYNC_DEBOUNCE_MS = 1800;
const MARKET_REORDER_DELAY_MS = 10000;
const MARKET_PURGE_AFTER_MS = 7 * 24 * 60 * 60 * 1000;

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const DATE_LONG = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
const MONTH_LONG = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' });

const EXPENSE_CATEGORIES = ['Casa', 'Cartao', 'Saude', 'Internet', 'Mercado', 'Transporte', 'Familia', 'Impostos', 'Outros'];
const INCOME_CATEGORIES = ['Salário', 'Extra', 'Reembolso', 'Rendimento', 'Pix', 'Outros'];
const ACCOUNT_TYPES = ['Conta corrente', 'Poupança', 'Investimento', 'Dinheiro', 'Carteira digital'];
const FLOW_CATEGORIES = ['Familia', 'Trabalho', 'Reembolso', 'Emprestimo', 'Outros'];
const DEFAULT_MARKET_CATEGORIES = ['Frios', 'Secos', 'Higiene', 'Limpeza', 'Hortifruti', 'Bebidas', 'Farmacia', 'Pet', 'Outros'];
const OWNERS = ['Todos'];

const ICONS = {
  'badge-dollar-sign': '<path d="M3 11.5 12 2l9 9.5-9 9.5-9-9.5Z"></path><path d="M12 7v9"></path><path d="M14.5 9.5c-.4-.5-1.1-.8-2.1-.8-1.2 0-2 .5-2 1.3 0 2 4.4.8 4.4 3 0 .8-.8 1.4-2.1 1.4-1.1 0-2-.4-2.6-1"></path>',
  'calendar-days': '<path d="M8 2v4"></path><path d="M16 2v4"></path><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path>',
  check: '<path d="m20 6-11 11-5-5"></path>',
  'chevron-down': '<path d="m6 9 6 6 6-6"></path>',
  'chevron-left': '<path d="m15 18-6-6 6-6"></path>',
  'chevron-right': '<path d="m9 18 6-6-6-6"></path>',
  'chevron-up': '<path d="m18 15-6-6-6 6"></path>',
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
  'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path>',
  minus: '<path d="M5 12h14"></path>',
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

const storedDB = loadStoredDB();
let db = normalizeDB(storedDB);
purgeExpiredBoughtItems(db);
const dataCleanupPending = JSON.stringify(storedDB) !== JSON.stringify(db);
let state = {
  view: 'dashboard',
  month: currentMonth(),
  expenseFilter: 'all',
  marketFilter: 'all',
  marketCategory: 'all',
  productSearch: '',
  marketDraftQty: {},
  marketDraftUnit: {},
  marketFrozenOrder: [],
  marketReorderUntil: 0,
  marketReorderTimer: null,
  taskFilter: 'pending',
  taskOwner: 'all',
  registryType: '',
  deferredInstall: null
};

let syncState = {
  settings: loadSyncSettings(),
  meta: loadSyncMeta(),
  token: sessionStorage.getItem(SYNC_TOKEN_KEY) || '',
  user: readJSON(sessionStorage.getItem(SYNC_USER_KEY), null),
  revision: Number(sessionStorage.getItem(SYNC_REVISION_KEY) || 0),
  users: [],
  busy: false,
  timer: null,
  pollTimer: null
};

if (dataCleanupPending) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  syncState.meta.localDirty = true;
  saveSyncMeta();
}

document.addEventListener('DOMContentLoaded', init);

function init() {
  decorateIcons();
  bindEvents();
  $('#monthPicker').value = state.month;
  $('#syncUrlInput').value = syncState.settings.url || '';
  $('#syncOwnerLoginInput').value = syncState.settings.ownerLogin || 'lincoln';
  $('#syncLoginInput').value = localStorage.getItem(LAST_LOGIN_KEY) || syncState.settings.ownerLogin || 'lincoln';
  $('#accessLoginInput').value = localStorage.getItem(LAST_LOGIN_KEY) || syncState.settings.ownerLogin || 'lincoln';
  render();
  setInterval(cleanupExpiredBoughtItems, 60 * 60 * 1000);
  registerServiceWorker();
  prepareInstallPrompt();
  initializeAccess().catch(() => renderSyncStatus());
}

function bindEvents() {
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('input', handleDocumentInput);
  document.addEventListener('change', handleDocumentChange);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') return;
    const removed = cleanupExpiredBoughtItems();
    if (!removed && syncState.user) checkRemoteRevision().catch(() => {});
  });
  window.addEventListener('online', () => {
    if (syncState.user) (syncState.meta.localDirty ? pushRemoteData(false, false) : checkRemoteRevision()).catch(() => {});
  });
  $('#recordForm').addEventListener('submit', saveRecordFromForm);
  $('#taskForm').addEventListener('submit', saveTaskFromForm);
  $('#productForm').addEventListener('submit', saveProductFromForm);
  $('#orderForm').addEventListener('submit', saveOrderFromForm);
  $('#quantityForm').addEventListener('submit', saveQuantityFromForm);
  $('#syncUserForm').addEventListener('submit', saveSyncUserFromForm);
  $('#registryForm').addEventListener('submit', saveRegistryEntry);
  $('#accessLoginForm').addEventListener('submit', handleAccessLogin);
  $('#syncSetupForm').addEventListener('submit', handleSyncSetup);
  $('#syncLoginForm').addEventListener('submit', handleSyncLogin);
  $('#importFileInput').addEventListener('change', handleImportFile);
  $('#loginDialog').addEventListener('cancel', event => event.preventDefault());
}

function handleDocumentClick(event) {
  const quickMenu = $('#quickActionsMenu');
  if (!quickMenu.hidden && !event.target.closest('#quickActionsMenu') && !event.target.closest('[data-record-actions], [data-product-actions], [data-task-actions]')) {
    closeQuickActionsMenu();
  }
  const button = event.target.closest('button');
  if (!button) return;

  const viewButton = button.closest('[data-view]');
  if (viewButton) {
    setView(viewButton.dataset.view);
    return;
  }

  const jumpButton = button.closest('[data-view-jump]');
  if (jumpButton) {
    if (jumpButton.dataset.expenseFilter) state.expenseFilter = jumpButton.dataset.expenseFilter;
    navigateToView(jumpButton.dataset.viewJump, jumpButton.dataset.viewTarget || '');
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

  const recordActions = button.closest('[data-record-actions]');
  if (recordActions) {
    openRecordActions(recordActions.dataset.recordType || 'expense', recordActions.dataset.id, recordActions);
    return;
  }

  const taskActions = button.closest('[data-task-actions]');
  if (taskActions) {
    openTaskActions(taskActions.dataset.id, taskActions);
    return;
  }

  const productActions = button.closest('[data-product-actions]');
  if (productActions) {
    openProductActions(productActions.dataset.id, productActions.dataset.listId, productActions);
    return;
  }

  const editSyncUser = button.closest('[data-edit-sync-user]');
  if (editSyncUser) {
    openSyncUserDialog(editSyncUser.dataset.login);
    return;
  }

  const deleteRegistry = button.closest('[data-delete-registry]');
  if (deleteRegistry) {
    deleteRegistryEntry(deleteRegistry.dataset.value);
    return;
  }

  const moveCategory = button.closest('[data-move-category]');
  if (moveCategory) {
    moveMarketCategory(moveCategory.dataset.moveCategory, Number(moveCategory.dataset.direction));
    return;
  }

  const addProductToList = button.closest('[data-add-product-list]');
  if (addProductToList) {
    addProductToShoppingList(addProductToList.dataset.id);
    return;
  }

  const markProductNeededButton = button.closest('[data-mark-product-needed]');
  if (markProductNeededButton) {
    markProductNeeded(markProductNeededButton.dataset.markProductNeeded);
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

  const quantityChange = button.closest('[data-quantity-change]');
  if (quantityChange) {
    changeShoppingQuantity(quantityChange.dataset.id, Number(quantityChange.dataset.quantityChange));
    return;
  }

  const draftQuantityChange = button.closest('[data-draft-quantity]');
  if (draftQuantityChange) {
    changeDraftQuantity(draftQuantityChange.dataset.id, Number(draftQuantityChange.dataset.draftQuantity));
    return;
  }

  const editQuantity = button.closest('[data-edit-quantity]');
  if (editQuantity) {
    openQuantityDialog(editQuantity.dataset.id);
    return;
  }

  const editDraftQuantity = button.closest('[data-edit-draft-quantity]');
  if (editDraftQuantity) {
    openDraftQuantityDialog(editDraftQuantity.dataset.id);
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
  if (button.id === 'addTaskBtn') openTaskDialog();
  if (button.id === 'deleteTaskBtn') deleteCurrentTask();
  if (button.id === 'deleteProductBtn') deleteCurrentProduct();
  if (button.id === 'openAuditBtn') $('#auditDialog').showModal();
  if (button.id === 'addSyncUserBtn') openSyncUserDialog();
  if (button.id === 'deleteSyncUserBtn') deleteSyncUser();
  if (button.id === 'quickStateBtn') runQuickStateAction();
  if (button.id === 'quickTaskProgressBtn') runQuickTaskProgressAction();
  if (button.id === 'quickEditBtn') runQuickEditAction();
  if (button.id === 'quickHeaderEditBtn') runQuickProductEditAction();
  if (button.id === 'quickEditOrderBtn') runQuickEditOrderAction();
  if (button.id === 'quickDeleteOrderBtn') runQuickDeleteOrderAction();
  if (button.id === 'manageCategoriesBtn') openRegistryDialog('categories');
  if (button.id === 'manageSitesBtn') openRegistryDialog('sites');
  if (button.id === 'exportBtn') exportData();
  if (button.id === 'importBtn') $('#importFileInput').click();
  if (button.id === 'clearBoughtBtn') clearBoughtItems();
  if (button.id === 'accessLoginBtn') {
    event.preventDefault();
    $('#accessLoginForm').requestSubmit();
    return;
  }
  if (button.id === 'syncLoginBtn') {
    event.preventDefault();
    $('#syncLoginForm').requestSubmit();
    return;
  }
  if (button.id === 'lockBtn') lockApp();
  if (button.id === 'forceUpdateBtn') forceAppUpdate();
  if (button.id === 'installBtn') installApp();
}

function handleDocumentInput(event) {
  if (event.target.id === 'productSearch') {
    state.productSearch = event.target.value;
    renderShoppingList();
  }
}

function handleDocumentChange(event) {
  if (event.target.id === 'monthPicker') {
    state.month = event.target.value || currentMonth();
    render();
  }

  if (event.target.id === 'recordRecurring') {
    $('#recordKeepValueWrap').hidden = !event.target.checked;
  }

  if (event.target.id === 'marketStatusFilter') {
    state.marketFilter = event.target.value || 'all';
    renderShoppingList();
  }

  if (event.target.id === 'marketCategoryFilter') {
    state.marketCategory = event.target.value || 'all';
    renderShoppingList();
  }

  if (event.target.id === 'taskStatusFilter') {
    state.taskFilter = event.target.value || 'pending';
    renderTasks();
  }

  if (event.target.id === 'taskOwnerFilter') {
    state.taskOwner = event.target.value || 'all';
    renderTasks();
  }

  if (event.target.matches('[data-category-emoji]')) {
    updateMarketCategoryEmoji(event.target.dataset.categoryEmoji, event.target.value);
  }

}

function setView(view) {
  const changed = state.view !== view;
  state.view = view;
  render();
  if (changed) window.scrollTo(0, 0);
}

function navigateToView(view, targetId = '') {
  setView(view);
  if (!targetId) return;
  requestAnimationFrame(() => {
    const target = document.getElementById(targetId);
    (target?.closest('.panel') || target)?.scrollIntoView({ block: 'start' });
  });
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
  $('#financeMonthLabel').textContent = capitalize(monthLabel(state.month));
  $('#todayLabel').textContent = DATE_LONG.format(new Date());
  renderDashboard();
  renderFinances();
  renderMarket();
  renderTasks();
  renderSettings();
  renderSyncStatus();
}

function renderDashboard() {
  const dashboardMonth = currentMonth();
  const totals = calculateTotals(dashboardMonth);
  const previousPending = visible(db.finances.expenses)
    .filter(item => item.month < dashboardMonth && item.status !== 'paid' && !isCardExpense(item));
  const pendingWithHistory = totals.expenseOpen + sum(previousPending, 'amount');
  const dueSoon = visible(db.finances.expenses)
    .filter(item => item.month === dashboardMonth && item.status !== 'paid')
    .sort((a, b) => Number(a.dueDay || 0) - Number(b.dueDay || 0))
    .slice(0, 6);
  const neededItems = visible(db.pantry.list)
    .filter(item => item.status !== 'bought')
    .sort((a, b) => Number(b.updatedAt || b.createdAt || 0) - Number(a.updatedAt || a.createdAt || 0));
  const pendingTasks = visible(db.tasks)
    .filter(item => item.status !== 'completed')
    .sort((a, b) => String(a.dueDate || '9999-12-31').localeCompare(String(b.dueDate || '9999-12-31')))
    .slice(0, 5);

  $('#metricGrid').innerHTML = [
    metricEmoji('Receitas', totals.incomeTotal, '', '💲', 'income', true, { view: 'finances', target: 'incomeList' }),
    metricEmoji('Despesas', totals.expenseTotal, '', '💲', 'expense', true, { view: 'finances', target: 'expenseList', expenseFilter: 'all' }),
    metricEmoji('Pendente', pendingWithHistory, '', '⚠️', 'pending', true, { view: 'finances', target: 'expenseList', expenseFilter: 'open' }),
    metricEmoji('Poupança e contas', totals.accountTotal, '', '🐖', 'savings', true, { view: 'finances', target: 'accountList' }),
    metricEmoji('Saldo do mês', totals.monthBalance, '', '💰', totals.monthBalance >= 0 ? 'balance' : 'expense', true, { view: 'finances', target: 'financeSummary' }),
    metricEmoji('Lista da feira', neededItems.length, '', '🛒', 'market', false, { view: 'market', target: 'shoppingList' })
  ].join('');

  $('#upcomingList').innerHTML = dueSoon.length
    ? dueSoon.map(item => {
        const tone = expenseVisualState(item) === 'overdue' ? 'danger' : 'warning';
        return stackRow(item.title, `${statusLabel('expense', item.status)} - dia ${item.dueDay || '-'}`, item.amount == null ? 'A definir' : formatMoney(item.amount), 'calendar-days', tone);
      }).join('')
    : emptyState('Sem vencimentos abertos neste mês.');

  $('#taskPreview').innerHTML = pendingTasks.length
    ? pendingTasks.map(item => {
        const tone = taskVisualState(item) === 'overdue' ? 'danger' : 'warning';
        return stackRow(item.title, `Prazo ${dateOrDash(item.dueDate)}`, item.owner || 'Todos', 'calendar-days', tone);
      }).join('')
    : emptyState('Nenhuma pendência aberta.');
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

function renderTasks() {
  const ownerOptions = financeOwnerOptions();
  const ownerSelect = $('#taskOwnerFilter');
  ownerSelect.innerHTML = [['all', 'Todos']].concat(ownerOptions.filter(([value]) => value !== 'Todos'))
    .map(([value, label]) => `<option value="${escapeAttr(value)}">${escapeHTML(label)}</option>`)
    .join('');
  if (![...ownerSelect.options].some(option => option.value === state.taskOwner)) state.taskOwner = 'all';
  ownerSelect.value = state.taskOwner;
  $('#taskStatusFilter').value = state.taskFilter;

  const items = visible(db.tasks)
    .filter(item => state.taskFilter === 'all' || (state.taskFilter === 'completed' ? item.status === 'completed' : item.status !== 'completed'))
    .filter(item => state.taskOwner === 'all' || normalizeText(item.owner) === normalizeText(state.taskOwner))
    .sort((a, b) => {
      const completed = Number(a.status === 'completed') - Number(b.status === 'completed');
      return completed || String(a.dueDate || '9999-12-31').localeCompare(String(b.dueDate || '9999-12-31')) || Number(priorityRank(b.priority)) - Number(priorityRank(a.priority));
    });

  $('#taskList').innerHTML = items.length
    ? items.map(taskRow).join('')
    : emptyState(state.taskFilter === 'completed' ? 'Nenhuma pendência concluída.' : 'Nada pendente por aqui.');
}

function taskRow(item) {
  const visualState = taskVisualState(item);
  const priority = taskPriorityLabel(item.priority);
  const subtitle = `Prazo ${dateOrDash(item.dueDate)} · ${item.owner || 'Todos'}`;
  const statusText = item.status === 'completed'
    ? 'Concluída'
    : item.status === 'in_progress'
      ? 'Em execução'
      : visualState === 'overdue' ? 'Atrasada' : 'Pendente';
  return `
    <div class="task-row task-${escapeAttr(visualState)}">
      <button class="task-marker" type="button" data-task-actions data-id="${escapeAttr(item.id)}" title="Ações da pendência" aria-label="Abrir ações de ${escapeAttr(item.title)}">📌</button>
      <div class="data-main">
        <strong>${escapeHTML(item.title)}</strong>
        <small>${escapeHTML(subtitle)}</small>
        <small class="task-priority">Prioridade - ${escapeHTML(priority)}</small>
        ${item.notes ? `<small class="task-note">${escapeHTML(item.notes)}</small>` : ''}
      </div>
      <span class="badge ${escapeAttr(visualState)}">${escapeHTML(statusText)}</span>
    </div>
  `;
}

function taskVisualState(item) {
  if (item.status === 'completed') return 'completed';
  if (item.status === 'in_progress') return 'in-progress';
  if (item.dueDate && item.dueDate < dateStamp()) return 'overdue';
  return 'pending';
}

function priorityRank(priority) {
  return ({ low: 0, normal: 1, high: 2 })[priority] ?? 1;
}

function taskPriorityLabel(priority) {
  return ({ low: 'Baixa', normal: 'Normal', high: 'Alta' })[priority] || 'Normal';
}

function renderMarket() {
  renderQuickOptions();
  renderShoppingList();
  $('#marketStatusFilter').value = state.marketFilter;
  $('#marketCategoryFilter').value = state.marketCategory;
  $('#clearBoughtBtn').disabled = boughtItems().length === 0;
}

function renderQuickOptions() {
  const categories = marketCategories();
  $('#categoryOptions').innerHTML = categories
    .map(category => `<option value="${escapeAttr(category)}" label="${escapeAttr(`${categoryEmoji(category)} ${category}`)}"></option>`)
    .join('');
  $('#marketCategoryFilter').innerHTML = [['all', 'Todas']].concat(categories.map(category => [category, `${categoryEmoji(category)} ${category}`]))
    .map(([value, label]) => `<option value="${escapeAttr(value)}">${escapeHTML(label)}</option>`)
    .join('');
  $('#marketCategoryFilter').value = state.marketCategory;
  $('#siteOptions').innerHTML = (db.pantry.sites || [])
    .map(site => `<option value="${escapeAttr(site)}"></option>`)
    .join('');
}

function renderShoppingList() {
  const query = normalizeText(state.productSearch);
  const products = visible(db.pantry.products)
    .filter(product => !query || normalizeText([product.name, product.category, product.goodBrands, product.badBrands].join(' ')).includes(query))
    .filter(product => state.marketCategory === 'all' || product.category === state.marketCategory)
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

  if (Date.now() < state.marketReorderUntil && state.marketFrozenOrder.length) {
    const frozenPosition = new Map(state.marketFrozenOrder.map((id, index) => [id, index]));
    const naturalPosition = new Map(entries.map((entry, index) => [entry.product.id, index]));
    entries.sort((a, b) => {
      const positionA = frozenPosition.has(a.product.id) ? frozenPosition.get(a.product.id) : Number.MAX_SAFE_INTEGER;
      const positionB = frozenPosition.has(b.product.id) ? frozenPosition.get(b.product.id) : Number.MAX_SAFE_INTEGER;
      return positionA - positionB || naturalPosition.get(a.product.id) - naturalPosition.get(b.product.id);
    });
  }

  $('#shoppingList').innerHTML = entries.length
    ? entries.map(shoppingRow).join('')
    : emptyState(state.productSearch ? 'Nenhum produto encontrado.' : 'Nenhum item neste filtro.');
}

function renderSettings() {
  $('#versionPill').textContent = `v${APP_VERSION}`;
  renderSyncUsers();
  renderAudit();
}

function renderSyncUsers() {
  const list = $('#syncUsersList');
  const addButton = $('#addSyncUserBtn');
  const identity = $('#syncIdentityText');
  const users = syncState.users || [];
  const isOwner = syncState.user?.role === 'owner';
  identity.textContent = syncState.user ? `Conectado como ${syncState.user.name || syncState.user.login}` : 'Dados compartilhados';
  addButton.disabled = !isOwner;
  addButton.title = isOwner ? 'Cadastrar usuário' : 'Entre como administrador para cadastrar';
  list.innerHTML = users.length
    ? users.map(user => `
        <div class="user-row">
          <span class="audit-avatar">${escapeHTML(initials(user.name || user.login))}</span>
          <div>
            <strong>${escapeHTML(user.name || user.login)}</strong>
            <small>@${escapeHTML(user.login)}${user.role === 'owner' ? ' · administrador' : ''}</small>
          </div>
          <div class="user-row-actions">
            ${syncState.user?.login === user.login ? '<span class="status-pill good">Você</span>' : ''}
            ${isOwner ? `<button class="icon-btn" type="button" data-edit-sync-user data-login="${escapeAttr(user.login)}" title="Editar usuário" aria-label="Editar ${escapeAttr(user.name || user.login)}">${iconSvg('edit-3')}</button>` : ''}
          </div>
        </div>
      `).join('')
    : emptyState(syncState.user ? 'Atualize a lista de usuários.' : 'Entre na sincronização para ver os usuários.');
}

function renderSyncStatus() {
  const pill = $('#syncStatusPill');
  const detail = $('#syncDetailText');
  const configured = syncEnabled() && syncState.meta.initialized;
  $('#syncSetupForm').hidden = configured;
  $('#syncLoginCard').hidden = Boolean(syncState.user) || !configured;
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

  if (syncState.meta.syncError) {
    pill.textContent = 'Tentando novamente';
    pill.className = 'status-pill';
    detail.textContent = 'Os dados locais estão preservados.';
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
      ${helper ? `<small>${escapeHTML(helper)}</small>` : ''}
    </article>
  `;
}

function metricEmoji(label, value, helper, emoji, tone = '', currency = true, navigation = {}) {
  const display = currency ? formatMoney(value) : String(value);
  const navigationAttrs = navigation.view
    ? `data-view-jump="${escapeAttr(navigation.view)}" data-view-target="${escapeAttr(navigation.target || '')}"${navigation.expenseFilter ? ` data-expense-filter="${escapeAttr(navigation.expenseFilter)}"` : ''}`
    : '';
  return `
    <button class="metric metric-${escapeAttr(tone)}" type="button" ${navigationAttrs}>
      <span class="metric-emoji" aria-hidden="true">${emoji}</span>
      <div class="metric-copy">
        <small>${escapeHTML(label)}</small>
        <strong>${escapeHTML(display)}</strong>
      </div>
      ${helper ? `<small>${escapeHTML(helper)}</small>` : ''}
    </button>
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
    <div class="stack-row ${tone ? `stack-${escapeAttr(tone)}` : ''}">
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
  const expenseState = type === 'expense' ? expenseVisualState(item) : '';
  const badge = type === 'expense'
    ? `<span class="badge ${expenseState}">${expenseState === 'paid' ? 'Pago' : expenseState === 'overdue' ? 'Vencida' : 'Pendente'}</span>`
    : statusBadge(type, item.status);
  const amount = type === 'account' ? item.balance : item.amount;
  const amountDisplay = amount == null ? 'Definir valor' : formatMoney(amount);
  const subtitle = config.subtitle;
  const actionTone = type === 'expense' ? expenseState : config.tone;
  const leadingIcon = `<button class="row-icon finance-action-trigger ${escapeAttr(actionTone)}" type="button" data-record-actions data-record-type="${escapeAttr(type)}" data-id="${escapeAttr(item.id)}" title="Ações" aria-label="Abrir ações de ${escapeAttr(config.title)}">${iconSvg(config.icon)}</button>`;

  return `
    <div class="data-row finance-row ${escapeAttr(type)}-row ${type === 'expense' ? `expense-${expenseState}` : ''}">
      ${leadingIcon}
      <div class="data-main">
        <strong>${escapeHTML(config.title)}</strong>
        <small>${escapeHTML(subtitle)}</small>
      </div>
      <div class="row-amount">
        <span class="${amount == null ? 'amount-empty' : ''}">${escapeHTML(amountDisplay)}</span>
        ${badge}
      </div>
    </div>
  `;
}

function rowConfig(type, item) {
  if (type === 'expense') {
    return {
      title: item.title,
      subtitle: `Dia ${String(item.dueDay || 1).padStart(2, '0')} - ${item.paymentMethod || 'Não informado'}`,
      icon: 'receipt',
      tone: item.status === 'paid' ? '' : item.status === 'debt' ? 'danger' : 'warning',
      cycleTitle: item.status === 'paid' ? 'Marcar aberto' : 'Marcar pago',
      cycleIcon: item.status === 'paid' ? 'undo' : 'check'
    };
  }
  if (type === 'income') {
    return {
      title: item.title,
      subtitle: `${incomeCategoryLabel(item.category || 'Receita')} - Dia ${String(item.day || 1).padStart(2, '0')}`,
      icon: 'hand-coins',
      tone: item.status === 'received' ? '' : 'info',
      cycleTitle: item.status === 'received' ? 'Marcar esperado' : 'Marcar recebido',
      cycleIcon: item.status === 'received' ? 'undo' : 'check'
    };
  }
  if (type === 'account') {
    return {
      title: item.name,
      subtitle: `${item.type || 'Conta'} (em ${shortDate(item.updatedAt || item.createdAt)})`,
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

function expenseVisualState(item) {
  if (item.status === 'paid') return 'paid';
  const [year, month] = String(item.month || currentMonth()).split('-').map(Number);
  const lastDay = new Date(year, month, 0).getDate();
  const dueDate = new Date(year, month - 1, Math.min(Number(item.dueDay || 1), lastDay), 23, 59, 59, 999);
  return dueDate < new Date() ? 'overdue' : 'pending';
}

function shoppingRow(entry) {
  const { product, item } = entry;
  const status = item?.status || 'stocked';
  const ordered = status === 'ordered';
  const bought = status === 'bought';
  const completionLabel = ordered || (bought && (item?.completionType === 'received' || item?.site)) ? 'Recebido' : 'Comprado';
  const draftQty = Number(state.marketDraftQty[product.id] ?? product.defaultQty ?? 1);
  const qty = item?.qty || draftQty;
  const unit = item?.unit || state.marketDraftUnit[product.id] || product.unit || 'un';
  const controls = item
    ? `<div class="shopping-request-controls">
        <button class="request-quantity" type="button" data-edit-quantity data-id="${escapeAttr(item.id)}" title="Editar quantidade e unidade"><strong>${escapeHTML(formatQuantity(qty))}</strong><small>${escapeHTML(unit)}</small></button>
        <button class="market-action order-action ${ordered ? 'is-selected' : ''}" type="button" data-list-status="ordered" data-id="${escapeAttr(item.id)}" title="${ordered ? 'Voltar para pendente' : 'Registrar pedido'}">${iconSvg(ordered ? 'undo' : 'send')}<span>Pedido</span></button>
        <button class="market-action bought-action ${bought ? 'is-selected' : ''}" type="button" data-list-status="bought" data-id="${escapeAttr(item.id)}" title="${bought ? 'Voltar para pendente' : `Marcar como ${completionLabel.toLowerCase()}`}">${iconSvg(bought ? 'undo' : 'check')}<span>${completionLabel}</span></button>
      </div>`
    : `<div class="quantity-stepper">
        <button type="button" data-draft-quantity="-1" data-id="${escapeAttr(product.id)}" ${draftQty <= 1 ? 'disabled' : ''} title="Diminuir quantidade" aria-label="Diminuir quantidade de ${escapeAttr(product.name)}">${iconSvg('minus')}</button>
        <button class="quantity-value" type="button" data-edit-draft-quantity data-id="${escapeAttr(product.id)}" title="Editar quantidade e unidade"><strong>${escapeHTML(formatQuantity(qty))}</strong><small>${escapeHTML(unit)}</small></button>
        <button type="button" data-draft-quantity="1" data-id="${escapeAttr(product.id)}" title="Aumentar quantidade" aria-label="Aumentar quantidade de ${escapeAttr(product.name)}">${iconSvg('plus')}</button>
        <button class="quantity-tick" type="button" data-mark-product-needed="${escapeAttr(product.id)}" title="Quero comprar este item" aria-label="Marcar ${escapeAttr(product.name)} como pendente">${iconSvg('check')}</button>
      </div>`;
  return `
    <article class="shopping-item status-${escapeAttr(status)} ${item ? 'has-request' : 'has-draft'}" data-product-id="${escapeAttr(product.id)}">
      <button class="product-emoji" type="button" data-product-actions data-id="${escapeAttr(product.id)}" data-list-id="${escapeAttr(item?.id || '')}" title="Ações de ${escapeAttr(product.name)}" aria-label="Abrir ações de ${escapeAttr(product.name)}">${productEmoji(product)}</button>
      <div class="data-main">
        <strong>${escapeHTML(product.name)}</strong>
        <small>${escapeHTML(`${product.category || 'Mercado'}${item?.site ? ` · ${item.site}` : ''}`)}</small>
      </div>
      ${controls}
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

function productEmoji(product) {
  const configuredEmoji = categoryEmoji(product.category, '');
  if (configuredEmoji) return configuredEmoji;
  const text = normalizeText(`${product.category} ${product.name}`);
  if (/limpeza|sabao|detergente/.test(text)) return '🧼';
  if (/higiene|papel|shampoo/.test(text)) return '🧴';
  if (/bebida|leite|suco|agua/.test(text)) return '🥤';
  if (/feira|fruta|banana|tomate|verdura/.test(text)) return '🥬';
  if (/farmacia|remedio/.test(text)) return '💊';
  if (/pet|racao/.test(text)) return '🐾';
  return '🧺';
}

function formatQuantity(value) {
  return Number(value || 0).toLocaleString('pt-BR', { maximumFractionDigits: 2 });
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

function calculateTotals(month = state.month) {
  const expenses = visible(db.finances.expenses).filter(item => item.month === month);
  const incomes = visible(db.finances.incomes).filter(item => item.month === month);
  const accounts = visible(db.finances.accounts);
  const receivables = visible(db.finances.receivables);
  const debts = visible(db.finances.debts);

  const expenseTotal = sum(expenses, 'amount');
  const expensePaid = sum(expenses.filter(item => item.status === 'paid' && !isCardExpense(item)), 'amount');
  const expenseOpen = sum(expenses.filter(item => item.status !== 'paid' && !isCardExpense(item)), 'amount');
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

function isCardExpense(item) {
  return normalizeText(item?.paymentMethod) === 'cartao';
}

function openRecordDialog(type, id = '') {
  const config = recordConfig(type);
  const item = id ? getCollection(type).find(entry => entry.id === id) : null;
  $('#recordDialogTitle').textContent = item ? `Editar ${config.singular}` : `${config.newLabel} ${config.singular}`;
  $('#recordType').value = type;
  $('#recordId').value = id;
  $('#recordName').value = item?.title || item?.name || item?.person || '';
  const recordAmount = type === 'account' ? item?.balance : item?.amount;
  $('#recordAmount').value = recordAmount == null ? '' : formatNumberInput(recordAmount);
  $('#recordDay').value = item?.dueDay || item?.day || item?.dueDate || '';
  $('#recordDay').type = config.dateField ? 'date' : 'text';
  $('#recordDayLabel').textContent = config.dayLabel;
  $('#recordDayWrap').hidden = !config.showDay;
  $('#recordStatus').closest('label').hidden = true;
  $('#recordOwner').closest('label').hidden = !config.showOwner;
  $('#recordCategory').closest('label').hidden = !config.showCategory;
  $('#recordAccount').closest('label').hidden = true;
  $('#recordPaymentWrap').hidden = type !== 'expense';
  $('#recordPaymentMethod').value = item?.paymentMethod || 'Pix';
  const supportsRecurring = type === 'expense' || type === 'income';
  const recurrence = item?.recurrenceId ? db.finances.recurring.find(entry => entry.id === item.recurrenceId) : null;
  $('#recordRecurringWrap').hidden = !supportsRecurring;
  $('#recordRecurring').checked = supportsRecurring && Boolean(recurrence ? recurrence.active : item?.recurring);
  $('#recordKeepValue').checked = recurrence ? recurrence.keepValue !== false : true;
  $('#recordKeepValueWrap').hidden = !$('#recordRecurring').checked;
  $('#recordNotes').value = item?.notes || '';
  $('#deleteRecordBtn').hidden = !item;

  fillSelect($('#recordStatus'), config.statuses, item?.status || config.defaultStatus);
  const selectedOwner = item?.owner === 'Casa' ? 'Todos' : item?.owner || 'Todos';
  fillSelect($('#recordOwner'), financeOwnerOptions(item?.owner), selectedOwner);
  const storedCategory = item?.category || item?.type || config.categories[0];
  const selectedCategory = type === 'income' && normalizeText(storedCategory) === 'salario' ? 'Salário' : storedCategory;
  fillSelect($('#recordCategory'), config.categories.map(category => [category, category]), selectedCategory);
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
  const rawAmount = $('#recordAmount').value.trim();
  const amount = parseMoney(rawAmount);
  if (!rawAmount) return toast('Informe o valor.', 'error');
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
    item.status = existing?.status || config.defaultStatus;
    item.owner = $('#recordOwner').value;
    item.category = $('#recordCategory').value;
    if (!item.person) return toast('Informe a pessoa ou origem.', 'error');
  } else {
    item.title = $('#recordName').value.trim();
    item.amount = amount;
    item.month = state.month;
    item.status = existing?.status || config.defaultStatus;
    item.owner = $('#recordOwner').value;
    item.category = $('#recordCategory').value;
    item.accountId = existing?.accountId || '';
    if (type === 'expense') item.paymentMethod = $('#recordPaymentMethod').value;
    if (type === 'expense') item.dueDay = clampDay($('#recordDay').value);
    if (type === 'income') item.day = clampDay($('#recordDay').value);
    if (!item.title) return toast('Informe o nome.', 'error');

    const wantsRecurring = $('#recordRecurring').checked;
    if (wantsRecurring) {
      const recurrenceId = item.recurrenceId || uid('recurring');
      item.recurrenceId = recurrenceId;
      item.recurring = true;
      upsertRecurrence(recurrenceId, type, item, $('#recordKeepValue').checked);
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

function openTaskDialog(id = '') {
  const item = id ? db.tasks.find(entry => entry.id === id && !entry.deletedAt) : null;
  const ownerOptions = financeOwnerOptions(item?.owner || '');
  $('#taskDialogTitle').textContent = item ? 'Editar pendência' : 'Nova pendência';
  $('#taskId').value = item?.id || '';
  $('#taskTitleInput').value = item?.title || '';
  $('#taskDueDateInput').value = item?.dueDate || dateStamp();
  $('#taskOwnerInput').innerHTML = ownerOptions
    .map(([value, label]) => `<option value="${escapeAttr(value)}">${escapeHTML(label)}</option>`)
    .join('');
  $('#taskOwnerInput').value = item?.owner || syncState.user?.name || 'Todos';
  if (!$('#taskOwnerInput').value) $('#taskOwnerInput').value = 'Todos';
  $('#taskPriorityInput').value = item?.priority || 'normal';
  $('#taskNotesInput').value = item?.notes || '';
  $('#deleteTaskBtn').hidden = !item;
  $('#taskDialog').showModal();
  $('#taskTitleInput').focus();
}

function saveTaskFromForm(event) {
  event.preventDefault();
  const id = $('#taskId').value || uid('task');
  const now = Date.now();
  const existing = db.tasks.find(entry => entry.id === id);
  const item = existing || { id, createdAt: now, status: 'pending', completedAt: 0, deletedAt: 0 };
  item.title = $('#taskTitleInput').value.trim();
  item.dueDate = $('#taskDueDateInput').value;
  item.owner = $('#taskOwnerInput').value || 'Todos';
  item.priority = $('#taskPriorityInput').value || 'normal';
  item.notes = $('#taskNotesInput').value.trim();
  item.updatedAt = now;
  if (!existing) db.tasks.push(item);
  addAudit(existing ? 'alterou' : 'cadastrou', 'a pendência', item.title);
  saveData();
  closeDialog('taskDialog');
  toast('Pendência salva.', 'good');
}

function deleteCurrentTask() {
  const id = $('#taskId').value;
  const item = db.tasks.find(entry => entry.id === id && !entry.deletedAt);
  if (!item || !confirm(`Excluir a pendência "${item.title}"?`)) return;
  markDeleted(db.tasks, id);
  addAudit('excluiu', 'a pendência', item.title);
  saveData();
  closeDialog('taskDialog');
  toast('Pendência excluída.', 'good');
}

function toggleTaskStatus(id) {
  const item = db.tasks.find(entry => entry.id === id && !entry.deletedAt);
  if (!item) return;
  const completed = item.status === 'completed';
  item.status = completed ? 'pending' : 'completed';
  item.completedAt = completed ? 0 : Date.now();
  item.updatedAt = Date.now();
  addAudit(completed ? 'reabriu' : 'concluiu', 'a pendência', item.title);
  saveData();
  toast(completed ? 'Pendência reaberta.' : 'Pendência concluída.', 'good');
}

function toggleTaskProgress(id) {
  const item = db.tasks.find(entry => entry.id === id && !entry.deletedAt);
  if (!item || item.status === 'completed') return;
  const wasInProgress = item.status === 'in_progress';
  item.status = wasInProgress ? 'pending' : 'in_progress';
  item.completedAt = 0;
  item.updatedAt = Date.now();
  addAudit(wasInProgress ? 'voltou para pendente' : 'iniciou', 'a pendência', item.title);
  saveData();
  toast(wasInProgress ? 'Pendência voltou para pendente.' : 'Pendência em execução.', 'good');
}

function openTaskActions(id, anchor) {
  const item = db.tasks.find(entry => entry.id === id && !entry.deletedAt);
  if (!item) return;
  const completed = item.status === 'completed';
  $('#quickActionsType').value = 'task';
  $('#quickActionsId').value = item.id;
  $('#quickActionsItemId').value = '';
  $('#quickActionsEyebrow').textContent = 'Pendência';
  $('#quickActionsTitle').textContent = item.title;
  $('#quickTaskProgressBtn').hidden = completed;
  $('#quickStateBtn').hidden = false;
  $('#quickHeaderEditBtn').hidden = true;
  $('#quickEditBtn').hidden = false;
  $('#quickEditOrderBtn').hidden = true;
  $('#quickDeleteOrderBtn').hidden = true;
  $('#quickTaskProgressBtn').innerHTML = iconSvg(item.status === 'in_progress' ? 'undo' : 'refresh-cw') + (item.status === 'in_progress' ? 'Voltar para pendente' : 'Iniciar execução');
  $('#quickStateBtn').innerHTML = iconSvg(completed ? 'undo' : 'check') + (completed ? 'Reabrir' : 'Concluir');
  $('#quickEditBtn').innerHTML = iconSvg('edit-3') + 'Editar';
  showQuickActionsMenu(anchor);
}

function openProductDialog(id = '') {
  const product = id ? db.pantry.products.find(item => item.id === id) : null;
  $('#productDialogTitle').textContent = product ? 'Editar produto' : 'Novo produto';
  $('#productId').value = product?.id || '';
  $('#productName').value = product?.name || '';
  $('#productCategory').value = product?.category || 'Mercado';
  $('#productDefaultQty').value = product?.defaultQty ? formatNumberInput(product.defaultQty) : '';
  $('#productUnit').value = product?.units || product?.unit || 'un';
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
  const units = parseRegistryValues($('#productUnit').value);
  product.units = units.join('; ');
  product.unit = units[0] || 'un';
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

function markProductNeeded(productId) {
  const product = db.pantry.products.find(item => item.id === productId && !item.deletedAt);
  if (!product) return toast('Produto não encontrado.', 'error');
  freezeMarketOrder();
  const now = Date.now();
  let item = visible(db.pantry.list)
    .filter(entry => entry.productId === productId)
    .sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0))[0];
  if (item) {
    item.status = 'needed';
    item.qty = Number(item.qty || product.defaultQty || 1);
    item.unit = item.unit || product.unit || 'un';
    item.site = '';
    item.completionType = '';
    item.boughtAt = 0;
    item.updatedAt = now;
  } else {
    const requestedQty = Number(state.marketDraftQty[productId] ?? product.defaultQty ?? 1);
    const requestedUnit = state.marketDraftUnit[productId] || product.unit || 'un';
    item = {
      id: uid('list'),
      productId,
      name: product.name,
      qty: requestedQty > 0 ? requestedQty : 1,
      unit: requestedUnit,
      status: 'needed',
      site: '',
      note: product.notes || '',
      createdAt: now,
      updatedAt: now,
      deletedAt: 0
    };
    db.pantry.list.push(item);
  }
  delete state.marketDraftQty[productId];
  delete state.marketDraftUnit[productId];
  addAudit('marcou como pendente', 'o item da feira', product.name);
  saveData();
  toast('Item adicionado à lista.', 'good');
}

function changeDraftQuantity(productId, delta) {
  const product = db.pantry.products.find(entry => entry.id === productId && !entry.deletedAt);
  if (!product || !Number.isFinite(delta) || delta === 0) return;
  const current = Number(state.marketDraftQty[productId] ?? product.defaultQty ?? 1);
  state.marketDraftQty[productId] = Math.max(1, current + delta);
  renderShoppingList();
}

function changeShoppingQuantity(id, delta) {
  const item = db.pantry.list.find(entry => entry.id === id && !entry.deletedAt);
  if (!item || !Number.isFinite(delta) || delta === 0) return;
  const product = db.pantry.products.find(entry => entry.id === item.productId);

  if (item.status === 'bought' && delta > 0 && product) {
    addProductToShoppingList(product.id, product.defaultQty || 1, product.unit || 'un');
    return;
  }

  const nextQty = Math.max(0, Number(item.qty || 0) + delta);
  if (nextQty <= 0) {
    visible(db.pantry.list).filter(entry => entry.productId === item.productId).forEach(entry => markDeleted(db.pantry.list, entry.id));
    addAudit('retirou', 'o item da feira', item.name);
    saveData();
    return;
  }
  item.qty = nextQty;
  item.updatedAt = Date.now();
  addAudit('alterou', 'a quantidade do item da feira', `${item.name} para ${formatQuantity(nextQty)} ${item.unit || 'un'}`);
  saveData();
}

function openQuantityDialog(id) {
  const item = db.pantry.list.find(entry => entry.id === id && !entry.deletedAt);
  if (!item) return;
  $('#quantityItemId').value = item.id;
  $('#quantityProductId').value = '';
  $('#quantityDialogTitle').textContent = item.name;
  $('#quantityValueInput').value = formatQuantity(item.qty || 1);
  $('#quantityUnitInput').value = item.unit || 'un';
  const product = db.pantry.products.find(entry => entry.id === item.productId);
  fillQuantityUnitOptions(product);
  $('#quantityDialog').showModal();
  $('#quantityValueInput').focus();
}

function openDraftQuantityDialog(productId) {
  const product = db.pantry.products.find(entry => entry.id === productId && !entry.deletedAt);
  if (!product) return;
  $('#quantityItemId').value = '';
  $('#quantityProductId').value = product.id;
  $('#quantityDialogTitle').textContent = product.name;
  $('#quantityValueInput').value = formatQuantity(state.marketDraftQty[product.id] ?? product.defaultQty ?? 1);
  $('#quantityUnitInput').value = state.marketDraftUnit[product.id] || product.unit || 'un';
  fillQuantityUnitOptions(product);
  $('#quantityDialog').showModal();
  $('#quantityValueInput').focus();
}

function fillQuantityUnitOptions(product) {
  const units = Array.from(new Set(['un', 'kg', 'g', 'L', 'ml', 'pct', 'caixa', 'bandeja'].concat(parseRegistryValues(product?.units || product?.unit || ''))));
  $('#unitOptions').innerHTML = units.map(unit => `<option value="${escapeAttr(unit)}"></option>`).join('');
}

function saveQuantityFromForm(event) {
  event.preventDefault();
  const itemId = $('#quantityItemId').value;
  const productId = $('#quantityProductId').value;
  const qty = parseDecimal($('#quantityValueInput').value);
  const unit = $('#quantityUnitInput').value.trim();
  if (!(qty > 0) || !unit) return toast('Informe quantidade e unidade.', 'error');

  const item = db.pantry.list.find(entry => entry.id === itemId && !entry.deletedAt);
  if (item) {
    item.qty = qty;
    item.unit = unit;
    item.updatedAt = Date.now();
    addAudit('alterou', 'a quantidade do item da feira', `${item.name} para ${formatQuantity(qty)} ${unit}`);
    saveData();
  } else {
    const product = db.pantry.products.find(entry => entry.id === productId && !entry.deletedAt);
    if (!product) return;
    state.marketDraftQty[product.id] = qty;
    state.marketDraftUnit[product.id] = unit;
    renderShoppingList();
  }
  closeDialog('quantityDialog');
  toast('Quantidade atualizada.', 'good');
}

function setShoppingStatus(id, status) {
  const item = db.pantry.list.find(entry => entry.id === id && !entry.deletedAt);
  if (!item) return;
  if (status === 'ordered') {
    if (item.status === 'ordered') {
      freezeMarketOrder();
      item.status = 'needed';
      item.site = '';
      item.completionType = '';
      item.boughtAt = 0;
      item.updatedAt = Date.now();
      addAudit('voltou para pendente', 'item da feira', item.name);
      saveData();
      toast('Item voltou para pendente.', 'good');
      return;
    }
    openOrderDialog(id);
    return;
  }

  if (status === 'bought' && item.status === 'bought') {
    freezeMarketOrder();
    item.status = 'needed';
    item.site = '';
    item.completionType = '';
    item.boughtAt = 0;
    item.updatedAt = Date.now();
    addAudit('voltou para pendente', 'item da feira', item.name);
    saveData();
    toast('Item voltou para pendente.', 'good');
    return;
  }

  const previousStatus = item.status;
  freezeMarketOrder();
  item.status = status;
  item.updatedAt = Date.now();
  if (status === 'bought') {
    item.boughtAt = item.updatedAt;
    item.completionType = previousStatus === 'ordered' ? 'received' : 'bought';
  }
  addAudit(item.completionType === 'received' ? 'marcou como recebido' : 'marcou como comprado', 'item da feira', item.name);
  saveData();
}

function openOrderDialog(id) {
  const item = db.pantry.list.find(entry => entry.id === id);
  if (!item) return;
  const product = db.pantry.products.find(entry => entry.id === item.productId);
  const productSites = String(product?.sites || '').split(/[;,]/).map(site => site.trim()).filter(Boolean);
  const sites = dedupeTextValues([...(db.pantry.sites || []), ...productSites, item.site]);
  const siteSelect = $('#orderSiteInput');
  $('#orderItemId').value = id;
  siteSelect.innerHTML = [
    '<option value="">Não informar</option>',
    ...sites.map(site => `<option value="${escapeAttr(site)}">${escapeHTML(site)}</option>`)
  ].join('');
  siteSelect.value = item.site || '';
  $('#orderDialog').showModal();
  siteSelect.focus();
}

function saveOrderFromForm(event) {
  event.preventDefault();
  const item = db.pantry.list.find(entry => entry.id === $('#orderItemId').value);
  if (!item) return;
  freezeMarketOrder();
  item.site = $('#orderSiteInput').value.trim();
  item.status = 'ordered';
  item.completionType = '';
  item.boughtAt = 0;
  item.updatedAt = Date.now();
  addAudit('registrou pedido', 'item da feira', `${item.name}${item.site ? ` em ${item.site}` : ''}`);
  saveData();
  closeDialog('orderDialog');
  toast('Pedido registrado.', 'good');
}

function freezeMarketOrder() {
  const currentOrder = $$('#shoppingList .shopping-item[data-product-id]').map(row => row.dataset.productId).filter(Boolean);
  if (currentOrder.length) state.marketFrozenOrder = currentOrder;
  state.marketReorderUntil = Date.now() + MARKET_REORDER_DELAY_MS;
  clearTimeout(state.marketReorderTimer);
  state.marketReorderTimer = setTimeout(() => {
    state.marketReorderUntil = 0;
    state.marketFrozenOrder = [];
    renderShoppingList();
  }, MARKET_REORDER_DELAY_MS);
}

function openRecordActions(type, id, anchor) {
  const item = getCollection(type)?.find(entry => entry.id === id && !entry.deletedAt);
  if (!item) return;
  const config = rowConfig(type, item);
  $('#quickActionsType').value = type;
  $('#quickActionsId').value = item.id;
  $('#quickActionsItemId').value = '';
  $('#quickActionsEyebrow').textContent = ({ expense: 'Despesa', income: 'Receita', account: 'Conta ou reserva', receivable: 'A receber', debt: 'Dívida' })[type] || 'Registro';
  $('#quickActionsTitle').textContent = config.title;
  $('#quickTaskProgressBtn').hidden = true;
  $('#quickStateBtn').hidden = type === 'account';
  $('#quickHeaderEditBtn').hidden = true;
  $('#quickEditBtn').hidden = false;
  $('#quickEditOrderBtn').hidden = true;
  $('#quickDeleteOrderBtn').hidden = true;
  if (type !== 'account') $('#quickStateBtn').innerHTML = iconSvg(config.cycleIcon) + escapeHTML(config.cycleTitle);
  $('#quickEditBtn').innerHTML = iconSvg('edit-3') + 'Editar';
  showQuickActionsMenu(anchor);
}

function openProductActions(id, listId, anchor) {
  const product = db.pantry.products.find(entry => entry.id === id && !entry.deletedAt);
  if (!product) return;
  $('#quickActionsType').value = 'product';
  $('#quickActionsId').value = product.id;
  $('#quickActionsItemId').value = listId || '';
  $('#quickActionsEyebrow').textContent = 'Produto';
  $('#quickActionsTitle').textContent = product.name;
  $('#quickTaskProgressBtn').hidden = true;
  $('#quickStateBtn').hidden = true;
  $('#quickEditBtn').hidden = true;
  $('#quickHeaderEditBtn').hidden = false;
  $('#quickHeaderEditBtn').innerHTML = iconSvg('edit-3') + 'Editar produto';
  $('#quickEditOrderBtn').hidden = !listId;
  $('#quickDeleteOrderBtn').hidden = !listId;
  $('#quickEditOrderBtn').innerHTML = iconSvg('edit-3') + 'Editar pedido';
  $('#quickDeleteOrderBtn').innerHTML = iconSvg('trash-2') + 'Excluir pedido';
  showQuickActionsMenu(anchor);
}

function showQuickActionsMenu(anchor) {
  const menu = $('#quickActionsMenu');
  menu.hidden = false;
  const rect = anchor.getBoundingClientRect();
  const menuWidth = Math.min(300, window.innerWidth - 16);
  const left = Math.min(Math.max(8, rect.left), window.innerWidth - menuWidth - 8);
  const preferredTop = rect.bottom + 6;
  menu.style.left = `${left}px`;
  menu.style.top = `${Math.min(preferredTop, window.innerHeight - menu.offsetHeight - 8)}px`;
}

function closeQuickActionsMenu() {
  $('#quickActionsMenu').hidden = true;
}

function runQuickStateAction() {
  const type = $('#quickActionsType').value;
  const id = $('#quickActionsId').value;
  if (type === 'task') toggleTaskStatus(id);
  else if (['expense', 'income', 'receivable', 'debt'].includes(type)) cycleRecordStatus(type, id);
  else return;
  closeQuickActionsMenu();
}

function runQuickTaskProgressAction() {
  const id = $('#quickActionsId').value;
  if ($('#quickActionsType').value !== 'task') return;
  toggleTaskProgress(id);
  closeQuickActionsMenu();
}

function runQuickEditAction() {
  const type = $('#quickActionsType').value;
  const id = $('#quickActionsId').value;
  closeQuickActionsMenu();
  if (type === 'task') openTaskDialog(id);
  else if (['expense', 'income', 'account', 'receivable', 'debt'].includes(type)) openRecordDialog(type, id);
}

function runQuickProductEditAction() {
  const id = $('#quickActionsId').value;
  closeQuickActionsMenu();
  if (id) openProductDialog(id);
}

function runQuickEditOrderAction() {
  const id = $('#quickActionsItemId').value;
  closeQuickActionsMenu();
  if (id) openQuantityDialog(id);
}

function runQuickDeleteOrderAction() {
  const id = $('#quickActionsItemId').value;
  closeQuickActionsMenu();
  if (id) deleteShoppingOrder(id);
}

function deleteShoppingOrder(id) {
  const item = db.pantry.list.find(entry => entry.id === id && !entry.deletedAt);
  if (!item || !confirm(`Excluir o pedido de ${item.name}?`)) return;
  visible(db.pantry.list)
    .filter(entry => entry.productId === item.productId)
    .forEach(entry => markDeleted(db.pantry.list, entry.id));
  addAudit('excluiu', 'o pedido da feira', item.name);
  saveData();
  toast('Pedido excluído.', 'good');
}

function boughtItems() {
  return visible(db.pantry.list).filter(item => item.status === 'bought');
}

function purgeExpiredBoughtItems(database = db) {
  const now = Date.now();
  const cutoff = now - MARKET_PURGE_AFTER_MS;
  const items = (database.pantry?.list || []).filter(item => {
    const completedAt = Number(item.boughtAt || item.updatedAt || item.createdAt || 0);
    return !item.deletedAt && item.status === 'bought' && completedAt > 0 && completedAt <= cutoff;
  });
  items.forEach(item => {
    item.deletedAt = now;
    item.updatedAt = now;
  });
  return items.length;
}

function cleanupExpiredBoughtItems() {
  const count = purgeExpiredBoughtItems(db);
  if (!count) return 0;
  addAudit('removeu automaticamente', 'itens concluídos da feira', `${count} após 7 dias`);
  saveData();
  return count;
}

function clearBoughtItems() {
  const items = boughtItems();
  if (!items.length) return toast('Nenhum item comprado ou recebido para zerar.', 'good');
  if (!confirm(`Zerar ${items.length} ${items.length === 1 ? 'item comprado ou recebido' : 'itens comprados ou recebidos'}?`)) return;
  items.forEach(item => markDeleted(db.pantry.list, item.id));
  addAudit('zerou', 'itens concluídos da feira', String(items.length));
  saveData();
  toast('Itens comprados e recebidos foram zerados.', 'good');
}

function cycleRecordStatus(type, id) {
  const item = getCollection(type).find(entry => entry.id === id);
  if (!item) return;
  if ((type === 'expense' || type === 'income') && item.amount == null) return toast('Defina o valor antes de concluir este registro.', 'error');
  if (type === 'expense') item.status = item.status === 'paid' ? 'pending' : 'paid';
  if (type === 'income') item.status = item.status === 'received' ? 'expected' : 'received';
  if (type === 'receivable') item.status = item.status === 'received' ? 'open' : 'received';
  if (type === 'debt') item.status = item.status === 'paid' ? 'open' : 'paid';
  item.updatedAt = Date.now();
  addAudit('alterou o status de', recordEntityLabel(type), `${recordDisplayName(type, item)} para ${statusLabel(type, item.status)}`);
  saveData();
}

function upsertRecurrence(id, type, item, keepValue) {
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
    paymentMethod: item.paymentMethod,
    keepValue: keepValue === true,
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
      amount: recurrence.keepValue === false ? null : recurrence.amount,
      month: state.month,
      owner: recurrence.owner,
      category: recurrence.category,
      accountId: recurrence.accountId,
      notes: recurrence.notes,
      paymentMethod: recurrence.paymentMethod,
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
      showStatus: false,
      showOwner: true,
      showCategory: true,
      showAccount: false,
      categories: EXPENSE_CATEGORIES,
      statuses: [['pending', 'A pagar'], ['paid', 'Pago'], ['scheduled', 'Agendado'], ['debt', 'Devendo']],
      defaultStatus: 'pending'
    },
    income: {
      singular: 'receita',
      newLabel: 'Nova',
      showDay: true,
      dayLabel: 'Dia',
      showStatus: false,
      showOwner: true,
      showCategory: true,
      showAccount: false,
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
      showStatus: false,
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
      showStatus: false,
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
  const configured = visible(db.pantry.categoryMeta || [])
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0) || a.name.localeCompare(b.name))
    .map(entry => entry.name);
  const deletedNames = new Set((db.pantry.categoryMeta || []).filter(entry => entry.deletedAt).map(entry => normalizeText(entry.name)));
  const used = visible(db.pantry.products)
    .map(product => String(product.category || '').trim())
    .filter(name => name && !deletedNames.has(normalizeText(name)));
  const names = [];
  [...configured, ...used].forEach(name => {
    if (!names.some(entry => normalizeText(entry) === normalizeText(name))) names.push(name);
  });
  return names;
}

function openRegistryDialog(type) {
  state.registryType = type;
  const categories = type === 'categories';
  $('#registryDialogTitle').textContent = categories ? 'Categorias' : 'Sites e lojas';
  $('#registryInputLabel').textContent = categories ? 'Nova categoria' : 'Novo site ou loja';
  $('#registryInput').placeholder = categories ? 'Frios; Secos; Hortifruti' : 'Amazon; Shopee; Mercado Livre';
  $('#registryInput').value = '';
  $('#registryEmojiWrap').hidden = !categories;
  $('#registryForm').classList.toggle('is-sites', !categories);
  $('#registryEmojiInput').value = '📦';
  renderRegistryList();
  $('#registryDialog').showModal();
  $('#registryInput').focus();
}

function renderRegistryList() {
  if (state.registryType === 'sites') {
    const values = (db.pantry.sites || []).slice().sort((a, b) => a.localeCompare(b));
    $('#registryList').innerHTML = values.length
      ? values.map(value => `
        <div class="registry-row">
          <span>${escapeHTML(value)}</span>
          <button class="icon-btn" type="button" data-delete-registry data-value="${escapeAttr(value)}" title="Excluir" aria-label="Excluir ${escapeAttr(value)}">${iconSvg('trash-2')}</button>
        </div>
      `).join('')
      : emptyState('Nenhum cadastro ainda.');
    return;
  }

  const categories = visible(db.pantry.categoryMeta || [])
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0) || a.name.localeCompare(b.name));
  $('#registryList').innerHTML = categories.length
    ? categories.map((category, index) => `
        <div class="registry-row registry-category-row">
          <input class="category-emoji-input" data-category-emoji="${escapeAttr(category.name)}" value="${escapeAttr(category.emoji || defaultCategoryEmoji(category.name))}" maxlength="8" title="Emoji de ${escapeAttr(category.name)}" aria-label="Emoji de ${escapeAttr(category.name)}" />
          <span>${escapeHTML(category.name)}</span>
          <div class="registry-row-actions">
            <button class="icon-btn order-btn" type="button" data-move-category="${escapeAttr(category.name)}" data-direction="-1" ${index === 0 ? 'disabled' : ''} title="Mover para cima" aria-label="Mover ${escapeAttr(category.name)} para cima">${iconSvg('chevron-up')}</button>
            <button class="icon-btn order-btn" type="button" data-move-category="${escapeAttr(category.name)}" data-direction="1" ${index === categories.length - 1 ? 'disabled' : ''} title="Mover para baixo" aria-label="Mover ${escapeAttr(category.name)} para baixo">${iconSvg('chevron-down')}</button>
            <button class="icon-btn delete-btn" type="button" data-delete-registry data-value="${escapeAttr(category.name)}" title="Excluir" aria-label="Excluir ${escapeAttr(category.name)}">${iconSvg('trash-2')}</button>
          </div>
        </div>
      `).join('')
    : emptyState('Nenhuma categoria cadastrada.');
}

function saveRegistryEntry(event) {
  event.preventDefault();
  const values = parseRegistryValues($('#registryInput').value);
  if (!values.length) return;
  const key = state.registryType === 'sites' ? 'sites' : 'categories';
  if (key === 'sites') {
    db.pantry.sites = Array.from(new Set((db.pantry.sites || []).concat(values)));
  } else {
    const now = Date.now();
    const requestedEmoji = $('#registryEmojiInput').value.trim();
    let nextOrder = visible(db.pantry.categoryMeta || []).reduce((highest, entry) => Math.max(highest, Number(entry.order || 0)), -1) + 1;
    values.forEach(name => {
      const existing = (db.pantry.categoryMeta || []).find(entry => normalizeText(entry.name) === normalizeText(name));
      if (existing) {
        existing.name = name;
        existing.emoji = requestedEmoji || existing.emoji || defaultCategoryEmoji(name);
        existing.deletedAt = 0;
        existing.updatedAt = now;
      } else {
        db.pantry.categoryMeta.push({
          id: categoryId(name),
          name,
          emoji: requestedEmoji || defaultCategoryEmoji(name),
          order: nextOrder++,
          createdAt: now,
          updatedAt: now,
          deletedAt: 0
        });
      }
      if (!(db.pantry.categories || []).some(entry => normalizeText(entry) === normalizeText(name))) db.pantry.categories.push(name);
    });
  }
  addAudit('cadastrou', key === 'sites' ? 'sites da feira' : 'categorias da feira', values.join(', '));
  saveData();
  $('#registryInput').value = '';
  if (key === 'categories') $('#registryEmojiInput').value = '📦';
  renderRegistryList();
  renderQuickOptions();
}

function deleteRegistryEntry(value) {
  const key = state.registryType === 'sites' ? 'sites' : 'categories';
  if (key === 'categories' && visible(db.pantry.products).some(product => normalizeText(product.category) === normalizeText(value))) {
    return toast('Esta categoria ainda está sendo usada por um produto.', 'error');
  }
  db.pantry[key] = (db.pantry[key] || []).filter(entry => entry !== value);
  if (key === 'categories') {
    const category = (db.pantry.categoryMeta || []).find(entry => normalizeText(entry.name) === normalizeText(value));
    if (category) {
      category.deletedAt = Date.now();
      category.updatedAt = category.deletedAt;
    }
  }
  if (key === 'categories' && state.marketCategory === value) state.marketCategory = 'all';
  addAudit('excluiu', key === 'sites' ? 'o site da feira' : 'a categoria da feira', value);
  saveData();
  renderRegistryList();
  renderQuickOptions();
}

function moveMarketCategory(name, direction) {
  const categories = visible(db.pantry.categoryMeta || [])
    .sort((a, b) => Number(a.order || 0) - Number(b.order || 0) || a.name.localeCompare(b.name));
  const index = categories.findIndex(entry => normalizeText(entry.name) === normalizeText(name));
  const targetIndex = index + Math.sign(direction);
  if (index < 0 || targetIndex < 0 || targetIndex >= categories.length) return;
  [categories[index], categories[targetIndex]] = [categories[targetIndex], categories[index]];
  const now = Date.now();
  categories.forEach((entry, order) => {
    entry.order = order;
    entry.updatedAt = now;
  });
  addAudit('reordenou', 'categorias da feira', name);
  saveData();
  renderRegistryList();
}

function updateMarketCategoryEmoji(name, emoji) {
  const category = visible(db.pantry.categoryMeta || []).find(entry => normalizeText(entry.name) === normalizeText(name));
  if (!category) return;
  category.emoji = String(emoji || '').trim() || defaultCategoryEmoji(category.name);
  category.updatedAt = Date.now();
  addAudit('alterou o emoji de', 'categoria da feira', category.name);
  saveData();
  renderRegistryList();
}

function categoryEmoji(name, fallback = '🧺') {
  const category = visible(db.pantry.categoryMeta || []).find(entry => normalizeText(entry.name) === normalizeText(name));
  return category?.emoji || fallback;
}

function categoryId(name) {
  const slug = normalizeText(name).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'categoria';
  return `category-${slug}`;
}

function defaultCategoryEmoji(name) {
  const text = normalizeText(name);
  if (/frio|laticinio|queijo/.test(text)) return '🧀';
  if (/seco|mercearia|mercado/.test(text)) return '📦';
  if (/higiene|papel|shampoo/.test(text)) return '🧴';
  if (/limpeza|sabao|detergente/.test(text)) return '🧼';
  if (/hortifruti|feira|fruta|verdura/.test(text)) return '🥬';
  if (/bebida|suco|agua/.test(text)) return '🥤';
  if (/farmacia|remedio/.test(text)) return '💊';
  if (/pet|racao/.test(text)) return '🐾';
  return '🧺';
}

function parseRegistryValues(value) {
  return String(value || '').split(';').map(entry => entry.trim()).filter(Boolean);
}

function financeOwnerOptions(existingOwner = '') {
  const names = ['Todos'];
  [...(syncState.users || []), syncState.user]
    .filter(Boolean)
    .map(user => String(user.name || user.login || '').trim())
    .filter(Boolean)
    .forEach(name => {
      if (!names.some(entry => normalizeText(entry) === normalizeText(name))) names.push(name);
    });
  if (existingOwner && existingOwner !== 'Casa' && !names.some(entry => normalizeText(entry) === normalizeText(existingOwner))) names.push(existingOwner);
  return names.map(name => [name, name]);
}

function incomeCategoryLabel(value) {
  const text = String(value || 'Receita').trim();
  if (normalizeText(text) === 'salario') return 'Salário';
  return capitalize(text);
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
  const categoryMeta = DEFAULT_MARKET_CATEGORIES.map((name, index) => ({
    id: categoryId(name),
    name,
    emoji: defaultCategoryEmoji(name),
    order: index,
    createdAt: now,
    updatedAt: now,
    deletedAt: 0
  }));
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
    id: `product-${normalizeText(name).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`,
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
        { id: 'account-conta', name: 'Conta', type: 'Conta corrente', balance: 0, notes: '', createdAt: now, updatedAt: now },
        { id: 'account-poupanca', name: 'Poupança', type: 'Poupança', balance: 0, notes: '', createdAt: now, updatedAt: now }
      ],
      receivables: [],
      debts: []
    },
    tasks: [],
    pantry: {
      categories: DEFAULT_MARKET_CATEGORIES.slice(),
      categoryMeta,
      sites: [],
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
  normalized.tasks = Array.isArray(normalized.tasks) ? normalized.tasks.map(normalizeItem) : [];
  normalized.pantry.categories = Array.isArray(normalized.pantry.categories) ? normalized.pantry.categories : DEFAULT_MARKET_CATEGORIES.slice();
  const rawCategoryMeta = Array.isArray(data.pantry?.categoryMeta)
    ? data.pantry.categoryMeta
    : normalized.pantry.categories.map((name, index) => ({ id: categoryId(name), name, emoji: defaultCategoryEmoji(name), order: index }));
  normalized.pantry.categoryMeta = rawCategoryMeta.map((entry, index) => normalizeItem({
    ...entry,
    id: entry.id || categoryId(entry.name),
    name: String(entry.name || '').trim(),
    emoji: entry.emoji || defaultCategoryEmoji(entry.name),
    order: Number.isFinite(Number(entry.order)) ? Number(entry.order) : index
  })).filter(entry => entry.name);
  normalized.pantry.categories = Array.from(new Set(normalized.pantry.categories.concat(normalized.pantry.categoryMeta.map(entry => entry.name))));
  normalized.pantry.sites = Array.isArray(normalized.pantry.sites) ? normalized.pantry.sites : [];
  normalized.audit = Array.isArray(normalized.audit) ? normalized.audit.map(normalizeItem) : [];
  return normalizeLogicalDuplicates(normalized);
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

async function initializeAccess() {
  if (!syncEnabled()) {
    renderSyncStatus();
    return;
  }
  try {
    const status = await syncRequest('status');
    syncState.meta.initialized = status.initialized === true;
    syncState.meta.serverTime = status.serverTime || 0;
    saveSyncMeta();
    if (!syncState.meta.initialized) {
      setView('settings');
      return;
    }
    if (!syncState.token || !syncState.user) {
      showLoginDialog();
      return;
    }
    await initializeSync();
  } catch (error) {
    console.warn('Access initialization failed', error);
    renderSyncStatus();
  }
}

function showLoginDialog() {
  $('#accessLoginInput').value = localStorage.getItem(LAST_LOGIN_KEY) || syncState.settings.ownerLogin || '';
  $('#accessPasswordInput').value = '';
  $('#accessLoginError').hidden = true;
  $('#accessLoginError').textContent = '';
  setLoginButtonBusy('accessLoginBtn', false);
  if (!$('#loginDialog').open) $('#loginDialog').showModal();
  setTimeout(() => ($('#accessLoginInput').value ? $('#accessPasswordInput') : $('#accessLoginInput')).focus(), 50);
}

async function handleAccessLogin(event) {
  event.preventDefault();
  if ($('#accessLoginBtn').disabled) return;
  const login = $('#accessLoginInput').value.trim().toLowerCase();
  const password = $('#accessPasswordInput').value.trim();
  setLoginButtonBusy('accessLoginBtn', true);
  try {
    await authenticateSync(login, password);
    $('#accessPasswordInput').value = '';
    closeDialog('loginDialog');
    toast('Bem-vindo de volta.', 'good');
  } catch (error) {
    $('#accessLoginError').textContent = error.message || 'Não foi possível entrar.';
    $('#accessLoginError').hidden = false;
  } finally {
    setLoginButtonBusy('accessLoginBtn', false);
  }
}

function setLoginButtonBusy(buttonId, busy) {
  const button = document.getElementById(buttonId);
  if (!button) return;
  button.disabled = busy;
  button.classList.toggle('is-loading', busy);
  button.innerHTML = iconSvg(busy ? 'refresh-cw' : 'log-in') + (busy ? 'Entrando' : 'Entrar');
}

async function authenticateSync(login, password) {
  if (!syncEnabled()) throw new Error('Configure a sincronização primeiro.');
  if (!login || !password) throw new Error('Informe login e senha.');
  const payload = await syncRequest('login', { login, pin: password });
  applyAuthPayload(payload);
  localStorage.setItem(LAST_LOGIN_KEY, login);
  $('#syncLoginInput').value = login;
  await pullRemoteData({ merge: true, notify: false });
  await refreshSyncUsers();
  startSyncPolling();
  render();
}

async function initializeSync() {
  if (!syncEnabled()) {
    renderSyncStatus();
    return;
  }
  try {
    const status = await syncRequest('status');
    syncState.meta.initialized = status.initialized === true;
    syncState.meta.serverTime = status.serverTime || 0;
    saveSyncMeta();
    if (syncState.token && syncState.user) {
      await checkRemoteRevision();
      await refreshSyncUsers();
      syncState.meta.conflict = false;
      syncState.meta.syncError = '';
      saveSyncMeta();
      startSyncPolling();
      if (syncState.meta.localDirty) await pushRemoteData(false, false);
    }
  } catch (error) {
    console.warn('Sync status failed', error);
    if (/entre novamente|sess[aã]o|acesso removido/i.test(error.message || '')) {
      clearAuthSession();
      showLoginDialog();
    }
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
      if (!/^\d{4,8}$/.test(ownerPin)) throw new Error('Use uma senha numérica de 4 a 8 dígitos.');
      const payload = await syncRequest('bootstrap', {
        installationKey: $('#syncInstallKeyInput').value.trim(),
        ownerName: $('#syncOwnerNameInput').value.trim() || 'Lincoln',
        ownerLogin: syncState.settings.ownerLogin,
        ownerPin,
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
    if (syncState.user) {
      await refreshSyncUsers();
      startSyncPolling();
    }
    renderSyncStatus();
    toast('Sincronização configurada.', 'good');
  } catch (error) {
    toast(error.message || 'Falha ao conectar.', 'error');
  }
}

async function handleSyncLogin(event) {
  event.preventDefault();
  if ($('#syncLoginBtn').disabled) return;
  if (!syncEnabled()) return toast('Configure a URL primeiro.', 'error');
  const login = $('#syncLoginInput').value.trim().toLowerCase();
  const password = $('#syncPinInput').value.trim();
  if (!login || !password) return toast('Informe login e senha.', 'error');
  setLoginButtonBusy('syncLoginBtn', true);
  try {
    await authenticateSync(login, password);
    $('#syncPinInput').value = '';
    if ($('#loginDialog').open) closeDialog('loginDialog');
    toast('Login feito.', 'good');
  } catch (error) {
    toast(error.message || 'Login falhou.', 'error');
  } finally {
    setLoginButtonBusy('syncLoginBtn', false);
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
    syncState.meta.syncError = '';
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
    syncState.meta.syncError = error.message || 'Falha ao enviar.';
    syncState.meta.conflict = false;
    saveSyncMeta();
    clearTimeout(syncState.timer);
    syncState.timer = setTimeout(() => pushRemoteData(false, false), 8000);
    if (notify) toast(syncState.meta.syncError, 'error');
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
  purgeExpiredBoughtItems(db);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  syncState.revision = Number(remote.revision || 0);
  sessionStorage.setItem(SYNC_REVISION_KEY, String(syncState.revision));
  const saved = await syncRequest('save', { data: db, baseRevision: syncState.revision, force: true });
  syncState.revision = Number(saved.revision || syncState.revision || 0);
  sessionStorage.setItem(SYNC_REVISION_KEY, String(syncState.revision));
  syncState.meta.localDirty = false;
  syncState.meta.conflict = false;
  syncState.meta.syncError = '';
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
    const nextDB = merge ? mergeDB(incoming, db) : incoming;
    const mergeChangedRemote = merge && comparableData(nextDB) !== comparableData(incoming);
    db = nextDB;
    const expiredBoughtCount = purgeExpiredBoughtItems(db);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    syncState.revision = Number(payload.revision || syncState.revision || 0);
    sessionStorage.setItem(SYNC_REVISION_KEY, String(syncState.revision));
    syncState.meta.localDirty = merge
      ? syncState.meta.localDirty || mergeChangedRemote || expiredBoughtCount > 0
      : expiredBoughtCount > 0;
    syncState.meta.conflict = false;
    syncState.meta.syncError = '';
    syncState.meta.lastSyncAt = Date.now();
    saveSyncMeta();
    if ((merge || expiredBoughtCount > 0) && syncState.meta.localDirty) {
      const saved = await syncRequest('save', { data: db, baseRevision: syncState.revision, force: true });
      syncState.revision = Number(saved.revision || syncState.revision || 0);
      sessionStorage.setItem(SYNC_REVISION_KEY, String(syncState.revision));
      syncState.meta.localDirty = false;
      syncState.meta.lastSyncAt = Date.now();
      saveSyncMeta();
    }
    render();
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
  if (Number(status.revision || 0) > syncState.revision) {
    if (syncState.meta.localDirty) await pushRemoteData(false, false);
    else await pullRemoteData({ merge: false, notify: false });
  }
}

function startSyncPolling() {
  clearInterval(syncState.pollTimer);
  if (!syncEnabled() || !syncState.user) return;
  syncState.pollTimer = setInterval(() => {
    if (document.visibilityState === 'visible') checkRemoteRevision().catch(() => {});
  }, 20000);
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
  syncState.users = Array.isArray(payload.users) ? payload.users : syncState.users;
  sessionStorage.setItem(SYNC_TOKEN_KEY, syncState.token);
  sessionStorage.setItem(SYNC_USER_KEY, JSON.stringify(syncState.user));
  sessionStorage.setItem(SYNC_REVISION_KEY, String(syncState.revision));
}

function clearAuthSession() {
  clearInterval(syncState.pollTimer);
  syncState.pollTimer = null;
  syncState.token = '';
  syncState.user = null;
  syncState.users = [];
  syncState.revision = 0;
  sessionStorage.removeItem(SYNC_TOKEN_KEY);
  sessionStorage.removeItem(SYNC_USER_KEY);
  sessionStorage.removeItem(SYNC_REVISION_KEY);
}

function logoutSync() {
  if (!syncEnabled()) {
    setView('settings');
    toast('Configure o acesso compartilhado primeiro.', 'error');
    return;
  }
  if (syncState.token && syncEnabled()) syncRequest('logout').catch(() => {});
  clearAuthSession();
  renderSyncStatus();
  renderSyncUsers();
  showLoginDialog();
  toast('Você saiu.', 'good');
}

function lockApp() {
  logoutSync();
}

async function refreshSyncUsers() {
  if (!syncEnabled() || !syncState.user) return;
  try {
    const payload = await syncRequest('users');
    syncState.users = Array.isArray(payload.users) ? payload.users : [];
    const current = syncState.users.find(user => user.login === syncState.user?.login);
    if (current && syncState.user) {
      syncState.user = { ...syncState.user, ...current };
      sessionStorage.setItem(SYNC_USER_KEY, JSON.stringify(syncState.user));
    }
    renderSyncUsers();
  } catch (error) {
    syncState.users = [];
    renderSyncUsers();
  }
}

function openSyncUserDialog(login = '') {
  if (syncState.user?.role !== 'owner') return toast('Entre como administrador para cadastrar usuários.', 'error');
  const user = login ? syncState.users.find(entry => entry.login === login) : null;
  $('#syncUserDialogTitle').textContent = user ? 'Editar usuário' : 'Novo usuário';
  $('#syncUserEditingLogin').value = user?.login || '';
  $('#syncUserNameInput').value = user?.name || '';
  $('#syncUserLoginInput').value = user?.login || '';
  $('#syncUserLoginInput').disabled = Boolean(user);
  $('#syncUserPinInput').value = '';
  $('#syncUserPinInput').required = !user;
  $('#syncUserPinInput').placeholder = user ? 'Deixe vazio para manter a senha' : '';
  $('#saveSyncUserBtn').innerHTML = iconSvg(user ? 'check' : 'plus') + (user ? 'Salvar alterações' : 'Cadastrar');
  $('#deleteSyncUserBtn').hidden = !user || user.login === syncState.user.login || user.role === 'owner';
  $('#syncUserDialog').showModal();
  $('#syncUserNameInput').focus();
}

async function saveSyncUserFromForm(event) {
  event.preventDefault();
  if (syncState.user?.role !== 'owner') return toast('Apenas o administrador pode cadastrar usuários.', 'error');
  const name = $('#syncUserNameInput').value.trim();
  const editing = Boolean($('#syncUserEditingLogin').value);
  const login = ($('#syncUserEditingLogin').value || $('#syncUserLoginInput').value).trim().toLowerCase();
  const pin = $('#syncUserPinInput').value.trim();
  if (!name || !/^[a-z0-9._-]{3,40}$/.test(login)) return toast('Informe nome e login válidos.', 'error');
  if ((!editing || pin) && !/^\d{4,8}$/.test(pin)) return toast('Use uma senha numérica de 4 a 8 dígitos.', 'error');
  try {
    const payload = await syncRequest('upsertUser', { name, login, pin });
    syncState.users = Array.isArray(payload.users) ? payload.users : syncState.users;
    addAudit(editing ? 'alterou' : 'cadastrou', 'o usuário', name);
    saveData();
    closeDialog('syncUserDialog');
    renderSyncUsers();
    toast(editing ? 'Usuário atualizado.' : 'Usuário cadastrado.', 'good');
  } catch (error) {
    toast(error.message || 'Falha ao cadastrar usuário.', 'error');
  }
}

async function deleteSyncUser() {
  const login = $('#syncUserEditingLogin').value;
  const user = syncState.users.find(entry => entry.login === login);
  if (!user || !confirm(`Excluir o acesso de ${user.name || user.login}?`)) return;
  try {
    const payload = await syncRequest('deactivateUser', { login });
    syncState.users = Array.isArray(payload.users) ? payload.users : syncState.users;
    addAudit('removeu', 'o usuário', user.name || user.login);
    saveData();
    closeDialog('syncUserDialog');
    renderSyncUsers();
    toast('Usuário removido.', 'good');
  } catch (error) {
    toast(error.message || 'Falha ao remover usuário.', 'error');
  }
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
    syncError: '',
    lastSyncAt: 0,
    serverTime: 0,
    ...readJSON(localStorage.getItem(SYNC_META_KEY), {})
  };
}

function comparableData(data) {
  const copy = clone(data);
  copy.updatedAt = 0;
  return JSON.stringify(copy);
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
  merged.tasks = mergeArray(remote.tasks, local.tasks);
  merged.pantry.products = mergeArray(remote.pantry.products, local.pantry.products);
  merged.pantry.list = mergeArray(remote.pantry.list, local.pantry.list);
  merged.audit = mergeArray(remote.audit, local.audit);
  merged.pantry.categoryMeta = mergeArray(remote.pantry.categoryMeta, local.pantry.categoryMeta);
  merged.pantry.categories = Array.from(new Set([...(remote.pantry.categories || []), ...(local.pantry.categories || [])]));
  merged.pantry.sites = Array.from(new Set([...(remote.pantry.sites || []), ...(local.pantry.sites || [])]));
  merged.updatedAt = Math.max(Number(remote.updatedAt || 0), Number(local.updatedAt || 0), Date.now());
  return normalizeLogicalDuplicates(merged);
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

function normalizeLogicalDuplicates(data) {
  if (!data?.pantry) return data;
  const accountGroups = new Map();
  const deletedAccounts = [];
  const accountIdMap = new Map();
  (data.finances?.accounts || []).forEach(rawAccount => {
    const account = clone(rawAccount);
    if (account.deletedAt) {
      deletedAccounts.push(account);
      return;
    }
    const key = normalizeText(account.name) || account.id;
    const group = accountGroups.get(key) || [];
    group.push(account);
    accountGroups.set(key, group);
  });
  const accounts = [];
  accountGroups.forEach(group => {
    group.sort((a, b) => accountRecordScore(b) - accountRecordScore(a) || itemStamp(b) - itemStamp(a));
    const canonical = clone(group[0]);
    canonical.updatedAt = Math.max(...group.map(itemStamp));
    group.forEach(account => accountIdMap.set(account.id, canonical.id));
    accounts.push(canonical);
  });
  data.finances.accounts = deletedAccounts.concat(accounts);
  ['expenses', 'incomes', 'recurring'].forEach(collection => {
    (data.finances[collection] || []).forEach(item => {
      if (item.accountId) item.accountId = accountIdMap.get(item.accountId) || item.accountId;
    });
  });

  const activeProducts = new Map();
  const deletedProducts = [];
  const productIdMap = new Map();

  (data.pantry.products || []).forEach(rawProduct => {
    const product = clone(rawProduct);
    if (product.deletedAt) {
      deletedProducts.push(product);
      return;
    }
    const key = normalizeText(product.name) || product.id;
    const group = activeProducts.get(key) || [];
    group.push(product);
    activeProducts.set(key, group);
  });

  const products = [];
  activeProducts.forEach(group => {
    group.sort((a, b) => productRecordScore(b) - productRecordScore(a) || itemStamp(b) - itemStamp(a));
    const canonical = clone(group[0]);
    ['category', 'unit', 'units', 'goodBrands', 'badBrands', 'sites', 'notes'].forEach(field => {
      if (!canonical[field]) canonical[field] = group.find(item => item[field])?.[field] || '';
    });
    if (!(Number(canonical.defaultQty) > 0)) canonical.defaultQty = Number(group.find(item => Number(item.defaultQty) > 0)?.defaultQty || 1);
    canonical.updatedAt = Math.max(...group.map(itemStamp));
    group.forEach(product => productIdMap.set(product.id, canonical.id));
    products.push(canonical);
  });
  data.pantry.products = deletedProducts.concat(products);

  const deletedListItems = [];
  const activeListItems = new Map();
  (data.pantry.list || []).forEach(rawItem => {
    const item = clone(rawItem);
    item.productId = productIdMap.get(item.productId) || item.productId;
    if (item.deletedAt) {
      deletedListItems.push(item);
      return;
    }
    const key = item.productId || normalizeText(item.name) || item.id;
    const previous = activeListItems.get(key);
    if (!previous || itemStamp(item) >= itemStamp(previous)) activeListItems.set(key, item);
  });
  data.pantry.list = deletedListItems.concat(Array.from(activeListItems.values()));
  data.pantry.categories = dedupeTextValues(data.pantry.categories || []);
  data.pantry.sites = dedupeTextValues(data.pantry.sites || []);
  return data;
}

function accountRecordScore(account) {
  return (String(account.id || '').includes('_') ? 4 : 0)
    + (Number(account.balance || 0) !== 0 ? 8 : 0)
    + (account.notes ? 2 : 0);
}

function productRecordScore(product) {
  return (String(product.id || '').includes('_') ? 4 : 0)
    + ['units', 'goodBrands', 'badBrands', 'sites', 'notes'].filter(field => product[field]).length;
}

function dedupeTextValues(values) {
  const map = new Map();
  values.forEach(value => {
    const clean = String(value || '').trim();
    const key = normalizeText(clean);
    if (clean && !map.has(key)) map.set(key, clean);
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
      purgeExpiredBoughtItems(db);
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

async function forceAppUpdate() {
  const button = $('#forceUpdateBtn');
  button.disabled = true;
  button.classList.add('is-updating');
  toast('Verificando atualização...', 'good');
  try {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.filter(key => key.startsWith('alo-financas-')).map(key => caches.delete(key)));
    }
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(registration => registration.update()));
    }
  } finally {
    window.location.reload();
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

function shortDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
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
