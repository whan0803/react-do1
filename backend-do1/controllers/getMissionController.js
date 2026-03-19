const pool = require("../db/db")

exports.getMission = async() => {
    try {
        const result = await pool.query(`
                
            `);

    }catch(err) {
        console.error(err);
    }
}