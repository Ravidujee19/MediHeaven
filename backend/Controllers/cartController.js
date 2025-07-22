const Inventory = require("../Model/ProductModel");


const checkoutCart = async (req, res) => {
  try {
    const { cartItems } = req.body; // { itemId: quantity }

    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];

      const item = await Inventory.findById(itemId);
      if (!item) return res.status(404).json({ message: `Item not found: ${itemId}` });

      if (item.quantity < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.name}. Available: ${item.quantity}, Requested: ${quantity}`,
        });
      }

      // Deduct quantity
      item.quantity -= quantity;
      await item.save();
    }

    return res.status(200).json({ message: "Checkout successful and inventory updated." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { checkoutCart };
