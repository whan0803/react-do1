const pool = require("../db/db");

exports.failMission = async (req, res) => {
  const { mission_id, failure_reason, failure_emotion } = req.body;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      `
      INSERT INTO mission_record(user_id, mission_id, record_date, is_success, failure_emotion, failure_reason)
      VALUES($1, $2, (current_timestamp AT TIME ZONE 'Asia/Seoul')::date, false, $3, $4)
      ON CONFLICT (user_id, record_date)
      DO UPDATE SET
        mission_id = EXCLUDED.mission_id,
        is_success = false,
        failure_emotion = EXCLUDED.failure_emotion,
        failure_reason = EXCLUDED.failure_reason
      RETURNING *
      `,
      [userId, mission_id, failure_emotion, failure_reason],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버오류" });
  }
};
