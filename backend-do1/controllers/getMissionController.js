const pool = require("../db/db");

exports.getMission = async (req, res) => {
  try {
    const { user_id } = req.body;

    const result = await pool.query(
      `
      SELECT mission_id, mission_content 
      FROM mission_table, users 
        WHERE user_id = $1
      ORDER BY random() 
      LIMIT 1;
    `,
      [user_id],
    );

    const mission = result.rows[0];

    res.json({
      message: "미션 가져오기 성공",
      mission_id: mission.mission_id,
      mission_content: mission.mission_content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버오류" });
  }
};

exports.getTodayMissionResult = async (req, res) => {
  try {
    const { user_id } = req.body;

    const result = await pool.query(
      `
      SELECT is_success
      FROM mission_record
      WHERE user_id = $1
      AND record_date = (current_timestamp AT TIME ZONE 'Asia/Seoul')::date
      ORDER BY record_id DESC
      LIMIT 1;
      `,
      [user_id],
    );

    if (result.rows.length === 0) {
      return res.json({ missionResult: null });
    }

    return res.json({
      missionResult: result.rows[0].is_success ? "success" : "fail",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버오류" });
  }
};

exports.getMissionDayCount = async (req, res) => {
  try {
    const { user_id } = req.body;

    const result = await pool.query(
      `
      SELECT COUNT(DISTINCT record_date)::int AS mission_days
      FROM mission_record
      WHERE user_id = $1;
      `,
      [user_id],
    );

    const mission_days = result.rows[0]?.mission_days ?? 0;
    res.json({ mission_days });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버오류" });
  }
};
