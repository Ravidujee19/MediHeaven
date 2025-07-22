const express = require("express");
const multer = require("multer");
const {
  getAllInventory,
  addInventory,
  updateInventory,
  deleteInventory,
  getInventoryByCategory,
  getInventoryStats,
  getInventoryById,
  getInventoryCategoryAlerts,

} = require("../Controllers/productController");

const router = express.Router();
const upload = multer();


router.get("/", getAllInventory);
router.get("/search", getInventoryByCategory);
router.post("/", upload.single("image"), addInventory);
router.get("/alerts/category", getInventoryCategoryAlerts);
router.get("/stats", getInventoryStats);
router.get("/:id", getInventoryById);
router.put("/:id", updateInventory);
router.delete("/:id", deleteInventory);

module.exports = router;
