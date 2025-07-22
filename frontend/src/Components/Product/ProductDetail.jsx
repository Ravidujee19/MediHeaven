// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ShopContext } from "../../context/ShopContext"; // ✅ import context
// import Swal from "sweetalert2";
// import Footer from "../Footer";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [item, setItem] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useNavigate();
//   const isLoggedIn = localStorage.getItem("token");
//   const { addToCart } = useContext(ShopContext); // ✅ use addToCart

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/inventory/${id}`)
//       .then((res) => setItem(res.data))
//       .catch((err) => console.error("Error loading product:", err));
//   }, [id]);

//   const handleAddToCartClick = () => {
//     if (!isLoggedIn) {
//       Swal.fire({
//         title: "Please log in to add items to your cart.",
//         icon: "warning",
//         confirmButtonText: "OK",
//       }).then(() => {
//         navigate("/login");
//       });
//       return;
//     }

//     handleAddToCart(); // your existing function
//   };

//   const handleAddToCart = () => {
//     addToCart(item._id, quantity); // ✅ Add to context
//     Swal.fire("Item added to cart!");
//   };

//   const handleViewCartClick = () => {
//     if (!isLoggedIn) {
//       Swal.fire({
//         title: "Please log in to view your cart.",
//         icon: "warning",
//         confirmButtonText: "OK",
//       }).then(() => {
//         navigate("/login");
//       });
//       return;
//     }

//     navigate("/cart");
//   };

//   if (!item) return <div className="text-center mt-5">Loading...</div>;

//   return (
//     <>
//       <br></br> <br></br>
//       <div className="container border-top pt-4 fade-in">
//         <style>{`
//         .fade-in {
//           opacity: 1;
//           transition: opacity 0.5s ease-in;
//         }
//       `}</style>

//         <div className="row">
//           <div className="col-md-6">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="img-fluid rounded shadow"
//             />
//           </div>

//           <div className="col-md-6">
//             <h2 className="fw-semibold fs-4">{item.name}</h2>
//             <p className="text-muted">Category: {item.category}</p>
//             <p>Status: {item.status}</p>
//             <p>Rs: {item.costPerUnit}</p>
//             <p>Availale : {item.quantity}</p>

//             <div className="mt-4">
//               <label htmlFor="quantity" className="form-label text-muted">
//                 Select Quantity:
//               </label>
//               <input
//                 type="number"
//                 id="quantity"
//                 min={1}
//                 value={quantity}
//                 onChange={(e) => setQuantity(parseInt(e.target.value))}
//                 className="form-control w-auto"
//                 style={{ maxWidth: "100px" }}
//               />
//             </div>

//             <button
//         className="btn btn-success px-4 mt-3"
//         onClick={handleAddToCartClick}
//       >
//         Add to Cart
//       </button>

//       <button
//         className="btn btn-outline-primary px-4"
//         onClick={handleViewCartClick}
//       >
//         View Cart
//       </button>
//           </div>

//           <hr className="mt-4" />
//           <div className="text-muted mt-3 small">
//             <p>✅ 100% Original product.</p>
//             <p>💰 Cash on delivery is available on the product.</p>
//             <p>🔁 Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>
//       <br></br> <br></br> <br></br>
//       <Footer />
//     </>
//   );
// };

// export default ProductDetail;

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../../context/ShopContext'; // ✅ import context
import Swal from "sweetalert2";
import Footer from '../Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useContext(ShopContext); // ✅ use addToCart


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/inventory/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.error('Error loading product:', err));
  }, [id]);


  const handleAddToCart = () => {
    addToCart(item._id, quantity); // ✅ Add to context
    Swal.fire("Item added to cart!");
  };

  if (!item) return <div className="text-center mt-5">Loading...</div>;

  return (
    <>
    <div className="container border-top pt-4 fade-in">
      <style>{`
        .fade-in {
          opacity: 1;
          transition: opacity 0.5s ease-in;
        }
      `}</style>

      <div className="row">
        <div className="col-md-6">
          <img src={item.image} alt={item.name} className="img-fluid rounded shadow" />
        </div>

        <div className="col-md-6">
          <h2 className="fw-semibold fs-4">{item.name}</h2>
          <p className="text-muted">Category: {item.category}</p>
          <p>Status: {item.status}</p>
          <p>Rs: {item.costPerUnit}</p>
          <p>Availale : {item.quantity}</p>

          <div className="mt-4">
            <label htmlFor="quantity" className="form-label text-muted">
              Select Quantity:
            </label>
            <input
  type="number"
  id="quantity"
  min={1}
  max={item.quantity}
  value={quantity}
  onChange={(e) => {
    const val = parseInt(e.target.value);
    if (val >= 1 && val <= item.quantity) {
      setQuantity(val);
    } else if (val > item.quantity) {
      setQuantity(item.quantity); // cap at max
    } else {
      setQuantity(1); // default minimum
    }
  }}
  className="form-control w-auto"
  style={{ maxWidth: '100px' }}
/>

          </div>

          <button
            className="btn btn-success px-4 mt-3 me-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

         
            <button
              className="btn btn-outline-primary px-4 mt-3"
              onClick={() => navigate('/cart')}
            >
              View Cart
            </button>
          </div>

          <hr className="mt-4" />
          <div className="text-muted mt-3 small">
            <p>✅ 100% Original product.</p>
            <p>💰 Cash on delivery is available on the product.</p>
            <p>🔁 Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <br></br><br></br>
    <Footer/></>
  );
};

export default ProductDetail;
