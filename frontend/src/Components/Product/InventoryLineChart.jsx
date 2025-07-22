import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ReferenceLine } from "recharts";

const LineChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/inventory/stats")
      .then((res) => res.json())
      .then((result) => {
        if (result.data) {
          setData(result.data);
        }
      })
      .catch((error) => console.error("Error fetching inventory stats:", error));
  }, []);

  return(
 
<div className="card shadow p-4">
      <h3 className="text-center text-success">Stock Level Analysis</h3>
      <LineChart width={400} height={250} data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Line representing stock levels */}
        <Line type="monotone" dataKey="value" stroke="green" strokeWidth={2} dot={{ fill: "green", r: 3 }} />
        {/* Reference Line for Out of Stock Threshold */}
        <ReferenceLine y={100} label="Out of Stock" stroke="red" strokeDasharray="3 3" />
      </LineChart>
    </div>



);
};
export default LineChartComponent;
