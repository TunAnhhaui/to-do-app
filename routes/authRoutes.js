const AuthController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

module.exports = router;
