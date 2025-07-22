import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Title from './Title';

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const total = subtotal + delivery_fee;

  return (
    <div className="w-100 p-4 bg-white rounded shadow-sm border">
      <div className="mb-4">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="d-flex flex-column gap-3 text-secondary small">
        {/* Subtotal */}
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">Subtotal</p>
          <p className="mb-0 fw-medium">{currency}{subtotal.toFixed(2)}</p>
        </div>

        {/* Divider */}
        <hr className="my-1" />

        {/* Shipping Fee */}
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">Shipping Fee</p>
          <p className="mb-0 fw-medium">{currency}{delivery_fee.toFixed(2)}</p>
        </div>

        {/* Divider */}
        <hr className="my-1" />

        {/* Total */}
        <div className="d-flex justify-content-between align-items-center fw-semibold text-dark">
          <p className="mb-0">Total</p>
          <p className="mb-0">{currency}{total.toFixed(2)}</p>
        </div>
      </div>

      {/* Checkout button */}
      <button className="btn btn-success w-100 mt-4">
        Proceed to Checkout
      </button>
    </div>
  );
}

export default CartTotal;
