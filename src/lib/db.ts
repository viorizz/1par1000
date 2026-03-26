import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "initiative.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    const fs = require("fs");
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
    migrate(_db);
  }
  return _db;
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS demandes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      canton TEXT NOT NULL,
      commune TEXT NOT NULL,
      npa TEXT NOT NULL,
      nom TEXT NOT NULL,
      email TEXT NOT NULL,
      langue TEXT NOT NULL DEFAULT 'fr',
      statut TEXT NOT NULL DEFAULT 'nouvelle',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS benevoles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      email TEXT NOT NULL,
      commune TEXT NOT NULL,
      canton TEXT NOT NULL,
      type_engagement TEXT NOT NULL,
      message TEXT,
      statut TEXT NOT NULL DEFAULT 'nouveau',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin_sessions (
      token TEXT PRIMARY KEY,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}
