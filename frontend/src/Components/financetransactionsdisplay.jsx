import React, { useState, useEffect } from "react";
import axios from "axios";


export default function DisplayFinanceTransactions() {


  const [transactions, setTransactions] = useState([]);
  
  

  const getTransactions = () => {
    axios
      .get("http://localhost:5000/transaction/")
      .then((res) => {
        setTransactions(res.data);
        
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  

  useEffect(() => {
      getTransactions();
    }, []);


 
    return (
        <div>
          <h2>All transactions done</h2>
    
       
    
          {transactions.length > 0 ? (
            <table border="3" className="table table-striped table-hover">
              <thead className="thead-dark bg-info text-white">
                <tr>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Type of transaction</th>
                  <th className="p-4">Amount spent</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((entry, index) => (
                  <tr key={index}>
                    <td className="p-2.5">T00{entry.transactionID}</td>
                    <td className="p-2.5">{entry.type}</td>
                    <td className="p-2.5">{entry.amount}</td>
                    <td className="p-2.5">{new Date(entry.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No records found...</p>
          )}
        </div>
      );
    }
    