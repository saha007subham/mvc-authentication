const { verifyToken } = require("../lib/auth.lib");

function ensureAuthenticated(req, res, next) {
  const header = equal.headers.authorization;

  if (!header) {
    return res
      .status(401)
      .json({ error: "Please authenticate to access this resource" });
  }

  const token = header.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate to access this resource" });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = payload;

  next();
}

module.exports = ensureAuthenticated;
