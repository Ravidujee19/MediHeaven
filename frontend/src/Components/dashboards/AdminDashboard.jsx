import React from "react";
import AdminSideNav from "../AdminsideNav";
import PatientBarGraph from "../AdminDashDetails/PatientBarGraph";
import InventoryPieChart from "../Product/InventoryPieChart";
import LineChartComponent from "../Product/InventoryLineChart";
import CategoryStockAlerts from "../Product/CategoryStockAlerts";

const AdminDashboard = () => {
  return (
    <div className="d-flex">
      <AdminSideNav/>
      {/* Main Content */}
      <div className="container-fluid">
        <div className="p-4">
          <h3>
            Welcome,
            <span className="text-success fw-bold">Admin</span>
          </h3>

          <div className="udb-card-container mt-4">
            <div className="udb-card p-3 bg-light border d-flex">
              <div className="flex-fill p-2 border-end">
              <PatientBarGraph/>
              </div>
              <div className="flex-fill p-2">
              <CategoryStockAlerts/>
              </div>
            </div>
           
            <div className="udb-card p-3 bg-light border d-flex">
              <div className="flex-fill p-2 border-end"><InventoryPieChart/></div>
              <div className="flex-fill p-2 "><LineChartComponent/></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
