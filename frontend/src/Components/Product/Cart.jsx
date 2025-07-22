import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; //rj
import { ShopContext } from "../../context/ShopContext";
import Title from "./Title";
import { assets } from "../../assets/frontend_assets/assets";
import CartTotal from "./CartTotal";
import Footer from "../Footer";
import Swal from "sweetalert2";

function Cart() {
  // const { products, currency, cartItems, updateQuantity, handleCheckout } = useContext(ShopContext);
  const navigate = useNavigate(); // rj
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    handleCheckout,
    clearCart,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    phone: "",
  });

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        tempData.push({
          _id: itemId,
          quantity: quantity,
        });
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleFakePayment = () => {
    if (!shippingInfo.address || !shippingInfo.phone) {
      Swal.fire({
        icon: "warning",
        title: "Missing Details",
        text: "Please fill in your shipping address and phone number.",
      });
      return;
    }

    // Swal.fire({
    //   title: "Processing Payment...",
    //   timer: 1500,
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    //   willClose: () => {
    //     // ✅ Save shipping and cart before clearing
    //     const currentCart = JSON.parse(localStorage.getItem("cartItems")) || {};
    //     localStorage.setItem("shipping_address", shippingInfo.address);
    //     localStorage.setItem("shipping_phone", shippingInfo.phone);
    //     localStorage.setItem("cart_temp", JSON.stringify(currentCart));

    //     clearCart();

    //     // ✅ Success popup with link
    //     Swal.fire({
    //       icon: "success",
    //       title: "Payment Successful!",
    //       html: `<p>Your order has been placed.</p><a href="/card" class="btn btn-success mt-3">Continue Shopping</a>`,
    //       showConfirmButton: false,
    //     });
    //   },
    // });

    Swal.fire({
      title: "Processing Payment...",
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        const currentCart = JSON.parse(localStorage.getItem("cartItems")) || {};
        localStorage.setItem("shipping_address", shippingInfo.address);
        localStorage.setItem("shipping_phone", shippingInfo.phone);
        localStorage.setItem("cart_temp", JSON.stringify(currentCart));
    
        clearCart();
    
        // ✅ Show success alert without a link
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: "Your order has been placed. Redirecting...",
          showConfirmButton: false,
          timer: 2000,
          willClose: () => {
            navigate("/card"); // ✅ Redirect using React Router
          },
        });
      },
    });

  };

  return (
    <>
      <div className="container py-5">
        <div className="mb-4">
          <Title text1={"YOUR"} text2={"CART"} />
        </div>

        <div>
          {cartData.length > 0 ? (
            cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item._id
              );
              if (!productData) return null;

              const unitPrice = productData.costPerUnit;
              const lineTotal = unitPrice * item.quantity;

              return (
                <div
                  key={index}
                  className="py-3 border-top d-flex flex-column flex-sm-row align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-start gap-3 mb-3 mb-sm-0 w-100">
                    <img
                      src={productData.image}
                      alt={productData.name}
                      style={{ width: "60px", height: "auto" }}
                    />
                    <div>
                      <p className="fw-medium mb-1">{productData.name}</p>
                      <p className="mb-0 text-muted small">
                        {currency}
                        {unitPrice} x {item.quantity} ={" "}
                        <strong>
                          {currency}
                          {lineTotal.toFixed(2)}
                        </strong>
                      </p>
                    </div>
                  </div>

                  <input
                    type="number"
                    className="form-control me-2"
                    style={{ maxWidth: "80px" }}
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (newQuantity >= 1) {
                        updateQuantity(item._id, newQuantity);
                      }
                    }}
                  />

                  <img
                    src={assets.bin_icon}
                    alt="Delete"
                    onClick={() => updateQuantity(item._id, 0)}
                    className="ms-2"
                    style={{ width: "20px", cursor: "pointer" }}
                  />
                </div>
              );
            })
          ) : (
            <p className="text-center py-5">Your cart is empty.</p>
          )}
        </div>

        {cartData.length > 0 && (
          <div className="d-flex justify-content-end my-5">
            <div className="w-100" style={{ maxWidth: "450px" }}>
              <CartTotal cartData={cartData} />

              <div className="mt-4">
                <h5 className="mb-3">Shipping Details</h5>

                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Enter your full shipping address"
                    value={shippingInfo.address}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        address: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Phone Number</label>
                  { <input
                    className="form-control"
                    placeholder="Enter your phone number"
                    value={shippingInfo.phone}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        phone: e.target.value,
                      })
                    }
                  /> 
//                   <input
//   type="text"
//   className="form-control"
//   placeholder="Enter your phone number"
//   value={shippingInfo.phone}
//   maxLength={10}
//   onChange={(e) => {
//     const value = e.target.value;
//     // Allow only digits using regex
//     if (/^\d*$/.test(value) && value.length <= 10) {
//       setShippingInfo({ ...shippingInfo, phone: value });
//     }
//   }}
// />

                  }
                </div>

                <div className="d-flex gap-3">
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    className="btn btn-success w-100"
                    onClick={handleFakePayment}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
