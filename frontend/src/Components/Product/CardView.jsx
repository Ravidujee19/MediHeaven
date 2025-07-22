import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from '../Footer';

const CardView = () => {
  const [inventory, setInventory] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/inventory");
      setInventory(res.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };

  const handleSearch = async () => {
    if (!category) {
      fetchInventory(); // Reset if no category is selected
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/inventory/search?category=${category}`);
      setInventory(res.data);
    } catch (err) {
      console.error("Error searching inventory:", err);
    }
  };

  return (
    <>
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-success"> - SHOP -</h2>
      
      {/* Category Search */}
      <div className="text-center mb-4">
        <select className="form-select w-50 d-inline-block me-2" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Medicine">Medicine</option>
          <option value="Equipment">Equipment</option>
          <option value="Consumable">Consumable</option>
          <option value="Protective Gear">Protective Gear</option>
          <option value="Other">Other</option>
        </select>
        <button className="btn btn-success" onClick={handleSearch}>Search</button>
      </div>

      {/* Inventory Cards */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {inventory.map(item => (
          <div key={item._id} className="col">
            
           {/* ✅ WRAPPED the card with <Link> to enable navigation */}
           <Link to={`/product/${item._id}`} className="text-decoration-none text-dark">

            <div className="card shadow-sm border-light rounded-3 overflow-hidden transition-transform transform-hover custom-ash-bg" style={{ maxWidth: '300px', cursor: 'pointer' }}>
              {item.image && (
                <img src={item.image} className="card-img-top" alt={item.name} style={{ height: '200px', objectFit: 'cover' }} />
              )}
              <div className="card-body">
                <h5 className="card-title fs-5 text-truncate">{item.name}</h5>
                <p className="card-text fs-6 text-muted">Category: {item.category}</p>
                {/* <p className="card-text fs-6">{item.status}</p> */}
                <p className="card-text fs-6">Rs: {item.costPerUnit}</p>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>

      {inventory.length === 0 && <p className="text-center text-danger mt-4">No items found</p>}
    </div>
    <br></br>  <br></br>   <br></br>
     <Footer/>
    </>
  );
};

export default CardView;
