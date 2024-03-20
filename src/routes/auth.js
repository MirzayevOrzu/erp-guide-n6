const express = require("express");
const { loginPage, login, logout } = require("../controllers/auth");
const validate = require("../shared/middlewares/validate");
const { loginSchema } = require("../schemas/auth");

const router = express.Router();

router.get("/login", loginPage);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

module.exports = router;
