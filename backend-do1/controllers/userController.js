const pool = require("../db/db");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/jwt");

exports.createUser = async (req, res) => {
  try {
    const { user_name, user_email, user_password, user_birth } = req.body;

    // 이메일 중복 체크와 해시를 병렬 처리
    const [existing, hashPassword] = await Promise.all([
      pool.query(`SELECT user_id FROM users WHERE user_email = $1`, [
        user_email,
      ]),
      bcrypt.hash(user_password, 10),
    ]);

    if (existing.rows.length > 0) {
      return res.status(409).json({ message: "이미 사용 중인 이메일입니다" });
    }

    await pool.query(
      `INSERT INTO users(user_name, user_email, user_password, user_birth)
             VALUES($1, $2, $3, $4)`,
      [user_name, user_email, hashPassword, user_birth],
    );

    res.json({ message: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    // select * 대신 필요한 컬럼만 조회
    const result = await pool.query(
      `SELECT user_id, user_name, user_password
             FROM users
             WHERE user_email = $1`,
      [user_email],
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "이메일이 존재하지 않습니다" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(user_password, user.user_password);

    if (!isMatch) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다" });
    }

    const accessToken = createAccessToken({ userId: user.user_id });

    res.json({
      accessToken,
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버 오류" });
  }
};
