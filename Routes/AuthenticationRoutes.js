const express = require("express");
const { Login, Signup, Logout } = require("../Controllers/Authentication/UserController");
const router = express.Router();
router.route("/login").post(Login);
router.route("/register").post(Signup);
router.route("/logout").get(Logout);
module.exports = router;