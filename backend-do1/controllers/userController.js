const pool = require("../db/db");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
    try{
            const { user_name, user_email, user_password, user_birth } = req.body;

            const hashPassword = await bcrypt.hash(user_password, 10);

            const result = await pool.query(
                `insert into users(user_name, user_email, user_password, user_birth) values($1, $2, $3, $4)`,
                [user_name, user_email, hashPassword, user_birth],
            );

            res.json({ message: "success" });
    }catch(err) {
        console.error(err);
        res.json({message: "server error"});
    }
}