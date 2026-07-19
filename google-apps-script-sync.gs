const AF_APP_ID = 'alo-financas';
const AF_DB_FILE_NAME = 'alo_financas_sync_db.json';
const AF_BACKUP_FOLDER = 'Alo Financas Backups';
const AF_SESSION_SECONDS = 21600;
const INSTALLATION_KEY = 'troque-esta-chave';

function doGet() {
  try {
    return afJson_(afStatus_());
  } catch (err) {
    return afJson_({ ok: false, error: err.message || String(err) });
  }
}

function doPost(e) {
  try {
    const request = JSON.parse(e.postData.contents || '{}');
    if (request.appId !== AF_APP_ID) throw new Error('Aplicativo invalido.');
    const action = String(request.action || '');
    const payload = request.payload || {};

    if (action === 'status') return afJson_(afStatus_());
    if (action === 'bootstrap') return afJson_(afBootstrap_(payload));
    if (action === 'login') return afJson_(afLogin_(payload));

    const session = afRequireSession_(request.token);
    if (action === 'logout') return afJson_(afLogout_(request.token));
    if (action === 'pull') return afJson_(afPull_(session));
    if (action === 'check') return afJson_(afCheck_());
    if (action === 'save') return afJson_(afSave_(payload, session));
    if (action === 'users') return afJson_(afListUsers_(session));
    if (action === 'upsertUser') return afJson_(afUpsertUser_(payload, session));
    if (action === 'deactivateUser') return afJson_(afDeactivateUser_(payload, session));
    throw new Error('Acao desconhecida.');
  } catch (err) {
    return afJson_({ ok: false, error: err.message || String(err) });
  }
}

function afStatus_() {
  const store = afLoadStore_();
  return { ok: true, initialized: store.initialized === true, revision: store.revision || 0, updatedAt: store.updatedAt || 0, serverTime: Date.now() };
}

function afBootstrap_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const store = afLoadStore_();
    if (store.initialized) throw new Error('Servidor ja inicializado.');
    if (String(payload.installationKey || '') !== INSTALLATION_KEY) throw new Error('Chave de instalacao incorreta.');

    const ownerLogin = afCleanLogin_(payload.ownerLogin || 'lincoln');
    const users = [afCreateUser_(payload.ownerName || 'Lincoln', ownerLogin, payload.ownerPin, 'owner')];

    const now = Date.now();
    const nextStore = {
      appId: AF_APP_ID,
      initialized: true,
      revision: 1,
      updatedAt: now,
      users,
      data: afCleanData_(payload.data)
    };
    afSaveStore_(nextStore);
    afBackup_(nextStore);
    return afLogin_({ login: ownerLogin, pin: payload.ownerPin });
  } finally {
    lock.releaseLock();
  }
}

function afLogin_(payload) {
  const store = afLoadStore_();
  if (!store.initialized) throw new Error('Servidor nao inicializado.');
  const login = afCleanLogin_(payload.login);
  const user = (store.users || []).find(item => item.login === login && item.active !== false);
  if (!user) throw new Error('Login ou senha incorretos.');
  if (afHashPin_(payload.pin, user.salt) !== user.pinHash) throw new Error('Login ou senha incorretos.');
  const role = user.role || ((store.users || [])[0] && store.users[0].login === user.login ? 'owner' : 'member');

  const token = Utilities.getUuid() + Utilities.getUuid();
  CacheService.getScriptCache().put(afSessionKey_(token), JSON.stringify({ login: user.login, role: role, issuedAt: Date.now() }), AF_SESSION_SECONDS);
  return {
    ok: true,
    token,
    user: { login: user.login, name: user.name, role: role },
    users: afPublicUsers_(store),
    revision: store.revision || 0,
    updatedAt: store.updatedAt || 0,
    data: store.data || null,
    serverTime: Date.now()
  };
}

function afLogout_(token) {
  if (token) CacheService.getScriptCache().remove(afSessionKey_(token));
  return { ok: true };
}

function afPull_() {
  const store = afLoadStore_();
  return { ok: true, data: store.data || null, revision: store.revision || 0, updatedAt: store.updatedAt || 0, serverTime: Date.now() };
}

function afCheck_() {
  const store = afLoadStore_();
  return { ok: true, revision: store.revision || 0, updatedAt: store.updatedAt || 0, serverTime: Date.now() };
}

function afSave_(payload, session) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const store = afLoadStore_();
    if (!store.initialized) throw new Error('Servidor nao inicializado.');
    const baseRevision = Number(payload.baseRevision || 0);
    const force = payload.force === true;
    if (!force && baseRevision !== Number(store.revision || 0)) {
      return { ok: false, conflict: true, error: 'Dados mais novos no servidor.' };
    }
    const now = Date.now();
    store.data = afCleanData_(payload.data);
    store.revision = Number(store.revision || 0) + 1;
    store.updatedAt = now;
    store.lastSavedBy = session.login;
    afSaveStore_(store);
    afBackup_(store);
    return { ok: true, revision: store.revision, updatedAt: store.updatedAt, serverTime: Date.now() };
  } finally {
    lock.releaseLock();
  }
}

function afListUsers_() {
  const store = afLoadStore_();
  return { ok: true, users: afPublicUsers_(store) };
}

function afUpsertUser_(payload, session) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const store = afLoadStore_();
    afRequireOwner_(store, session);
    const login = afCleanLogin_(payload.login);
    const name = String(payload.name || '').trim();
    if (!name) throw new Error('Nome obrigatorio.');
    const existing = (store.users || []).find(item => item.login === login);
    if (existing) {
      if (existing.role === 'owner' && existing.login !== session.login) throw new Error('Administrador protegido.');
      existing.name = name;
      if (String(payload.pin || '')) {
        if (!/^\d{4,8}$/.test(String(payload.pin))) throw new Error('A senha deve ter de 4 a 8 numeros.');
        existing.salt = Utilities.getUuid();
        existing.pinHash = afHashPin_(payload.pin, existing.salt);
      }
      existing.active = true;
      existing.updatedAt = Date.now();
    } else {
      if (!/^\d{4,8}$/.test(String(payload.pin || ''))) throw new Error('A senha deve ter de 4 a 8 numeros.');
      store.users.push(afCreateUser_(name, login, payload.pin, 'member'));
    }
    store.updatedAt = Date.now();
    afSaveStore_(store);
    afBackup_(store);
    return { ok: true, users: afPublicUsers_(store) };
  } finally {
    lock.releaseLock();
  }
}

function afRequireOwner_(store, session) {
  const user = (store.users || []).find(item => item.login === session.login && item.active !== false);
  const isFirstUser = (store.users || [])[0] && store.users[0].login === session.login;
  if (!user || (user.role !== 'owner' && !isFirstUser)) throw new Error('Apenas o administrador pode cadastrar usuarios.');
  return user;
}

function afDeactivateUser_(payload, session) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const store = afLoadStore_();
    afRequireOwner_(store, session);
    const login = afCleanLogin_(payload.login);
    if (login === session.login) throw new Error('Voce nao pode excluir o proprio acesso.');
    const user = (store.users || []).find(item => item.login === login && item.active !== false);
    if (!user) throw new Error('Usuario nao encontrado.');
    if (user.role === 'owner') throw new Error('Administrador protegido.');
    user.active = false;
    user.updatedAt = Date.now();
    store.updatedAt = Date.now();
    afSaveStore_(store);
    afBackup_(store);
    return { ok: true, users: afPublicUsers_(store) };
  } finally {
    lock.releaseLock();
  }
}

function afPublicUsers_(store) {
  return (store.users || []).filter(item => item.active !== false).map(function(item, index) {
    return {
      id: item.id,
      name: item.name,
      login: item.login,
      role: item.role || (index === 0 ? 'owner' : 'member')
    };
  });
}

function afRequireSession_(token) {
  const raw = CacheService.getScriptCache().get(afSessionKey_(token));
  if (!raw) throw new Error('Entre novamente.');
  const session = JSON.parse(raw);
  const store = afLoadStore_();
  const activeUser = (store.users || []).find(function(item) { return item.login === session.login && item.active !== false; });
  if (!activeUser) {
    CacheService.getScriptCache().remove(afSessionKey_(token));
    throw new Error('Acesso removido. Entre novamente.');
  }
  CacheService.getScriptCache().put(afSessionKey_(token), raw, AF_SESSION_SECONDS);
  return session;
}

function afCreateUser_(name, login, pin, role) {
  if (!/^\d{4,8}$/.test(String(pin || ''))) throw new Error('A senha deve ter de 4 a 8 numeros.');
  const salt = Utilities.getUuid();
  return {
    id: Utilities.getUuid(),
    name: String(name || login).trim(),
    login: afCleanLogin_(login),
    salt,
    pinHash: afHashPin_(pin, salt),
    role: role || 'member',
    active: true,
    createdAt: Date.now()
  };
}

function afCleanLogin_(login) {
  const clean = String(login || '').trim().toLowerCase();
  if (!/^[a-z0-9._-]{3,40}$/.test(clean)) throw new Error('Login invalido.');
  return clean;
}

function afCleanData_(data) {
  if (!data || data.appId !== AF_APP_ID) throw new Error('Dados invalidos.');
  return data;
}

function afHashPin_(pin, salt) {
  const raw = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + ':' + String(pin || ''), Utilities.Charset.UTF_8);
  return Utilities.base64Encode(raw);
}

function afSessionKey_(token) {
  if (!token) throw new Error('Entre para continuar.');
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(token), Utilities.Charset.UTF_8);
  return 'af_session_' + Utilities.base64EncodeWebSafe(digest).slice(0, 42);
}

function afLoadStore_() {
  const file = afGetDBFile_();
  const text = file.getBlob().getDataAsString('UTF-8');
  if (!text) return afEmptyStore_();
  try {
    return Object.assign(afEmptyStore_(), JSON.parse(text));
  } catch (err) {
    return afEmptyStore_();
  }
}

function afSaveStore_(store) {
  afGetDBFile_().setContent(JSON.stringify(store));
}

function afEmptyStore_() {
  return { appId: AF_APP_ID, initialized: false, revision: 0, updatedAt: 0, users: [], data: null };
}

function afGetDBFile_() {
  const files = DriveApp.getFilesByName(AF_DB_FILE_NAME);
  if (files.hasNext()) return files.next();
  return DriveApp.createFile(AF_DB_FILE_NAME, JSON.stringify(afEmptyStore_()), MimeType.PLAIN_TEXT);
}

function afBackup_(store) {
  const folder = afGetBackupFolder_();
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
  folder.createFile('alo_financas_backup_' + stamp + '.json', JSON.stringify(store), MimeType.PLAIN_TEXT);
}

function afGetBackupFolder_() {
  const folders = DriveApp.getFoldersByName(AF_BACKUP_FOLDER);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(AF_BACKUP_FOLDER);
}

function afJson_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
