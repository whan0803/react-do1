const pool = require("../db/db");

exports.missionList = async (req, res) => {
  const { user_id } = req.body;

  try {
    const result = await pool.query(
      `
            SELECT mt.mission_content, mr.is_success
            FROM mission_record mr
            JOIN mission_table mt 
            ON mr.mission_id = mt.mission_id
            WHERE mr.user_id = $1;
            `,
      [user_id],
    );
    const mission = result.rows;

    res.json(mission);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "" });
  }
};
