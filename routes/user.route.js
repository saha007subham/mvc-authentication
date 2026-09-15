const express = require("express");
const {
  handleGetAllUsers,
  handleUserSignup,
  handleUserSignin,
  handleGetCurrentUser,
} = require("../controllers/user.controller");
const ensureAuthenticated = require("../middlewares/auth.middleware");

const router = express.Router();

// GET /users
router.get("/", ensureAuthenticated, handleGetAllUsers);

router.post("/sign-up", handleUserSignup);
router.post("/sign-in", handleUserSignin);

// GET /users/some [Nested Routes]:

module.exports = router;
