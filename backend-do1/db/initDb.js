const pool = require("./db");

let initPromise;

const ensureIndexes = async () => {
  await pool.query(`
    ALTER TABLE mission_record
    DROP CONSTRAINT IF EXISTS mission_record_mission_id_user_id_key
  `);

  await pool.query(`
    ALTER TABLE mission_record
    ADD CONSTRAINT mission_record_user_id_record_date_key
    UNIQUE (user_id, record_date)
  `).catch((err) => {
    if (err.code !== "42710" && err.code !== "42P07") {
      throw err;
    }
  });

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_users_email
    ON users(user_email)
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_mission_record_user_date_record
    ON mission_record(user_id, record_date DESC, record_id DESC)
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_mission_record_user_record_date
    ON mission_record(user_id, record_date)
  `);
};

const initDb = async () => {
  if (!initPromise) {
    initPromise = ensureIndexes().catch((err) => {
      initPromise = null;
      throw err;
    });
  }

  return initPromise;
};

module.exports = { initDb };
