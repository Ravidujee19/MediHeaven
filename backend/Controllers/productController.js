const Inventory = require("../Model/ProductModel");
const Transaction = require("../Model/Transaction");

const getInventoryStats = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();

    // Aggregate inventory data by category
    const categoryCounts = inventoryItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.quantity;
      return acc;
    }, {});

    // Format data for frontend
    const formattedData = Object.keys(categoryCounts).map((category) => ({
      name: category,
      value: categoryCounts[category],
    }));

    res.status(200).json({ data: formattedData, total: inventoryItems.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Search
const getInventoryByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    let inventoryItems;

    if (category) {
      inventoryItems = await Inventory.find({ category });
    } else {
      inventoryItems = await Inventory.find();
    }

    const formattedItems = inventoryItems.map((item) => {
      let imageBase64 = "";
      if (item.image?.data) {
        imageBase64 = `data:${item.image.contentType};base64,${item.image.data.toString("base64")}`;
      }
      return { ...item._doc, image: imageBase64 };
    });

    res.status(200).json(formattedItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAllInventory = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();

    const formattedItems = inventoryItems.map((item) => {
      let imageBase64 = "";
      if (item.image?.data) {
        imageBase64 = `data:${item.image.contentType};base64,${item.image.data.toString("base64")}`;
      }

      let stockAlert = "low";
      if (item.quantity >= 500) {
        stockAlert = "sufficient";
      } else if (item.quantity >= 250) {
        stockAlert = "medium";
      }

      

      return {
        ...item._doc,
        image: imageBase64,
        stockAlert,
      };
    });

    res.status(200).json(formattedItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addInventory = async (req, res) => {
  try {
    const { name, category, quantity, supplier, purchaseDate, expiryDate, costPerUnit, batchNumber, status } = req.body;
    const newInventory = new Inventory({
      name,
      category,
      quantity,
      supplier,
      purchaseDate,
      expiryDate,
      costPerUnit,
      batchNumber,
      status,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    await newInventory.save();
    res.status(201).json(newInventory);

    //record a transaction whenever a inventoy is recorded
            const transaction = new Transaction({
                type: "InventoryPurchase",
                amount: costPerUnit * quantity,  
                date: purchaseDate, 
            });
    
            await transaction.save();



  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateInventory = async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteInventory = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getInventoryById = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    let imageBase64 = "";
    if (item.image?.data) {
      imageBase64 = `data:${item.image.contentType};base64,${item.image.data.toString("base64")}`;
    }

    const formattedItem = { ...item._doc, image: imageBase64 };
    res.status(200).json(formattedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getInventoryCategoryAlerts = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();

    const categoryTotals = {};

    inventoryItems.forEach((item) => {
      if (!categoryTotals[item.category]) {
        categoryTotals[item.category] = 0;
      }
      categoryTotals[item.category] += item.quantity;
    });


    // category alerts
    const categoryAlerts = Object.entries(categoryTotals).map(([category, totalQuantity]) => {
      let alertLevel = "low";
      if (totalQuantity >= 2000) {
        alertLevel = "normal";
      } else if (totalQuantity >= 1000) {
        alertLevel = "medium";
      }

      return {
        category,
        totalQuantity,
        alertLevel,
      };
    });

    res.status(200).json(categoryAlerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllInventory,
  addInventory,
  updateInventory,
  deleteInventory,
  getInventoryStats,
  getInventoryByCategory,
  getInventoryById,
  getInventoryCategoryAlerts,

};
