import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';

const PaymentSuccess = () => {
  const { products, currency } = useContext(ShopContext);
  const [summaryItems, setSummaryItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    // ✅ Log and load
    const storedCart = JSON.parse(localStorage.getItem("cart_temp")) || {};
    const shippingAddr = localStorage.getItem("shipping_address");
    const shippingPhone = localStorage.getItem("shipping_phone");
    setAddress(shippingAddr || '');
    setPhone(shippingPhone || '');

    const items = [];
    let calculatedTotal = 0;

    for (const id in storedCart) {
      const quantity = storedCart[id];
      const product = products.find((p) => p._id === id);
      if (product) {
        const lineTotal = product.costPerUnit * quantity;
        calculatedTotal += lineTotal;

        items.push({
          name: product.name,
          unit: product.costPerUnit,
          quantity,
          lineTotal,
        });
      }
    }

    setSummaryItems(items);
    setTotal(calculatedTotal);

    // ✅ Clean up after reading
    localStorage.removeItem("cart_temp");
    localStorage.removeItem("shipping_address");
    localStorage.removeItem("shipping_phone");
  }, [products]);

  return (
    <div className="container py-5 text-center">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '700px' }}>
        <h2 className="text-success mb-3">✅ Payment Successful</h2>
        <p className="text-muted mb-4">Your order has been placed successfully!</p>

        <div className="text-start mb-4">
          <h5 className="mb-2">Shipping Details</h5>
          <p className="mb-1"><strong>Address:</strong> {address}</p>
          <p><strong>Phone:</strong> {phone}</p>
        </div>

        <div className="text-start">
          <h5 className="mb-3">Order Summary</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {summaryItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{currency}{item.unit}</td>
                  <td>{item.quantity}</td>
                  <td>{currency}{item.lineTotal.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="table-active">
                <td colSpan="3" className="text-end fw-bold">Total</td>
                <td className="fw-bold">{currency}{total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <Link to="/" className="btn btn-outline-primary me-2">Continue Shopping</Link>
          <Link to="/orders" className="btn btn-success">View Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
