// const express = require("express");
// const { addToCart, getCart, checkoutCart } = require("../Controllers/cartController");

// const router = express.Router();

// router.post("/add", addToCart);
// router.get("/:userId", getCart);
// router.post("/checkout/:userId", checkoutCart);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { checkoutCart } = require("../Controllers/cartController");

router.post("/checkout", checkoutCart);

module.exports = router;

