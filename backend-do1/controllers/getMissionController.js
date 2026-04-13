const pool = require("../db/db");

exports.getMission = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT mission_id, mission_content
      FROM mission_table
      OFFSET floor(random() * GREATEST((SELECT COUNT(*) FROM mission_table), 1))
      LIMIT 1;
    `,
    );

    const mission = result.rows[0];

    if (!mission) {
      return res.status(404).json({ message: "미션이 없습니다" });
    }

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
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT is_success
      FROM mission_record
      WHERE user_id = $1
      AND record_date = (current_timestamp AT TIME ZONE 'Asia/Seoul')::date
      ORDER BY record_id DESC
      LIMIT 1;
      `,
      [userId],
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
    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT COUNT(*)::int AS mission_days
      FROM (
        SELECT record_date
        FROM mission_record
        WHERE user_id = $1
        GROUP BY record_date
      ) AS grouped_dates;
      `,
      [userId],
    );

    const mission_days = result.rows[0]?.mission_days ?? 0;
    res.json({ mission_days });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버오류" });
  }
};
