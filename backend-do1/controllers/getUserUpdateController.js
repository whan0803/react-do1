const pool = require("../db/db");
const bcrypt = require("bcrypt");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `SELECT user_id, user_name, user_email, user_birth FROM users WHERE user_id = $1`,
      [userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버오류" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { user_name, user_email, user_birth, user_password } = req.body;
    const userId = req.user.userId;

    if (!user_name || !user_email || !user_birth) {
      return res.status(400).json({ message: "이름, 이메일, 생년월일을 입력해주세요" });
    }

    const dup = await pool.query(
      `SELECT user_id FROM users WHERE user_email = $1 AND user_id <> $2`,
      [user_email, userId],
    );
    if (dup.rows.length > 0) {
      return res.status(400).json({ message: "이미 사용 중인 이메일입니다" });
    }

    const pwd = user_password != null ? String(user_password).trim() : "";

    if (pwd !== "") {
      const hash = await bcrypt.hash(pwd, 10);
      await pool.query(
        `UPDATE users
         SET user_name = $1, user_email = $2, user_birth = $3, user_password = $4
         WHERE user_id = $5`,
        [user_name, user_email, user_birth, hash, userId],
      );
    } else {
      await pool.query(
        `UPDATE users
         SET user_name = $1, user_email = $2, user_birth = $3
         WHERE user_id = $4`,
        [user_name, user_email, user_birth, userId],
      );
    }

    const updated = await pool.query(
      `SELECT user_id, user_name, user_email, user_birth FROM users WHERE user_id = $1`,
      [userId],
    );

    res.json({
      message: "프로필이 수정되었습니다",
      user: updated.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "서버오류" });
  }
};
