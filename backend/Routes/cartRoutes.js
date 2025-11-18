const express = require("express");
const router = express.Router();
const { checkoutCart } = require("../Controllers/cartController");

router.post("/checkout", checkoutCart);

module.exports = router;

