const express = require("express");
const {
  handleGetAllUsers,
  handleUserSignup,
  handleUserSignin,
  handleGetCurrentUser,
} = require("../controllers/user.controller");

const router = express.Router();

// GET /users
router.get("/", handleGetAllUsers);

router.post("/sign-up", handleUserSignup);
router.post("/sign-in", handleUserSignin);

// GET /users/some [Nested Routes]:

module.exports = router;
