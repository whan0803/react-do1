const pool = require("../db/db");

exports.successMission = async (req, res) => {
  const { user_id, mission_id } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO mission_record(user_id, mission_id, record_date, is_success)
      VALUES($1, $2, (current_timestamp AT TIME ZONE 'Asia/Seoul')::date, true)
      RETURNING *
      `,
      [user_id, mission_id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버오류" });
  }
};
