const Product = require("../models/Product");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET PRODUCTS (Admin + Staff)
const getProducts = async (req, res) => {
  try {
    const search = req.query.search || "";
    const products = await Product.find({
      name: { $regex: search, $options: "i" },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PRODUCT (Admin)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE PRODUCT (Admin)
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ UPDATE STOCK (Staff)
const updateStock = async (req, res) => {
  try {
    const { productId, quantity, action } = req.body;

    if (!productId || !quantity || !action) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (action === "add") {
      product.quantity += Number(quantity);
    } else if (action === "reduce") {
      if (product.quantity < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }
      product.quantity -= Number(quantity);
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await product.save();

    res.json({
      message: "Stock updated successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ EXPORTS (ONLY ONE EXPORT BLOCK)
module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  updateStock,
};
