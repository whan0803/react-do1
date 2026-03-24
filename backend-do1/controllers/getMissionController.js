const pool = require("../db/db");

exports.getMission = async (req, res) => {
  const userId = req.user.user_id; // 🔥 로그인 기준 (중요)

  try {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const existing = await client.query(
        `
        SELECT m.mission_id, m.mission_content
        FROM mission_record mr
        JOIN mission_table m ON mr.mission_id = m.mission_id
        WHERE mr.user_id = $1
          AND mr.record_date = CURRENT_DATE
        LIMIT 1
      `,
        [userId],
      );

      if (existing.rows.length > 0) {
        await client.query("COMMIT");
        return res.json({
          mission_id: existing.rows[0].mission_id,
          mission_content: existing.rows[0].mission_content,
        });
      }

      // 같은 유저의 "오늘" 미션 생성은 동시에 1개만 허용 (새로고침/StrictMode 중복 방지)
      await client.query(
        `SELECT pg_advisory_xact_lock(hashtext($1))`,
        [`getMission:${userId}:${new Date().toISOString().slice(0, 10)}`],
      );

      // 락 잡은 뒤 다시 한번 확인 (레이스 컨디션 방지)
      const existingAfterLock = await client.query(
        `
        SELECT m.mission_id, m.mission_content
        FROM mission_record mr
        JOIN mission_table m ON mr.mission_id = m.mission_id
        WHERE mr.user_id = $1
          AND mr.record_date = CURRENT_DATE
        LIMIT 1
      `,
        [userId],
      );

      if (existingAfterLock.rows.length > 0) {
        await client.query("COMMIT");
        return res.json({
          mission_id: existingAfterLock.rows[0].mission_id,
          mission_content: existingAfterLock.rows[0].mission_content,
        });
      }

      const mission = await client.query(
        `
        SELECT mission_id, mission_content
        FROM mission_table
        ORDER BY RANDOM()
        LIMIT 1
      `,
      );

      const selected = mission.rows[0];

      await client.query(
        `
        INSERT INTO mission_record (
          user_id,
          mission_id,
          record_date,
          is_success
        ) VALUES ($1, $2, CURRENT_DATE, false)
      `,
        [userId, selected.mission_id],
      );

      await client.query("COMMIT");
      res.json({
        mission_id: selected.mission_id,
        mission_content: selected.mission_content,
      });
    } catch (err) {
      try {
        await client.query("ROLLBACK");
      } catch (_) {
        // ignore rollback errors
      }
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};
