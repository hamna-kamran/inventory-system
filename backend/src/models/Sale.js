const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  soldAt: { type: Date, default: Date.now },
  customerName: { type: String },
  staff: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // new
});


module.exports = mongoose.model("Sale", saleSchema);
