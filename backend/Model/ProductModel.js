const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ["Medicine", "Equipment", "Consumable", "Protective Gear", "Other"] },
  quantity: { type: Number, required: true, min: 0 },
  supplier: { type: String, required: true },
  purchaseDate: { type: Date, required: true, default: Date.now },
  expiryDate: { type: Date, required: true },
  costPerUnit: { type: Number, required: true },
  batchNumber: { type: String, required: true },
  status: { type: String, required: true, enum: ["In Stock", "Low Stock", "Out of Stock"] },
  image: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("Inventory", InventorySchema);
