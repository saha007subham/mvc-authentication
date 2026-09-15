const jwt = require("jsonwebtoken");

const JWT_SECRET = "@Subham$";

function signToken(payload) {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}

function verifyToken(token) {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    return null;
  }
}

module.exports = {
  signToken,
  verifyToken,
};
