import React from 'react';
import {Link } from 'react-router-dom';

import DisplayFinanceTransactions from '../financetransactionsdisplay';

const FinanceManagement = () => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar */}
        
        <div className="col-md-3 text-white p-3 border-end"  style={{ height: "100%", maxHeight: "750px", overflowY: "auto", backgroundColor: "#0b4f28" , marginTop: "20px" }}>
          
         

          <h2 className="text-center mb-4">Finance Panel</h2>
          <nav className="nav flex-column">
            <br></br>

            
            <Link to="/dashboard/admin" className="nav-link btn btn-dark mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Admin Dashboard
            </Link>

            <br></br>
            <Link to="/profit-loss" className="nav-link btn btn-dark mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Generate profit/loss statements
            </Link>

            <br></br>
            <Link to="/addPettyCash" className="nav-link btn btn-dark mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Insert new petty cash
            </Link>

            <br></br>

            <Link to="/displayPettyCash" className="nav-link btn btn-dark mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Display all petty cash
            </Link>

           

            <br></br>

            <Link to="/balance-sheet" className="nav-link btn btn-dark mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Generate balance sheet report
            </Link>
            <br></br>

            <Link to="/transactions" className="nav-link btn btn-dark mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              View all transactions done
            </Link>

            <br></br>

            <Link to="/payroll" className="nav-link btn btn-dark mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Generate payroll
            </Link>

            <br></br>

            <Link to="/dashboard/admin" className="nav-link btn btn-dark mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Logout
            </Link>

            
          </nav>
          
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4" >
          <h1 className="text-center">Finance Dashboard</h1>
          <br></br>
          <h5><p className="text-center">Welcome! You are the Finance Manager</p></h5>

          <div className="card shadow p-4 mt-3 w-100" style={{ minHeight: "500px", backgroundColor: "#fafafa" }}>
            <h2 className="text-center">All Transactions</h2>

            <div className="d-flex justify-content-end mb-2">
             <a href="/transactions"className="btn btn-success">Filter Transactions</a>
          </div>


            <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
              <DisplayFinanceTransactions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceManagement;