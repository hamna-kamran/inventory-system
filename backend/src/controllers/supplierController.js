const Supplier = require("../models/Supplier");

// CREATE SUPPLIER
exports.createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL SUPPLIERS
exports.getSuppliers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const suppliers = await Supplier.find({
      name: { $regex: search, $options: "i" },
    });
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE SUPPLIER
exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(supplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE SUPPLIER
exports.deleteSupplier = async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: "Supplier deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
