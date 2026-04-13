const { verifyAccessToken } = require("../utils/jwt");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "인증 토큰이 필요합니다" });
    }

    const token = authHeader.slice("Bearer ".length).trim();
    const payload = verifyAccessToken(token);

    req.user = {
      userId: Number(payload.sub),
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message || "인증에 실패했습니다" });
  }
};

module.exports = authMiddleware;
