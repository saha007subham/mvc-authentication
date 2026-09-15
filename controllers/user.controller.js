const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user.model");
const {
  userSignupValidationSchema,
  userSigninSchema,
} = require("../lib/validators/user.validator");
const { signToken } = require("../lib/auth.lib");

exports.handleGetAllUsers = async function (req, res) {
  const users = await User.find({});
  return res.json({ users });
};

exports.handleUserSignup = async function (req, res) {
  const validationResult = await userSignupValidationSchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  const { firstname, lastname, email, password } = validationResult.data;

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHmac("sha256", salt).update(password).digest("hex");

  try {
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hash,
      salt,
    });

    const token = signToken({ id: user._id, role: user.role ?? "user" });

    return res.status(201).json({ data: { id: user._id, token } });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email is already taken" });
    }
    return res.status(500).json({ error: "Internal server error." });
  }
};

exports.handleUserSignin = async function (req, res) {
  const validationResult = await userSigninSchema.safeParseAsync(req.body);

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  const { email, password } = validationResult.data;

  const userInDB = await User.findOne({ email });

  if (!userInDB) {
    return res.status(404).json({ error: "Email does not exists" });
  }

  const hash = crypto
    .createHmac("sha256", userInDB.salt)
    .update(password)
    .digest("hex");

  if (hash !== userInDB.password)
    return res.status(400).json({ error: "Incorrect Password" });

  const token = signToken({ id: userInDB._id, role: userInDB.role ?? "user" });

  return res.json({
    message: `Success in Sign in for ${userInDB.firstname}`,
    token,
  });
};
