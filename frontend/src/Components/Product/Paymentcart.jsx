import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Title from './Title';
import { assets } from '../../assets/frontend_assets/assets';
import CartTotal from './CartTotal';
import Footer from '../Footer';

function PaymentCart() {
  const { products, currency, cartItems, updateQuantity,handleCheckout  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

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

  return (
    <>
    <div className="container py-5">
      <div className="mb-4">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
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
                    src={productData.image[0]}
                    alt=""
                    style={{ width: '60px', height: 'auto' }}
                  />
                  <div>
                    <p className="fw-medium mb-1">{productData.name}</p>
                    <p className="mb-0 text-muted small">
                      {currency}{unitPrice} x {item.quantity} = <strong>{currency}{lineTotal.toFixed(2)}</strong>
                    </p>
                  </div>
                </div>

                <input
                  type="number"
                  className="form-control me-2"
                  style={{ maxWidth: '80px' }}
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
                  style={{ width: '20px', cursor: 'pointer' }}
                />
              </div>
            );
          })
        ) : (
          <p className="text-center py-5">Your cart is empty.</p>
        )}
      </div>

      <div className="d-flex justify-content-end my-5">
  <div className="w-100" style={{ maxWidth: '450px' }}>
    <CartTotal cartData={cartData} />
    
  </div>
</div>

    </div>
    <Footer/>
    </>
  );
}

export default PaymentCart;
