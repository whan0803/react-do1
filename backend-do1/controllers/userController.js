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

exports.loginUser = async(req, res) => {
    try {
        const { user_email, user_password } = req.body;

        const result = await pool.query(`select * from users where user_email = $1`,[user_email]);

        if(result.rows.length === 0) {
            return res.status(400).json({message: "이메일이 존재하지 않습니다"});
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(user_password, user.user_password);

        if(!isMatch) {
            return res.status(401).json({message: "비밀번호가 일치하지 않습니다"});
        }

        res.json({
            user_id: user.user_id,
            user_name: user.user_name
        })
    }catch(err) {
        console.error(err);
        res.status(500).json({message: "서버오류"})
    }
}