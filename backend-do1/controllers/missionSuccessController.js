const pool = require("../db/db");

exports.successMission = async (req, res) => {
  const { mission_id } = req.body;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      `
      INSERT INTO mission_record(user_id, mission_id, record_date, is_success)
      VALUES($1, $2, (current_timestamp AT TIME ZONE 'Asia/Seoul')::date, true)
      ON CONFLICT (user_id, record_date)
      DO UPDATE SET
        mission_id = EXCLUDED.mission_id,
        is_success = true,
        failure_emotion = NULL,
        failure_reason = NULL
      RETURNING *
      `,
      [userId, mission_id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버오류" });
  }
};
