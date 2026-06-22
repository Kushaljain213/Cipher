import Database from "better-sqlite3";
import path from "node:path";
import { app } from "electron";
const db = new Database(path.join(app.getPath("userData"), "ryoku.db"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id                INTEGER PRIMARY KEY AUTOINCREMENT,
        title             TEXT NOT NULL,
        description       TEXT,
        priority          INTEGER NOT NULL DEFAULT 2,  -- 0=P0, 1=P1, 2=P2, 3=P3
        estimated_minutes INTEGER NOT NULL DEFAULT 25,
        created_at        TEXT NOT NULL DEFAULT (datetime('now')),
        completed         INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS focus_tasks (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id   INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
        date      TEXT NOT NULL DEFAULT (date('now')),
        completed INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS sessions (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id    INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
        start_time TEXT NOT NULL DEFAULT (datetime('now')),
        end_time   TEXT,
        completed  INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_focus_tasks_date ON focus_tasks(date);
    CREATE INDEX IF NOT EXISTS idx_sessions_task    ON sessions(task_id);
`);
export default db;
