import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function UpdatePettyCash() {
  const [inputs, setInputs] = useState({
    date: "",
    description: "",
    amount: "",
    category: "",
    additionalNotes: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const todayDate = new Date();
  const today = todayDate.toISOString().split("T")[0];

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/pettyCash/${id}`);
        setInputs(res.data);
      } catch (error) {
        console.log("error fetching previous data", error);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev, //keeps the previous values
      [name]: name === "amount" ? Number(value) : value, //for amount as it should be a number field
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/pettyCash/update/${id}`, inputs);

      alert("Petty Cash record updated successfully");

      navigate("/displayPettyCash"); //after submitting will navigate to display pettycashes page
    } catch (error) {
      console.error("Error updating petty cash data:", error);

      alert("Failed to update petty cash record");
    }
  };

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
              to=""
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
          <h1 className="text-center">Update Petty Cash record</h1>
          <br></br>
          <h5>
            <p className="text-center"></p>
          </h5>
          <div
            className="card shadow p-4 mt-3 w-100"
            style={{ minHeight: "500px", backgroundColor: "#f5f5f5" }}
          >
            <div className="container">
              <form onSubmit={handleSubmit}>
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
                    name="date"
                    className="form-control"
                    id="date"
                    value={
                      inputs.date
                        ? new Date(inputs.date).toISOString().split("T")[0]
                        : ""
                    }
                    max={today}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3" style={{ textAlign: "left" }}>
                  <label
                    htmlFor="date"
                    className="form-label fw-bold"
                    style={{ fontSize: "1.25rem", color: "#4d4d4d" }}
                  >
                    Enter the Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    id="description"
                    value={inputs.description || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3" style={{ textAlign: "left" }}>
                  <label
                    htmlFor="date"
                    className="form-label fw-bold"
                    style={{ fontSize: "1.25rem", color: "#4d4d4d" }}
                  >
                    Enter amount for the transaction
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    id="amount"
                    value={inputs.amount || ""}
                    onChange={handleChange}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^0-9.]/g, ""); // To only allow numbers and decimal points
                    }}
                    min="0"
                    max="1000"
                    required
                  />
                </div>

                <div className="mb-3" style={{ textAlign: "left" }}>
                  <label
                    htmlFor="date"
                    className="form-label fw-bold"
                    style={{ fontSize: "1.25rem", color: "#4d4d4d" }}
                  >
                    Enter type of payment
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    id="category"
                    value={inputs.category || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3" style={{ textAlign: "left" }}>
                  <label
                    htmlFor="date"
                    className="form-label fw-bold"
                    style={{ fontSize: "1.25rem", color: "#4d4d4d" }}
                  >
                    Enter additional notes(if applicable)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="additionalNotes"
                    id="additionalNotes"
                    value={inputs.additionalNotes || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between">
                  {/* Cancel button aligned to the left */}
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => navigate("/displayPettyCash")}
                  >
                    Cancel
                  </button>

                  {/* Submit button aligned to the right */}
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
