const express = require("express");
const router = express.Router();
const {
  createSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// ADMIN ONLY ROUTES
router.post("/", auth, role("admin"), createSupplier);
router.get("/", auth, role("admin"), getSuppliers);
router.put("/:id", auth, role("admin"), updateSupplier);
router.delete("/:id", auth, role("admin"), deleteSupplier);

module.exports = router;
