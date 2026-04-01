require("dotenv").config();
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const poolConfig = { connectionString };

const isRemoteDb =
  connectionString &&
  !/localhost|127\.0\.0\.1/.test(connectionString);

if (isRemoteDb && (process.env.VERCEL === "1" || process.env.NODE_ENV === "production")) {
  poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

module.exports = pool;
