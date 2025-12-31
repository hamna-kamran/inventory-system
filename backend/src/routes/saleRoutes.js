const express = require("express");
const router = express.Router();

const {
  createSale,
  getSales,
  getMySales,
  deleteSale,
} = require("../controllers/saleController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// ✅ STAFF + ADMIN → CREATE SALE
router.post("/", auth, createSale);

// 🔒 ADMIN ONLY
router.get("/", auth, role("admin"), getSales);
router.delete("/:id", auth, role("admin"), deleteSale);

// 👤 STAFF ONLY → MY SALES
router.get("/my", auth, role("staff"), getMySales);

module.exports = router;
