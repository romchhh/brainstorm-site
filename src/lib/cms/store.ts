import fs from 'fs';
import path from 'path';
import type BetterSqlite3 from 'better-sqlite3';
import { defaultCmsDb } from '@/data/cmsSeed';
import { normalizeGalleryItem } from '@/lib/cms/normalize';
import type {
  AdminRole,
  AdminUser,
  AnalyticsEvent,
  CmsDb,
  ContentCollection,
  EventRegistration,
  Lead,
  SiteSettings,
} from '@/data/cmsTypes';

export type { Lead, LeadStatus, AdminRole, AdminUser, SiteSettings, AnalyticsEvent, CmsDb, EventRegistration, RegistrationStatus } from '@/data/cmsTypes';
export type { CmsProject, CmsEvent, CmsNewsItem, CmsTeamMember, CmsReview, CmsReport, CmsGalleryItem, CmsTickerItem } from '@/data/cmsTypes';

const DATA_DIR = process.env.CMS_DATA_DIR || path.join(process.cwd(), 'cms-data');
const SQLITE_FILE = path.join(DATA_DIR, 'brainstorm.sqlite');

type SqliteDatabase = BetterSqlite3.Database;

declare global {
  // eslint-disable-next-line no-var
  var __brainstormSqlite: SqliteDatabase | undefined;
  // eslint-disable-next-line no-var
  var __brainstormBuildDb: CmsDb | undefined;
}

const CONTENT_COLLECTIONS: ContentCollection[] = [
  'projects',
  'events',
  'news',
  'team',
  'reviews',
  'reports',
  'gallery',
  'ticker',
];

function isProductionBuild() {
  return process.env.NEXT_PHASE === 'phase-production-build';
}

function loadSqlite(): typeof BetterSqlite3 {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require('better-sqlite3') as typeof BetterSqlite3;
}

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function itemId(collection: ContentCollection, item: Record<string, unknown>): string {
  return String(item.id);
}

function getDb(): SqliteDatabase {
  if (isProductionBuild()) {
    throw new Error('SQLite is disabled during Next.js production build');
  }
  if (globalThis.__brainstormSqlite) return globalThis.__brainstormSqlite;

  ensureDir();
  const Database = loadSqlite();
  const db = new Database(SQLITE_FILE);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.pragma('synchronous = NORMAL');
  db.pragma('cache_size = -80000');
  db.pragma('temp_store = MEMORY');
  db.pragma('mmap_size = 268435456');

  db.exec(`
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cms_items (
      collection TEXT NOT NULL,
      id TEXT NOT NULL,
      data TEXT NOT NULL,
      sort_index INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL,
      PRIMARY KEY (collection, id)
    );

    CREATE INDEX IF NOT EXISTS idx_cms_items ON cms_items(collection, sort_index);
    CREATE INDEX IF NOT EXISTS idx_cms_collection_id ON cms_items(collection, id);

    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS roles (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      login TEXT UNIQUE NOT NULL,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS analytics (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      path TEXT NOT NULL,
      created_at TEXT NOT NULL,
      data TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      login TEXT NOT NULL,
      role_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS event_registrations (
      id TEXT PRIMARY KEY,
      event_id TEXT NOT NULL,
      data TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
    CREATE INDEX IF NOT EXISTS idx_registrations_created ON event_registrations(created_at);
    CREATE INDEX IF NOT EXISTS idx_registrations_event ON event_registrations(event_id);
    CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics(created_at);
    CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);
  `);

  globalThis.__brainstormSqlite = db;
  bootstrapIfNeeded(db);
  return db;
}

function countRows(db: SqliteDatabase, table: string) {
  const row = db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get() as { count: number };
  return row.count;
}

function readCollection<T>(db: SqliteDatabase, collection: ContentCollection): T[] {
  const rows = db
    .prepare(`SELECT data FROM cms_items WHERE collection = ? ORDER BY sort_index ASC, rowid ASC`)
    .all(collection) as Array<{ data: string }>;
  return rows.map((row) => JSON.parse(row.data) as T);
}

function replaceCollection(db: SqliteDatabase, collection: ContentCollection, items: Array<Record<string, unknown>>) {
  const now = new Date().toISOString();
  const del = db.prepare(`DELETE FROM cms_items WHERE collection = ?`);
  const ins = db.prepare(
    `INSERT INTO cms_items (collection, id, data, sort_index, updated_at) VALUES (@collection, @id, @data, @sort_index, @updated_at)`,
  );
  del.run(collection);
  items.forEach((item, index) => {
    ins.run({
      collection,
      id: itemId(collection, item),
      data: JSON.stringify(item),
      sort_index: index,
      updated_at: now,
    });
  });
}

type SimpleTable = 'roles' | 'users' | 'leads' | 'event_registrations';

function readSimpleCollection<T>(db: SqliteDatabase, table: SimpleTable): T[] {
  const order =
    table === 'leads' || table === 'event_registrations' ? 'created_at DESC' : 'rowid ASC';
  const rows = db.prepare(`SELECT data FROM ${table} ORDER BY ${order}`).all() as Array<{ data: string }>;
  return rows.map((row) => JSON.parse(row.data) as T);
}

function replaceSimpleCollection(db: SqliteDatabase, table: SimpleTable, items: Array<Record<string, unknown>>) {
  const now = new Date().toISOString();
  db.prepare(`DELETE FROM ${table}`).run();

  if (table === 'leads') {
    const stmt = db.prepare(
      `INSERT INTO leads (id, data, created_at, updated_at) VALUES (@id, @data, @created_at, @updated_at)`,
    );
    for (const item of items) {
      stmt.run({
        id: String(item.id),
        data: JSON.stringify(item),
        created_at: String(item.createdAt || now),
        updated_at: String(item.updatedAt || now),
      });
    }
    return;
  }

  if (table === 'event_registrations') {
    const stmt = db.prepare(
      `INSERT INTO event_registrations (id, event_id, data, created_at, updated_at)
       VALUES (@id, @event_id, @data, @created_at, @updated_at)`,
    );
    for (const item of items) {
      stmt.run({
        id: String(item.id),
        event_id: String(item.eventId),
        data: JSON.stringify(item),
        created_at: String(item.createdAt || now),
        updated_at: String(item.updatedAt || now),
      });
    }
    return;
  }

  if (table === 'users') {
    const stmt = db.prepare(
      `INSERT INTO users (id, login, data, updated_at) VALUES (@id, @login, @data, @updated_at)`,
    );
    for (const item of items) {
      stmt.run({
        id: String(item.id),
        login: String(item.login),
        data: JSON.stringify(item),
        updated_at: now,
      });
    }
    return;
  }

  const stmt = db.prepare(`INSERT INTO ${table} (id, data, updated_at) VALUES (@id, @data, @updated_at)`);
  for (const item of items) {
    stmt.run({
      id: String(item.id),
      data: JSON.stringify(item),
      updated_at: now,
    });
  }
}

function readAnalytics(db: SqliteDatabase): AnalyticsEvent[] {
  const rows = db
    .prepare(`SELECT data FROM analytics ORDER BY created_at DESC LIMIT 5000`)
    .all() as Array<{ data: string }>;
  return rows.map((row) => JSON.parse(row.data) as AnalyticsEvent);
}

function replaceAnalytics(db: SqliteDatabase, items: AnalyticsEvent[]) {
  const now = new Date().toISOString();
  db.prepare(`DELETE FROM analytics`).run();
  const stmt = db.prepare(
    `INSERT INTO analytics (id, type, path, created_at, data) VALUES (@id, @type, @path, @created_at, @data)`,
  );
  for (const item of items) {
    stmt.run({
      id: item.id,
      type: item.type,
      path: item.path,
      created_at: item.createdAt || now,
      data: JSON.stringify(item),
    });
  }
}

function writeSettings(db: SqliteDatabase, settings: SiteSettings) {
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO settings (id, data, updated_at) VALUES (1, @data, @updated_at)
     ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
  ).run({
    data: JSON.stringify(settings),
    updated_at: now,
  });
}

function seedDatabase(db: SqliteDatabase, seed: CmsDb) {
  const tx = db.transaction(() => {
    for (const collection of CONTENT_COLLECTIONS) {
      replaceCollection(db, collection, seed[collection] as unknown as Array<Record<string, unknown>>);
    }
    replaceSimpleCollection(db, 'roles', seed.roles as unknown as Array<Record<string, unknown>>);
    replaceSimpleCollection(db, 'users', seed.users as unknown as Array<Record<string, unknown>>);
    replaceSimpleCollection(db, 'leads', seed.leads as unknown as Array<Record<string, unknown>>);
    replaceSimpleCollection(
      db,
      'event_registrations',
      seed.registrations as unknown as Array<Record<string, unknown>>,
    );
    replaceAnalytics(db, seed.analytics);
    writeSettings(db, seed.settings);
    db.prepare(`INSERT OR REPLACE INTO meta (key, value) VALUES ('seeded', '1')`).run();
  });
  tx();
}

function bootstrapIfNeeded(db: SqliteDatabase) {
  const seeded = db.prepare(`SELECT value FROM meta WHERE key = 'seeded'`).get() as { value: string } | undefined;
  if (seeded?.value === '1' && countRows(db, 'cms_items') > 0) return;
  if (countRows(db, 'cms_items') === 0) {
    seedDatabase(db, defaultCmsDb());
  } else {
    db.prepare(`INSERT OR REPLACE INTO meta (key, value) VALUES ('seeded', '1')`).run();
  }
}

export function readDb(): CmsDb {
  if (isProductionBuild()) {
    if (!globalThis.__brainstormBuildDb) {
      globalThis.__brainstormBuildDb = defaultCmsDb();
    }
    return globalThis.__brainstormBuildDb;
  }

  const db = getDb();
  const defaults = defaultCmsDb();
  const settingsRow = db.prepare(`SELECT data FROM settings WHERE id = 1`).get() as { data: string } | undefined;

  const cms: CmsDb = {
    projects: readCollection(db, 'projects'),
    events: readCollection(db, 'events'),
    news: readCollection(db, 'news'),
    team: readCollection(db, 'team'),
    reviews: readCollection(db, 'reviews'),
    reports: readCollection(db, 'reports'),
    gallery: readCollection(db, 'gallery').map((item) =>
      normalizeGalleryItem(item as Parameters<typeof normalizeGalleryItem>[0]),
    ),
    ticker: readCollection(db, 'ticker'),
    leads: readSimpleCollection<Lead>(db, 'leads'),
    registrations: readSimpleCollection<EventRegistration>(db, 'event_registrations'),
    roles: readSimpleCollection<AdminRole>(db, 'roles'),
    users: readSimpleCollection<AdminUser>(db, 'users'),
    analytics: readAnalytics(db),
    settings: settingsRow
      ? { ...defaults.settings, ...(JSON.parse(settingsRow.data) as SiteSettings) }
      : defaults.settings,
  };

  for (const key of CONTENT_COLLECTIONS) {
    if (!cms[key].length) {
      cms[key] = defaults[key] as never;
    }
  }
  if (!cms.roles.length) cms.roles = defaults.roles;
  if (!cms.users.length) cms.users = defaults.users;

  return cms;
}

export function writeDb(cms: CmsDb) {
  if (isProductionBuild()) {
    globalThis.__brainstormBuildDb = cms;
    return;
  }

  const db = getDb();
  const tx = db.transaction(() => {
    for (const collection of CONTENT_COLLECTIONS) {
      replaceCollection(db, collection, cms[collection] as unknown as Array<Record<string, unknown>>);
    }
    replaceSimpleCollection(db, 'roles', cms.roles as unknown as Array<Record<string, unknown>>);
    replaceSimpleCollection(db, 'users', cms.users as unknown as Array<Record<string, unknown>>);
    replaceSimpleCollection(db, 'leads', cms.leads as unknown as Array<Record<string, unknown>>);
    replaceSimpleCollection(
      db,
      'event_registrations',
      cms.registrations as unknown as Array<Record<string, unknown>>,
    );
    replaceAnalytics(db, cms.analytics);
    writeSettings(db, cms.settings);
    db.prepare(`INSERT OR REPLACE INTO meta (key, value) VALUES ('seeded', '1')`).run();
  });
  tx();
}

export function updateDb(mutator: (db: CmsDb) => void): CmsDb {
  const cms = readDb();
  mutator(cms);
  writeDb(cms);
  maintainCmsDatabase();
  return cms;
}

export type AdminSessionRecord = {
  token: string;
  userId: string;
  login: string;
  roleId: string;
  createdAt: string;
  expiresAt: string;
};

export function saveAdminSession(record: AdminSessionRecord) {
  if (isProductionBuild()) return;
  const db = getDb();
  db.prepare(
    `INSERT OR REPLACE INTO admin_sessions
      (token, user_id, login, role_id, created_at, expires_at)
     VALUES (@token, @user_id, @login, @role_id, @created_at, @expires_at)`,
  ).run({
    token: record.token,
    user_id: record.userId,
    login: record.login,
    role_id: record.roleId,
    created_at: record.createdAt,
    expires_at: record.expiresAt,
  });
}

export function loadAdminSession(token: string): AdminSessionRecord | null {
  if (isProductionBuild() || !token) return null;
  const db = getDb();
  const row = db
    .prepare(
      `SELECT token, user_id, login, role_id, created_at, expires_at
       FROM admin_sessions WHERE token = ?`,
    )
    .get(token) as
    | {
        token: string;
        user_id: string;
        login: string;
        role_id: string;
        created_at: string;
        expires_at: string;
      }
    | undefined;

  if (!row) return null;
  return {
    token: row.token,
    userId: row.user_id,
    login: row.login,
    roleId: row.role_id,
    createdAt: row.created_at,
    expiresAt: row.expires_at,
  };
}

export function deleteAdminSession(token: string | undefined) {
  if (isProductionBuild() || !token) return;
  const db = getDb();
  db.prepare(`DELETE FROM admin_sessions WHERE token = ?`).run(token);
}

export function purgeExpiredAdminSessions() {
  if (isProductionBuild()) return;
  const db = getDb();
  db.prepare(`DELETE FROM admin_sessions WHERE expires_at < ?`).run(new Date().toISOString());
}

export function uid(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function getCmsDataDir() {
  return DATA_DIR;
}

export function getUploadsDir() {
  const dir = path.join(DATA_DIR, 'uploads');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/** Periodic maintenance: analyze + WAL checkpoint (safe on idle). */
export function maintainCmsDatabase() {
  if (isProductionBuild()) return;
  const db = getDb();
  db.pragma('optimize');
  db.pragma('wal_checkpoint(PASSIVE)');
}

export function listUploadFiles(): string[] {
  const dir = getUploadsDir();
  return fs
    .readdirSync(dir)
    .filter((name) => !name.startsWith('.'))
    .sort((a, b) => b.localeCompare(a));
}

export type ContentCollectionKey = ContentCollection;

export function getCollectionItems<K extends ContentCollection>(db: CmsDb, key: K): CmsDb[K] {
  return db[key];
}

export function setCollectionItems<K extends ContentCollection>(db: CmsDb, key: K, items: CmsDb[K]) {
  db[key] = items;
}
