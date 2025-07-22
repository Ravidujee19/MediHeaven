import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSideNav from "../AdminsideNav";

const getDateYearsFromToday = (offsetYears) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + offsetYears);
  return date.toISOString().split("T")[0]; // returns YYYY-MM-DD
};


const AddInventory = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    supplier: "",
    purchaseDate: "",
    expiryDate: "",
    costPerUnit: "",
    batchNumber: "",
    status: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Handling input changes
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });

    // Real-time validation
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "name":
        if (/[^a-zA-Z\s]/.test(value)) {
          newErrors.name = "Name cannot contain numbers or special characters.";
        } else {
          newErrors.name = "";
        }
        break;

        case "quantity":
        if (!/^[1-9]\d{1,4}$/.test(value)) {
          newErrors.quantity = "Quantity must be a number between 10 and 99999.";
        } else {
          newErrors.quantity = "";
        }
        break;

        
      case "costPerUnit":
        if (value <= 0) {
          newErrors.costPerUnit = "Cost per unit must be greater than 0.";
        } else {
          newErrors.costPerUnit = "";
        }
        break;
        case "batchNumber":
          if (!/^\d+$/.test(value)) {
            newErrors.batchNumber = "Batch number must be numeric.";
          } else if (value.length < 4) {
            newErrors.batchNumber = "Batch number must be at least 4 digits.";
          } else if (value.length > 10) {
            newErrors.batchNumber = "Batch number must be no more than 10 digits.";
          } else {
            newErrors.batchNumber = "";
          }
          break;
        
      case "status":
        if (!value) {
          newErrors.status = "Please select a status.";
        } else {
          newErrors.status = "";
        }
        break;
      case "image":
        if (!value) {
          newErrors.image = "Please upload an image.";
        } else {
          newErrors.image = "";
        }
        break;
        case "purchaseDate":
          const today = new Date();
          const inputDate = new Date(value);
          const fiveYearsAgo = new Date();
          const fiveYearsAhead = new Date();
          fiveYearsAgo.setFullYear(today.getFullYear() - 5);
          fiveYearsAhead.setFullYear(today.getFullYear() + 5);
        
          if (!isValidDate(value)) {
            newErrors.purchaseDate = "Invalid date.";
          } else if (inputDate < fiveYearsAgo || inputDate > fiveYearsAhead) {
            newErrors.purchaseDate = "Date must be within ±5 years from today.";
          } else {
            newErrors.purchaseDate = "";
          }
          break;
        
        case "expiryDate":
          const purchase = new Date(formData.purchaseDate);
          const expiry = new Date(value);
          const fiveYearsFromPurchase = new Date(purchase);
          fiveYearsFromPurchase.setFullYear(purchase.getFullYear() + 5);
        
          if (!isValidDate(value)) {
            newErrors.expiryDate = "Invalid date.";
          } else if (!formData.purchaseDate) {
            newErrors.expiryDate = "Select purchase date first.";
          } else if (expiry <= purchase) {
            newErrors.expiryDate = "Expiry must be after purchase date.";
          } else if (expiry > fiveYearsFromPurchase) {
            newErrors.expiryDate = "Expiry must be within 5 years of purchase date.";
          } else {
            newErrors.expiryDate = "";
          }
          break;
        
    }

        // Remove category validation from here, handle it separately
        if (name === "category" && !value) {
          newErrors.category = "Please select a category.";
        } else {
          newErrors.category = "";
        }

        setErrors(newErrors);
      };

      const isValidDate = (date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
      };

      const validateForm = () => {
        let newErrors = {};

        // Additional validation checks for submission if needed
        if (!formData.name) newErrors.name = "Please enter a name.";
        if (!formData.category) newErrors.category = "Please select a category.";
        if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = "Quantity must be greater than 0.";
        if (
          !formData.quantity ||
          !/^\d+$/.test(formData.quantity) ||
          parseInt(formData.quantity) < 10 ||
          parseInt(formData.quantity) > 10000
        ) {
          newErrors.quantity = "Quantity must be between 10 and 10000.";
        }
        
        
        if (!formData.supplier) newErrors.supplier = "Please enter a supplier.";
        if (!formData.purchaseDate) newErrors.purchaseDate = "Please select a purchase date.";
        if (!formData.costPerUnit || formData.costPerUnit <= 0) newErrors.costPerUnit = "Cost per unit must be greater than 0.";

        if (
          !formData.costPerUnit ||
          !/^\d+$/.test(formData.costPerUnit) ||
          parseInt(formData.cosPerUnit) < 10 ||
          parseInt(formData.costPerUnit) > 10000
        ) {
          newErrors.costPerUnit = "Cost per unit must be between 10 and 10000.";
        }
        
        if (!formData.batchNumber) newErrors.batchNumber = "Please enter a batch number.";

        // ✅ Add this line to validate batchNumber:
      if (!formData.batchNumber || !/^\d{4,10}$/.test(formData.batchNumber)) {
        newErrors.batchNumber = "Batch number must be 4 to 10 digits.";
      }

        if (!formData.status) newErrors.status = "Please select a status.";
        if (!formData.image) newErrors.image = "Please upload an image.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const data = new FormData();
        for (let key in formData) {
          data.append(key, formData[key]);
        }

        try {
          await axios.post("http://localhost:5000/api/inventory", data);
          navigate("/list");
        } catch (err) {
          console.error("Error adding item", err);
        }
      };

    return (
    <>
      <div className="d-flex">
        {/* Admin Sidebar */}
        <AdminSideNav />

        {/* Add Inventory Form (Right Side) */}
        <div className="container mt-5" style={{ marginLeft: "50px" }}>
          <h2 className="text-success text-center mb-4">- ADD PRODUCTS -</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="p-4 border rounded w-70 bg-white shadow">
          <div className="form-floating mb-3">
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Name"
              value={formData.name}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only letters and spaces, and max 20 characters
                if (/^[a-zA-Z\s]*$/.test(value) && value.length <= 20) {
                  handleChange(e);
                }
              }}
            />
            <label>Name</label>
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>


            <div className="form-floating mb-3">
              <select
                name="category"
                className={`form-select ${errors.category ? "is-invalid" : ""}`}
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="Medicine">Medicine</option>
                <option value="Equipment">Equipment</option>
                <option value="Consumable">Consumable</option>
                <option value="Protective Gear">Protective Gear</option>
                <option value="Other">Other</option>
              </select>
              <label>Category</label>
              {errors.category && <div className="invalid-feedback">{errors.category}</div>}
            </div>

            
            <div className="form-floating mb-3">
            <input
              type="text"
              name="quantity"
              className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
              placeholder="Quantity"
              value={
                formData.quantity
                  ? parseInt(formData.quantity).toLocaleString()
                  : ""
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/[^\d]/g, ""); // Keep only digits
                if (/^\d{0,5}$/.test(raw) && (raw === "" || raw[0] !== "0")) {
                  setFormData({ ...formData, quantity: raw });

                  // Live range validation
                  const numeric = parseInt(raw);
                  if (raw && (numeric < 10 || numeric > 10000)) {
                    setErrors({
                      ...errors,
                      quantity: "Quantity must be between 10 and 10000.",
                    });
                  } else {
                    setErrors({ ...errors, quantity: "" });
                  }
                }
              }}
              onKeyDown={(e) => {
                if ([" ", "-", ".", "e", "E"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <label>Quantity</label>
            {errors.quantity && (
              <div className="invalid-feedback">{errors.quantity}</div>
            )}
          </div>

          <div className="form-floating mb-3">
                <input
                  type="text"
                  name="supplier"
                  className={`form-control ${errors.supplier ? "is-invalid" : ""}`}
                  placeholder="Supplier"
                  value={formData.supplier}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z\s]*$/.test(value) && value.length <= 20) {
                      handleChange(e);
                    }
                  }}
                />
                <label>Supplier</label>
                {errors.supplier && <div className="invalid-feedback">{errors.supplier}</div>}
              </div>


              <div className="form-floating mb-3">
                  <input
                    type="text"
                    name="costPerUnit"
                    className={`form-control ${errors.costPerUnit ? "is-invalid" : ""}`}
                    placeholder="Cost Per Unit"
                    value={
                      formData.costPerUnit
                        ? `Rs. ${parseInt(formData.costPerUnit).toLocaleString()}`
                        : ""
                    }
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^\d]/g, ""); // Remove non-digits
                      if (/^\d{0,5}$/.test(raw) && (raw === "" || raw[0] !== "0")) {
                        setFormData({ ...formData, costPerUnit: raw });

                        // Live error check
                        const numeric = parseInt(raw);
                        if (raw && (numeric < 10 || numeric > 10000)) {
                          setErrors({
                            ...errors,
                            costPerUnit: "Must be between 10 and 10000.",
                          });
                        } else {
                          setErrors({ ...errors, costPerUnit: "" });
                        }
                      }
                    }}
                    onKeyDown={(e) => {
                      if ([" ", "-", ".", "e", "E"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <label>Cost Per Unit</label>
                  {errors.costPerUnit && (
                    <div className="invalid-feedback">{errors.costPerUnit}</div>
                  )}
                </div>


            <div className="form-floating mb-3">
              <input
                type="text"
                name="batchNumber"
                className={`form-control ${errors.batchNumber ? "is-invalid" : ""}`}
                placeholder="Batch Number"
                value={formData.batchNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    handleChange(e);
                  }
                }}
              />
              <label>Batch Number</label>
              {errors.batchNumber && <div className="invalid-feedback">{errors.batchNumber}</div>}
            </div>



            <div className="form-floating mb-3">
              <select
                name="status"
                className={`form-select ${errors.status ? "is-invalid" : ""}`}
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="In Stock">Good</option>
                <option value="Low Stock">Fair</option>
                <option value="Low Stock">Damaged Packaging</option>
              </select>
              <label>Status</label>
              {errors.status && <div className="invalid-feedback">{errors.status}</div>}
            </div>

            <div className="form-floating mb-3">
          <input
            type="date"
            name="purchaseDate"
            className={`form-control ${errors.purchaseDate ? "is-invalid" : ""}`}
            value={formData.purchaseDate}
            onChange={(e) => {
              handleChange(e);

              // Validate date on change
              const value = e.target.value;
              const inputDate = new Date(value);
              const today = new Date();
              const fiveYearsAgo = new Date();
              fiveYearsAgo.setFullYear(today.getFullYear() - 5);

              if (!value || isNaN(inputDate)) {
                setErrors({ ...errors, purchaseDate: "Please select a valid date." });
              } else if (inputDate < fiveYearsAgo || inputDate > today) {
                setErrors({
                  ...errors,
                  purchaseDate: "Date must be within the last 5 years and not in the future.",
                });
              } else {
                setErrors({ ...errors, purchaseDate: "" });
              }
            }}
            min={getDateYearsFromToday(-5)}
            max={new Date().toISOString().split("T")[0]} // Today
          />
          <label>Purchase Date</label>
          {errors.purchaseDate && (
            <div className="invalid-feedback">{errors.purchaseDate}</div>
          )}
        </div>



        <div className="form-floating mb-3">
          <input
            type="date"
            name="expiryDate"
            className={`form-control ${errors.expiryDate ? "is-invalid" : ""}`}
            value={formData.expiryDate}
            onChange={(e) => {
              handleChange(e);

              const expiryValue = e.target.value;
              const expiryDate = new Date(expiryValue);
              const purchaseDate = new Date(formData.purchaseDate);
              const fiveYearsFromPurchase = new Date(purchaseDate);
              fiveYearsFromPurchase.setFullYear(purchaseDate.getFullYear() + 5);

              if (!expiryValue || isNaN(expiryDate)) {
                setErrors({ ...errors, expiryDate: "Please select a valid date." });
              } else if (formData.purchaseDate === "") {
                setErrors({ ...errors, expiryDate: "Please select purchase date first." });
              } else if (expiryDate <= purchaseDate) {
                setErrors({ ...errors, expiryDate: "Expiry must be after purchase date." });
              } else if (expiryDate > fiveYearsFromPurchase) {
                setErrors({ ...errors, expiryDate: "Expiry must be within 5 years of purchase date." });
              } else {
                setErrors({ ...errors, expiryDate: "" });
              }
            }}
            min={formData.purchaseDate || getDateYearsFromToday(-5)}
            max={getDateYearsFromToday(5)}
          />
          <label>Expiry Date</label>
          {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
        </div>


                    <div className="mb-3">
                      <label className="form-label">Upload Image</label>
                      <input
                        type="file"
                        name="image"
                        className={`form-control ${errors.image ? "is-invalid" : ""}`}
                        accept="image/*"
                        onChange={handleChange}
                      />
                      {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="submit" className="btn btn-success w-30">Add Inventory</button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          );
        };

        export default AddInventory;
