import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddPettyCash() {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const today = new Date().toISOString().split("T")[0];

  function sendData(e) {
    e.preventDefault();

    if (!date || !description || !category) {
      alert("Please fill out all required fields.");
      return;
    }

    const newPettyCash = {
      date,
      description,
      amount,
      category,
      additionalNotes,
    };

    axios
      .post("http://localhost:5000/pettyCash/addPettyCash", newPettyCash)
      .then(() => {
        alert("Petty cash recorded successfully!");
        setDate("");
        setDescription("");
        setAmount("");
        setCategory("");
        setAdditionalNotes("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar */}
        <div
          className="col-md-3 text-white p-3 border-end"
          style={{
            height: "100%",
            maxHeight: "750px",
            overflowY: "auto",
            backgroundColor: "#0b4f28",
            marginTop: "20px",
          
          }}
        >
          <h2 className="text-center mb-4">Finance Panel</h2>
          <nav className="nav flex-column">
            <br></br>

            <Link
              to="/finance"
              className="nav-link btn btn-dark mb-2"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Finance dashboard
            </Link>
            <br></br>

            <Link
              to="/profit-loss"
              className="nav-link btn btn-dark mb-2"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Generate profit/loss statements
            </Link>

            <br></br>

            <Link
              to="/addPettyCash"
              className="nav-link btn btn-dark mb-2"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Insert new petty cash
            </Link>

            <br></br>

            <Link
              to="/displayPettyCash"
              className="nav-link btn btn-dark mb-2"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Display all petty cash
            </Link>

            <br></br>

            <Link
              to="/balance-sheet"
              className="nav-link btn btn-dark mb-2"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Generate balance sheet report
            </Link>
            <br></br>

            <Link
              to="/transactions"
              className="nav-link btn btn-dark mb-2"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              View all transactions done
            </Link>

            <br></br>

            <Link
              to="/payroll"             
              className="nav-link btn btn-dark mb-2"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Generate payroll
            </Link>

            <br></br>

            <Link
             to="/dashboard/admin"
             className="nav-link btn btn-dark mb-2"
             style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
             Logout
           </Link>
          </nav>
        </div>

        {/* Form Section */}
        <div className="col-md-9">
          <h1 className="text-center">Record a new petty cash transaction</h1>
          <br></br>

          <div
            className="card shadow p-4 mt-3 w-100"
            style={{ minHeight: "500px", backgroundColor: "#f5f5f5" }}
          >
            <div className="container">
              <form onSubmit={sendData}>
                <div className="mb-3" style={{ textAlign: "left" }}>
                  <label
                    htmlFor="date"
                    className="form-label fw-bold"
                    style={{ fontSize: "1.25rem", color: "#4d4d4d" }}
                  >
                    Enter the date of transaction
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={date}
                    max={today}  
                    onChange={(e) => setDate(e.target.value)}
                    style={{ height: "40px", fontSize: "1.1rem" }}
                  />
                </div>

                <div className="mb-3" style={{ textAlign: "left" }}>
                  <label
                    htmlFor="description"
                    className="form-label fw-bold"
                    style={{ fontSize: "1.25rem", color: "#4d4d4d" }}
                  >
                    Enter the description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Enter the description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ height: "50px", fontSize: "1.1rem" }}
                  />
                </div>

                <div className="mb-3" style={{ textAlign: "left" }}>
                  <label
                    htmlFor="amount"
                    className="form-label fw-bold"
                    style={{ fontSize: "1.25rem", color: "#4d4d4d" }}
                  >
                    Enter the amount of the transaction
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="amount"
                    placeholder="Enter the amount (Amount should be less than Rs.1000)"
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      // To only allow values between 0 and 1000
                      if (value === "" || (value >= 0 && value <= 1000)) {
                        setAmount(value);
                      }
                    }}
                    pattern="\d*"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9.]/g, ""); // To only allow numbers and decimal points
                    }}
                    min="0"
                    max="1000"
                    style={{ height: "50px", fontSize: "1.1rem" }}
                  />
                </div>

                <div className="mb-3" style={{ textAlign: "left" }}>
                  <label
                    htmlFor="category"
                    className="form-label fw-bold"
                    style={{ fontSize: "1.25rem", color: "#4d4d4d" }}
                  >
                    What type of payment was made
                  </label>
                  <select
                    className="form-control"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ height: "50px", fontSize: "1.1rem" }}
                  >
                    <option value="">Select a category</option>
                    <option value="Cloud Hosting Payment">
                      Cloud Hosting Payment
                    </option>
                    <option value="Domain and SSL Renewal">
                      Domain and SSL Renewal
                    </option>
                    <option value="Transaction Fees (Payment Gateway)">
                      Transaction Fees (Payment Gateway)
                    </option>
                    <option value="Refund for Failed Doctor Booking">
                      Refund for Failed Doctor Booking
                    </option>
                    <option value="Software Subscription">
                      Software Subscription
                    </option>
                    <option value="Advertising Costs">Advertising Costs</option>
                    <option value="Other">Other..</option>
                  </select>
                </div>

                <div className="mb-3" style={{ textAlign: "left" }}>
                  <label
                    htmlFor="additionalNotes"
                    className="form-label fw-bold"
                    style={{ fontSize: "1.25rem", color: "#4d4d4d" }}
                  >
                    If you have additional notes, enter:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="additionalNotes"
                    placeholder="Enter additional notes"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    style={{ height: "50px", fontSize: "1.1rem" }}
                  />
                </div>

                <div className="mb-3" style={{ textAlign: "left" }}>
                  <button
                    type="submit"
                    className="btn btn-success"
                    style={{ padding: "8px 16px", fontSize: "1rem" }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
