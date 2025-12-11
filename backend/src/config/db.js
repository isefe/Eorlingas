// backend/src/config/db.js
const { Pool } = require("pg");
const path = require("path");

// .env dosyasını bulmaya çalış
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const connectionString = process.env.DATABASE_URL;

// Eğer veritabanı URL'si yoksa hata bas (CI ortamında bazen farklı olabilir, kontrol şart)
if (!connectionString) {
  console.error("🚨 HATA: DATABASE_URL bulunamadı!");
}

// AKILLI SSL AYARI:
// Eğer bağlantı 'localhost' ise (GitHub Actions veya Yerel Docker), SSL KAPALI olsun.
// Eğer bağlantı 'render.com' ise, SSL AÇIK olsun.
const isLocalhost = connectionString && connectionString.includes("localhost");

const pool = new Pool({
  connectionString: connectionString,
  ssl: isLocalhost ? false : { rejectUnauthorized: false }
});

pool.on("connect", () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log("✅ Veritabanına bağlandı");
  }
});

pool.on("error", (err) => {
  console.error("❌ Veritabanı bağlantı hatası:", err);
});

module.exports = pool;