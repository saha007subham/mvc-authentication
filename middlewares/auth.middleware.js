const { verifyToken } = require("../lib/auth.lib");

function ensureAuthenticated(req, res, next) {
  const header = req.headers.authorization;

  if (!header || typeof header !== "string") {
    return res
      .status(401)
      .json({ error: "Please authenticate to access this resource" });
  }

  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ error: "Please authenticate to access this resource" });
  }

  const payload = verifyToken(token);

  if (!payload) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = payload;

  return next();
}

module.exports = ensureAuthenticated;
