const Product = require("../models/Product");
const Sale = require("../models/Sale");

// GET REPORTS
exports.getReports = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const lowStockItems = await Product.find({ quantity: { $lt: 5 } }).countDocuments();

    const sales = await Sale.find();
    const totalSales = sales.length;
    const totalRevenue = sales.reduce((acc, sale) => acc + sale.totalPrice, 0);

    // Optional: top 5 selling products
    const productSalesMap = {};
    sales.forEach((sale) => {
      const id = sale.product.toString();
      if (!productSalesMap[id]) productSalesMap[id] = 0;
      productSalesMap[id] += sale.quantity;
    });

    const topSellingProducts = Object.entries(productSalesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    res.json({
      totalProducts,
      lowStockItems,
      totalSales,
      totalRevenue,
      topSellingProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
