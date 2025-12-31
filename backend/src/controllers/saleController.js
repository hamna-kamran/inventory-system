const Sale = require("../models/Sale");
const Product = require("../models/Product");

// CREATE SALE (Admin + Staff)
const createSale = async (req, res) => {
  try {
    const { product, quantity, customerName } = req.body;

    const prod = await Product.findById(product);
    if (!prod) return res.status(404).json({ message: "Product not found" });

    if (prod.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    const totalPrice = prod.price * quantity;
    prod.quantity -= quantity;
    await prod.save();

    const sale = await Sale.create({
      product,
      quantity,
      totalPrice,
      customerName,
      staff: req.user.id, // works for staff
    });

    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ADMIN: GET ALL SALES
const getSales = async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate("product")
      .sort({ soldAt: -1 });

    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// STAFF: GET MY SALES
const getMySales = async (req, res) => {
  try {
    const sales = await Sale.find({ staff: req.user.id })
      .populate("product", "name price")
      .sort({ soldAt: -1 });

    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE SALE (Admin)
const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });

    const prod = await Product.findById(sale.product);
    if (prod) {
      prod.quantity += sale.quantity;
      await prod.save();
    }

    await Sale.findByIdAndDelete(req.params.id);
    res.json({ message: "Sale deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createSale,
  getSales,
  getMySales,
  deleteSale,
};
