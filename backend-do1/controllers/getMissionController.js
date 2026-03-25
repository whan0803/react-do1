const pool = require("../db/db")

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