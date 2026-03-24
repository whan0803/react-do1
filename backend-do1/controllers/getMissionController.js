const pool = require("../db/db")

exports.getMission = async (req, res) => {
  try {
    const result = await pool.query(`
      select mission_id, mission_content 
      from mission_table 
      order by random() 
      limit 1;
    `);

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