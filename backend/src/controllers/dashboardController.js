const Product = require("../models/Product");
const Sale = require("../models/Sale");

/* ================= ADMIN DASHBOARD ================= */
exports.getAdminStats = async (req, res) => {
  try {
    const lowStock = await Product.find({ quantity: { $lt: 5 } })
      .select("name category quantity")
      .limit(5);

    const recentSales = await Sale.find()
      .populate("product", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name category quantity");

    res.json({
      lowStock,
      recentSales,
      recentProducts,
    });
  } catch (err) {
    res.status(500).json({ message: "Admin dashboard error" });
  }
};

/* ================= STAFF DASHBOARD ================= */
exports.getStaffStats = async (req, res) => {
  try {
    const lowStock = await Product.find({ quantity: { $lt: 5 } })
      .sort({ quantity: 1 });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const recentSales = await Sale.find({
      soldAt: { $gte: today, $lt: tomorrow }
    })
      .populate("product", "name")
      .sort({ soldAt: -1 });

    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name category quantity");

    res.json({
      lowStock,
      recentSales,
      recentProducts
    });
  } catch (err) {
    res.status(500).json({ message: "Staff dashboard error" });
  }
};
