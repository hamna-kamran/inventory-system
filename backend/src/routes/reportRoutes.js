const express = require("express");
const router = express.Router();
const { getReports } = require("../controllers/reportController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Admin-only reports
router.get("/", auth, role("admin"), getReports);

module.exports = router;
