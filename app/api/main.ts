import { createClient } from "@libsql/client";

// Ініціалізація клієнта Turso
// Переконайся, що додав TURSO_DATABASE_URL та TURSO_AUTH_TOKEN у свій .env.local
export const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

// --- Функції для масового вставлення (заміна db.transaction) ---

export async function insertManyPlaces(places: {
  name: string;
  describe?: string;
  eventDates?: string[];
  pos?: { lat: number; lng: number };
}[]) {
  const statements = places.map((place) => ({
    sql: `INSERT INTO places (name, describe, pos, event_dates) VALUES (?, ?, ?, ?)`,
    args: [
      place.name,
      place.describe ?? null,
      JSON.stringify(place.pos ?? { lat: 0, lng: 0 }),
      JSON.stringify(place.eventDates ?? [])
    ],
  }));

  return await db.batch(statements, "write");
}

export async function insertManyRecyclingPoints(points: {
  name: string;
  pos?: { lat: number; lng: number };
}[]) {
  const statements = points.map((point) => ({
    sql: `INSERT INTO rerecyclingPoint (name, pos) VALUES (?, ?)`,
    args: [
      point.name,
      JSON.stringify(point.pos ?? { lat: 0, lng: 0 })
    ],
  }));

  return await db.batch(statements, "write");
}

export async function insertManyProducts(items: {
  name: string;
  describe?: string;
  price: number;
}[]) {
  const statements = items.map((item) => ({
    sql: `INSERT INTO products (name, describe, price) VALUES (?, ?, ?)`,
    args: [item.name, item.describe ?? null, item.price],
  }));

  return await db.batch(statements, "write");
}

// --- Функція ініціалізації, очищення та наповнення БД (Seed) ---
// ВАЖЛИВО: Оскільки в Next.js цей файл може імпортуватися багато разів, 
// очищення БД автоматично запускати не можна. Виклич цю функцію один раз, або загорни в перевірку.
export async function initAndSeedDatabase() {
  try {
    console.log("=== Ініціалізація таблиць ===");
    
    // Створення таблиць
    await db.execute(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        describe TEXT,
        pos TEXT NOT NULL,
        event_dates TEXT NOT NULL
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS rerecyclingPoint (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        pos TEXT NOT NULL
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        describe TEXT,
        price REAL NOT NULL
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        contact_username TEXT NOT NULL,
        sum REAL NOT NULL,
        products TEXT NOT NULL
      );
    `);

    console.log("=== Очищення старих даних (Reset) ===");
    
    // Пакетне очищення (Reset) через batch для швидкості
    await db.batch([
      "DELETE FROM places;",
      "DELETE FROM sqlite_sequence WHERE name='places';",
      "DELETE FROM rerecyclingPoint;",
      "DELETE FROM sqlite_sequence WHERE name='rerecyclingPoint';",
      "DELETE FROM products;",
      "DELETE FROM sqlite_sequence WHERE name='products';"
    ], "write");

    console.log("=== Наповнення бази даних (Seed) ===");

    // Запуск твоїх транзакцій на додавання даних
    await insertManyProducts([
      { name: "Еко-сумка", describe: "Багаторазова сумка з перероблених матеріалів", price: 150 },
      { name: "Бамбукова зубна щітка", describe: "Біорозкладувана щітка з бамбуку", price: 85 },
      { name: "Металева пляшка", describe: "Пляшка для води з нержавіючої сталі", price: 320 },
    ]);

    await insertManyPlaces([
      {
        name: "school 12",
        describe: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        eventDates: [new Date().toISOString().split('T')[0]],
        pos: { lat: 49.0674, lng: 33.4111 }
      }
    ]);

    await insertManyRecyclingPoints([
      { name: "Пункт переробки №1", pos: { lat: 49.0674, lng: 33.4111 } },
      { name: "Пункт переробки №2", pos: { lat: 49.0712, lng: 33.4205 } },
    ]);

    console.log("=== БД успішно налаштована та наповнена! ===");
  } catch (error) {
    console.error("Помилка під час ініціалізації БД:", error);
  }
}