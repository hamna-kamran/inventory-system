const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  updateStock,
} = require("../controllers/productController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// GET products (Admin + Staff)
router.get("/", auth, getProducts);

// Admin only
router.post("/", auth, role("admin"), createProduct);
router.put("/:id", auth, role("admin"), updateProduct);
router.delete("/:id", auth, role("admin"), deleteProduct);

// Staff: update stock
router.put("/update-stock", auth, role(["staff","admin"]), updateStock);


module.exports = router;
