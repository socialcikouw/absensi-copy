import * as SQLite from "expo-sqlite";

// ========================================
// DATABASE CONFIGURATION
// ========================================

const DATABASE_NAME = "absensi.db";
let database: SQLite.SQLiteDatabase | null = null;

// ========================================
// SCHEMA FACTORY
// ========================================

/**
 * Base schema untuk semua drop tables
 */
const createBaseDropSchema = (
  tableName: string,
  pinjamanRequired: boolean = true
) => `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id TEXT PRIMARY KEY,
    profile_id TEXT NOT NULL,
    foto TEXT,
    nama TEXT NOT NULL,
    alamat TEXT NOT NULL,
    pinjaman REAL${pinjamanRequired ? " NOT NULL" : ""},
    saldo REAL,
    angsuran REAL,
    tabungan REAL,
    created_at TEXT NOT NULL,
    updated_at TEXT,
    synced INTEGER DEFAULT 0
  )
`;

/**
 * Schema untuk sync queue
 */
const createSyncQueueSchema = () => `
  CREATE TABLE IF NOT EXISTS sync_queue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name TEXT NOT NULL,
    operation TEXT NOT NULL,
    data TEXT NOT NULL,
    created_at TEXT NOT NULL
  )
`;

// ========================================
// DATABASE INITIALIZATION
// ========================================

export const initDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (database) {
    return database;
  }

  try {
    database = await SQLite.openDatabaseAsync(DATABASE_NAME);

    // Drop existing tables to ensure correct schema
    await dropTables();

    // Create tables if they don't exist
    await createTables();

    console.log("Database initialized successfully");
    return database;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
};

// Drop tables
const dropTables = async () => {
  if (!database) {
    throw new Error("Database not initialized");
  }

  const tables = [
    "DROP TABLE IF EXISTS drop_baru_harian",
    "DROP TABLE IF EXISTS drop_lama_harian",
    "DROP TABLE IF EXISTS sync_queue",
  ];

  for (const table of tables) {
    await database.execAsync(table);
  }
};

// Create tables
const createTables = async () => {
  if (!database) {
    throw new Error("Database not initialized");
  }

  const schemas = [
    // Drop Baru Harian table (pinjaman required)
    createBaseDropSchema("drop_baru_harian", true),

    // Drop Lama Harian table (pinjaman optional)
    createBaseDropSchema("drop_lama_harian", false),

    // Sync queue table untuk offline operations
    createSyncQueueSchema(),
  ];

  for (const schema of schemas) {
    await database.execAsync(schema);
  }
};

// ========================================
// GENERIC DATABASE OPERATIONS
// ========================================

/**
 * Generic database operations dengan error handling
 */
export const dbOperations = {
  // Insert data
  async insert(table: string, data: any): Promise<void> {
    if (!database) {
      throw new Error("Database not initialized");
    }

    // Filter out undefined values to avoid SQL errors
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    const columns = Object.keys(filteredData);
    const values = Object.values(filteredData);
    const placeholders = columns.map(() => "?").join(", ");

    const query = `INSERT OR REPLACE INTO ${table} (${columns.join(
      ", "
    )}) VALUES (${placeholders})`;

    await database.runAsync(query, values as SQLite.SQLiteBindValue[]);
  },

  // Update data
  async update(table: string, id: string, data: any): Promise<void> {
    if (!database) {
      throw new Error("Database not initialized");
    }

    const setClause = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(data), id];

    const query = `UPDATE ${table} SET ${setClause} WHERE id = ?`;

    await database.runAsync(query, values as SQLite.SQLiteBindValue[]);
  },

  // Delete data
  async delete(table: string, id: string): Promise<void> {
    if (!database) {
      throw new Error("Database not initialized");
    }

    const query = `DELETE FROM ${table} WHERE id = ?`;
    await database.runAsync(query, [id]);
  },

  // Get all data
  async getAll(table: string): Promise<any[]> {
    if (!database) {
      throw new Error("Database not initialized");
    }

    const query = `SELECT * FROM ${table} ORDER BY created_at DESC`;
    const result = await database.getAllAsync(query);
    return result;
  },

  // Get by ID
  async getById(table: string, id: string): Promise<any | null> {
    if (!database) {
      throw new Error("Database not initialized");
    }

    const query = `SELECT * FROM ${table} WHERE id = ?`;
    const result = await database.getFirstAsync(query, [id]);
    return result;
  },

  // Get unsynced data
  async getUnsynced(table: string): Promise<any[]> {
    if (!database) {
      throw new Error("Database not initialized");
    }

    const query = `SELECT * FROM ${table} WHERE synced = 0`;
    const result = await database.getAllAsync(query);
    return result;
  },

  // Mark as synced
  async markAsSynced(table: string, id: string): Promise<void> {
    if (!database) {
      throw new Error("Database not initialized");
    }

    const query = `UPDATE ${table} SET synced = 1 WHERE id = ?`;
    await database.runAsync(query, [id]);
  },
};

// ========================================
// SYNC QUEUE OPERATIONS
// ========================================

export const syncQueue = {
  // Add operation to sync queue
  async add(
    table: string,
    operation: "INSERT" | "UPDATE" | "DELETE",
    data: any
  ): Promise<void> {
    if (!database) {
      throw new Error("Database not initialized");
    }

    const query = `INSERT INTO sync_queue (table_name, operation, data, created_at) VALUES (?, ?, ?, ?)`;
    await database.runAsync(query, [
      table,
      operation,
      JSON.stringify(data),
      new Date().toISOString(),
    ]);
  },

  // Get pending sync operations
  async getPending(): Promise<any[]> {
    if (!database) {
      throw new Error("Database not initialized");
    }

    const query = `SELECT * FROM sync_queue ORDER BY created_at ASC`;
    const result = await database.getAllAsync(query);
    return result;
  },

  // Remove completed sync operation
  async remove(id: number): Promise<void> {
    if (!database) {
      throw new Error("Database not initialized");
    }

    const query = `DELETE FROM sync_queue WHERE id = ?`;
    await database.runAsync(query, [id]);
  },
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Export database instance getter
export const getDatabase = (): SQLite.SQLiteDatabase => {
  if (!database) {
    throw new Error("Database not initialized. Call initDatabase() first.");
  }
  return database;
};
