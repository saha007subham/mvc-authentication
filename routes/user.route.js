const express = require("express");
const {
  handleGetAllUsers,
  handleUserSignup,
  handleUserSignin,
  handleGetCurrentUser,
} = require("../controllers/user.controller");
const ensureAuthenticated = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", ensureAuthenticated, handleGetAllUsers);
router.get("/me", ensureAuthenticated, handleGetCurrentUser);

router.post("/sign-up", handleUserSignup);
router.post("/sign-in", handleUserSignin);

module.exports = router;
