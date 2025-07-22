import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryStockAlerts = () => {
  const [categoryAlerts, setCategoryAlerts] = useState([]);

  useEffect(() => {
    fetchCategoryAlerts();
  }, []);

  const fetchCategoryAlerts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inventory/alerts/category");
      setCategoryAlerts(response.data);
    } catch (err) {
      console.error("Error fetching category alerts:", err);
    }
  };

  const getMessage = (category, totalQuantity, alertLevel) => {
    switch (alertLevel) {
      case "normal":
        return (
          <div className="alert alert-success" key={category}>
            ✅ <strong>{category}:</strong> Stock is sufficient (Total: {totalQuantity})
          </div>
        );
      case "medium":
        return (
          <div className="alert alert-warning" key={category}>
            🟠 <strong>{category}:</strong> Stock is at medium level (Total: {totalQuantity})
          </div>
        );
      case "low":
        return (
          <div className="alert alert-danger" key={category}>
            ⚠ <strong>{category}:</strong> Stock is low! (Total: {totalQuantity})
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <h5 className="mb-3 text-success">📦 Category-wise Stock Alerts</h5>
      {categoryAlerts.map(({ category, totalQuantity, alertLevel }) =>
        getMessage(category, totalQuantity, alertLevel)
      )}
    </div>
  );
};

export default CategoryStockAlerts;
