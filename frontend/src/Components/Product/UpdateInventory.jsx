import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ProductUpdateInventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 0,
    supplier: "",
    purchaseDate: "",
    expiryDate: "",
    costPerUnit: 0,
    batchNumber: "",
    status: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/inventory")
      .then((res) => {
        const item = res.data.find((item) => item._id === id);
        if (item) setFormData(item);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Product name is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (formData.quantity <= 0) newErrors.quantity = "Quantity must be greater than 0.";
    if (!formData.supplier) newErrors.supplier = "Supplier is required.";
    if (!formData.purchaseDate) newErrors.purchaseDate = "Purchase date is required.";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required.";
    if (new Date(formData.expiryDate) <= new Date(formData.purchaseDate))
      newErrors.expiryDate = "Expiry date must be after purchase date.";
    if (formData.costPerUnit <= 0) newErrors.costPerUnit = "Cost per unit must be greater than 0.";
    if (!formData.batchNumber) newErrors.batchNumber = "Batch number is required.";
    if (!formData.status) newErrors.status = "Status is required.";

    return newErrors;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/inventory/${id}`, formData);

      Swal.fire({
        title: "Success!",
        text: "Inventory updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/list");
      });

    } catch (err) {
      console.error("Update error", err);
    }
  };

  return (
    <div className="container mt-5">
 <h2 className="text-center text-success mb-4"> - UPDATE INVENTORY PRODUCTS -</h2>
      <form onSubmit={handleUpdate} className="shadow-lg p-4 bg-white rounded-lg">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-select ${errors.category ? "is-invalid" : ""}`}
            >
              <option value="">Select Category</option>
              <option value="Medicine">Medicine</option>
              <option value="Equipment">Equipment</option>
              <option value="Consumable">Consumable</option>
              <option value="Protective Gear">Protective Gear</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
              className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
            />
            {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="supplier" className="form-label">Supplier</label>
            <input
              type="text"
              id="supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
              className={`form-control ${errors.supplier ? "is-invalid" : ""}`}
            />
            {errors.supplier && <div className="invalid-feedback">{errors.supplier}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="purchaseDate" className="form-label">Purchase Date</label>
            <input
              type="date"
              id="purchaseDate"
              name="purchaseDate"
              value={formData.purchaseDate?.slice(0, 10)}
              onChange={handleChange}
              required
              className={`form-control ${errors.purchaseDate ? "is-invalid" : ""}`}
            />
            {errors.purchaseDate && <div className="invalid-feedback">{errors.purchaseDate}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate?.slice(0, 10)}
              onChange={handleChange}
              required
              min={formData.purchaseDate}  // This sets the min date for expiry to purchase date
              className={`form-control ${errors.expiryDate ? "is-invalid" : ""}`}
            />
            {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="costPerUnit" className="form-label">Cost per Unit</label>
            <input
              type="number"
              id="costPerUnit"
              name="costPerUnit"
              value={formData.costPerUnit}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              required
              className={`form-control ${errors.costPerUnit ? "is-invalid" : ""}`}
            />
            {errors.costPerUnit && <div className="invalid-feedback">{errors.costPerUnit}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="batchNumber" className="form-label">Batch Number</label>
            <input
              type="text"
              id="batchNumber"
              name="batchNumber"
              value={formData.batchNumber}
              onChange={handleChange}
              required
              className={`form-control ${errors.batchNumber ? "is-invalid" : ""}`}
            />
            {errors.batchNumber && <div className="invalid-feedback">{errors.batchNumber}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className={`form-select ${errors.status ? "is-invalid" : ""}`}
            >
              <option value="">Select Status</option>
              <option value="In Stock">Good</option>
              <option value="Low Stock">Fair</option>
              <option value="Out of Stock">Damaged Packaging</option>
            </select>
            {errors.status && <div className="invalid-feedback">{errors.status}</div>}
          </div>

          <div className="col-12 d-flex justify-content-center">
          <button type="submit" className="btn btn-success px-5 py-2 mt-3">Update Product</button>

          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdateInventory;
