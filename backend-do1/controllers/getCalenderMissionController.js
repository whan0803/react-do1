const pool = require("../db/db");

exports.getCalenderMission = async (req, res) => {
  try {
    const { user_id } = req.body;

    const data = await pool.query(
      `
            SELECT mt.mission_content, mr.is_success, to_char(mr.record_date, 'yyyy-mm-dd')
            FROM mission_record mr
            JOIN mission_table mt 
            ON mr.mission_id = mt.mission_id
            WHERE mr.user_id = $1;
            `,
      [user_id],
    );

    const mission = data.rows;

    res.json(mission);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "오류" });
  }
};
