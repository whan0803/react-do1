const crypto = require("crypto");

const DEFAULT_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7;

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET 환경변수가 필요합니다");
  }
  return secret;
};

const base64UrlEncode = (value) =>
  Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const base64UrlDecode = (value) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(normalized + padding, "base64").toString("utf8");
};

const signPayload = (payload) => {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac("sha256", getJwtSecret())
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${data}.${signature}`;
};

const createAccessToken = ({ userId }) => {
  const nowSeconds = Math.floor(Date.now() / 1000);
  return signPayload({
    sub: String(userId),
    iat: nowSeconds,
    exp: nowSeconds + DEFAULT_EXPIRES_IN_SECONDS,
  });
};

const verifyAccessToken = (token) => {
  const [encodedHeader, encodedPayload, signature] = String(token || "").split(".");
  if (!encodedHeader || !encodedPayload || !signature) {
    throw new Error("유효하지 않은 토큰 형식입니다");
  }

  const expectedSignature = crypto
    .createHmac("sha256", getJwtSecret())
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const actualSignatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (
    actualSignatureBuffer.length !== expectedSignatureBuffer.length ||
    !crypto.timingSafeEqual(actualSignatureBuffer, expectedSignatureBuffer)
  ) {
    throw new Error("토큰 서명이 올바르지 않습니다");
  }

  const payload = JSON.parse(base64UrlDecode(encodedPayload));

  if (!payload?.sub) {
    throw new Error("토큰 payload가 올바르지 않습니다");
  }

  if (payload.exp && Math.floor(Date.now() / 1000) >= payload.exp) {
    throw new Error("토큰이 만료되었습니다");
  }

  return payload;
};

module.exports = {
  createAccessToken,
  verifyAccessToken,
};
