const express = require("express");
const userRoutes = require("./users");
const guideRoutes = require("./guides");
const todoRoutes = require("./todos");
const authRoutes = require("./auth");

const router = express.Router();

router.use(userRoutes);
router.use(guideRoutes);
router.use(todoRoutes);
router.use(authRoutes);

module.exports = router;
