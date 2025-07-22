import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const ShopContext = createContext();

function ShopContextProvider(props) {
  const currency = 'Rs.';
  const delivery_fee = 0;

  // ✅ Load cart from localStorage if exists
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  // ✅ Load products from backend
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/inventory")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  // ✅ Add item to cart and save to localStorage
  const addToCart = (itemId, quantity = 1) => {
    const updatedCart = { ...cartItems };
    updatedCart[itemId] = quantity;
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // ✅ Update or remove item in cart
  const updateQuantity = (itemId, quantity) => {
    const updatedCart = { ...cartItems };
    if (quantity === 0) {
      delete updatedCart[itemId];
    } else {
      updatedCart[itemId] = quantity;
    }
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // ✅ Calculate total cart value
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      const item = products.find((p) => p._id === itemId);
      if (item && quantity > 0) {
        totalAmount += item.costPerUnit * quantity;
      }
    }
    return totalAmount;
  };

  // ✅ Optional: Clear cart after checkout/logout
  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
  };

  useEffect(() => {
    console.log("🛒 Cart updated:", cartItems);
  }, [cartItems]);

  // ✅ Add this function before context value
const handleCheckout = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/cart/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems }),
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire("✅ Checkout successful!");
      // clearCart();
    } else {
      Swal.firet("❌ " + data.message);
    }
  } catch (err) {
    Swal.fire("❌ Checkout failed. Try again later.");
    console.error(err);
  }
};


  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    updateQuantity,
    getCartAmount,
    clearCart, // Optional export
    handleCheckout, // ✅ Add this line
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
