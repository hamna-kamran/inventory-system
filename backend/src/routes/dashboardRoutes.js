const express = require("express");
const router = express.Router();

const {
  getAdminStats,
  getStaffStats
} = require("../controllers/dashboardController");

const auth = require("../middleware/authMiddleware");

router.get("/admin", auth, getAdminStats);
router.get("/staff", auth, getStaffStats);

module.exports = router;
