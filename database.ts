import * as SQLite from "expo-sqlite";
import { MenuItem } from "./app";

const db = SQLite.openDatabaseSync("little_lemon");

export async function createTable() {
  return db.runAsync(`CREATE TABLE IF NOT EXISTS littlelemon (name text, price text, description text, image text, category text)`);
}

export async function getMenuItems<T = any>(): Promise<T[]> {
  const items = await db.getAllAsync<T>("SELECT * FROM littlelemon");
  return items;
}

export async function saveMenuItems(menuItems: MenuItem[]): Promise<void> {
  try {
    // Build a single INSERT with multiple value placeholders
    const placeholders = menuItems.map(() => `(?, ?, ?, ?, ?)`).join(", ");
    const sql = `INSERT INTO littlelemon (name, price, description, image, category) VALUES ${placeholders};`;

    // Flatten all item values into one array
    const values = menuItems.flatMap((item) => [item.name, item.price, item.description, item.image, item.category]);

    // Run inside an async transaction
    await db.withTransactionAsync(async () => {
      await db.runAsync(sql, values);
    });
  } catch (error) {
    console.error("Error clearing menu items:", error);
  }
}

export async function filterByQueryAndCategories<T = any>(query: string, activeCategories: string[]): Promise<T[]> {
  try {
    const placeholders = activeCategories.map(() => "?").join(",");
    const sql = `SELECT * FROM littlelemon WHERE name LIKE ? AND category IN (${placeholders})`;
    const params = [`%${query}%`, ...activeCategories.map((cat) => cat.toLowerCase())];

    const results = await db.getAllAsync<T>(sql, params);
    return results;
  } catch (error) {
    console.error("Error filtering menu items:", error);
  }
  return [];
}

export async function clearMenuItems(): Promise<void> {
  await db.runAsync("DELETE FROM littlelemon");
}

export async function dropTable(): Promise<void> {
  await db.runAsync("DROP TABLE IF EXISTS littlelemon");
}
