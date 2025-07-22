import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6b6b"];

const InventoryPieChart = () => {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/inventory/stats")
      .then((res) => res.json())
      .then((result) => {
        if (result.data) {
          // Assign colors dynamically
          const transformedData = result.data.map((item, index) => ({
            ...item,
            color: COLORS[index % COLORS.length],
          }));
          setData(transformedData);
          setTotalItems(result.total);
        }
      })
      .catch((error) => console.error("Error fetching inventory stats:", error));
  }, []);

  return (
    

    <div className="card shadow p-4">
      <h3 className="text-center text-success">Stock Distribution by Category</h3>
      
      {data.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p>No data available</p>
      )}
      <p><strong>Total Items in Stock:</strong> {totalItems}</p>
    </div>


  );
};
export default InventoryPieChart;
