const express = require("express");
const router = express.Router();

const { getUserDashboard } = require("../controllers/dashboard");

router.get("/", getUserDashboard);

module.exports = router;
