const pool = require("../db/db");


exports.failMission = async(req, res) => {
    const {user_id, mission_id, failure_reason, failure_emotion} = req.body;

    try {
            const result = await pool.query(
              `
            insert into mission_record(user_id, mission_id, record_date, is_success, failure_emotion, failure_reason)
            values($1, $2, current_date, false, $3, $4) RETURNING *
        `,
              [
                user_id,
                mission_id,
                failure_emotion,
                failure_reason,
              ],
            );
        res.json(result.rows[0]);

    }catch(err) {
        console.error(err);
        res.status(500).json({message: "서버오류"})
    }

        
}