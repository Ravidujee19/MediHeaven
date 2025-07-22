// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import AdminSideNav from "../AdminsideNav";

// const ListView = () => {
//   const [inventory, setInventory] = useState([]);
//   const [category, setCategory] = useState("");

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   const fetchInventory = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/inventory");
//       setInventory(res.data);
//     } catch (err) {
//       console.error("Error fetching inventory:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/inventory/${id}`);
//       setInventory((prev) => prev.filter((item) => item._id !== id));
//     } catch (err) {
//       console.error("Error deleting item:", err);
//     }
//   };

//   const handleSearch = async () => {
//     if (!category) {
//       fetchInventory(); // Show all if no category is selected
//       return;
//     }

//     try {
//       const res = await axios.get(`http://localhost:5000/api/inventory/search?category=${category}`);
//       setInventory(res.data);
//     } catch (err) {
//       console.error("Error searching inventory:", err);
//     }
//   };

//   const getStockAlertMessage = (level) => {
//     switch (level) {
//       case "low":
//         return <span className="badge bg-danger">⚠ Low Stock</span>;
//       case "medium":
//         return <span className="badge bg-warning text-dark">🟠 Medium Stock</span>;
//       case "sufficient":
//         return <span className="badge bg-success">✅ Sufficient</span>;
//       default:
//         return null;
//     }
//   };

//   // Table alert
//   const computeStockAlert = (quantity) => {
//     if (quantity < 10) return "low";
//     if (quantity < 50) return "medium";
//     return "sufficient";
//   };
  

//   return (
//     <div className="d-flex">
//       <AdminSideNav />
//       <div className="container-fluid p-4">
//         <h2 className="mb-4 text-success text-center">INVENTORY VIEW</h2>

//         {/* Controls */}
//         <div className="mb-3 d-flex flex-wrap justify-content-between align-items-center">
//           <Link to="/addnewproduct" className="btn btn-success mb-2">Add New</Link>
//           <div className="d-flex">
//             <select className="form-select me-2" style={{ minWidth: "200px" }} value={category} onChange={(e) => setCategory(e.target.value)}>
//               <option value="">All Categories</option>
//               <option value="Medicine">Medicine</option>
//               <option value="Equipment">Equipment</option>
//               <option value="Consumable">Consumable</option>
//               <option value="Protective Gear">Protective Gear</option>
//               <option value="Other">Other</option>
//             </select>
//             <button className="btn btn-success" onClick={handleSearch}>Search</button>
//           </div>
//         </div>

//         {/* Table */}
//         <table className="table table-bordered table-striped">
//           <thead className="table-light">
//             <tr>
//               <th>Name</th>
//               <th>Category</th>
//               <th>Qty</th>
//               <th>Stock Alert</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {inventory.map((item) => (
//               <tr key={item._id}>
//                 <td>{item.name}</td>
//                 <td>{item.category}</td>
//                 <td>{item.quantity}</td>
//                 <td>{getStockAlertMessage(computeStockAlert(item.quantity))}</td>
//                 <td>
//                   <Link to={`/update/${item._id}`} className="btn btn-success btn-sm mx-1">Update</Link>
//                   <button onClick={() => handleDelete(item._id)} className="btn btn-danger btn-sm mx-1">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {inventory.length === 0 && <p className="text-center text-danger mt-4">No items found</p>}
//       </div>
//     </div>
//   );
// };

// export default ListView;

// 
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminSideNav from "../AdminsideNav";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ListView = () => {
  const [inventory, setInventory] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/inventory");
      setInventory(res.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/inventory/${id}`);
      setInventory((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleSearch = async () => {
    if (!category) {
      fetchInventory();
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/inventory/search?category=${category}`
      );
      setInventory(res.data);
    } catch (err) {
      console.error("Error searching inventory:", err);
    }
  };

  const computeStockAlert = (quantity) => {
    if (quantity < 10) return "low";
    if (quantity < 50) return "medium";
    return "sufficient";
  };

  const getStockAlertMessage = (level) => {
    switch (level) {
      case "low":
        return <span className="badge bg-danger">⚠ Low Stock</span>;
      case "medium":
        return <span className="badge bg-warning text-dark">🟠 Medium Stock</span>;
      case "sufficient":
        return <span className="badge bg-success">✅ Sufficient</span>;
      default:
        return null;
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const dateStr = new Date().toLocaleString();
    const totalPagesExp = "{total_pages_count_string}";
    const logoPath = `${window.location.origin}/mediheavenlogo.png`; // Ensure your logo is in /public
    const headerColor = [40, 167, 69];

    const tableColumn = ["Name", "Category", "Quantity", "Stock Status"];
    const tableRows = [];

    const filtered = inventory.filter((item) => {
      return category === "" || item.category === category;
    });

    filtered.forEach((item) => {
      const row = [
        item.name,
        item.category,
        item.quantity,
        computeStockAlert(item.quantity).toUpperCase(),
      ];
      tableRows.push(row);
    });

    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    };

    loadImage(logoPath)
      .then((img) => {
        doc.setFontSize(12);
        doc.setTextColor(40);
        doc.text("Filters Applied", 14, 30);
        doc.setFontSize(10);
        doc.setTextColor(80);
        doc.text(`• Category: ${category || "All Categories"}`, 18, 38);
        doc.text(`• Total Items: ${filtered.length}`, 18, 44);

        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 50,
          styles: { fontSize: 9 },
          headStyles: { fillColor: headerColor },
          margin: { top: 40 },
          didDrawPage: function (data) {
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            // Header
            doc.setFillColor(...headerColor);
            doc.rect(0, 0, pageWidth, 25, "F");
            doc.addImage(img, "PNG", 10, 5, 15, 15);
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(15);
            doc.text("Inventory System - Report", 30, 15);
            doc.setFontSize(9);
            doc.text(`Generated on: ${dateStr}`, 32, 22);

            // Footer
            doc.setFillColor(...headerColor);
            doc.rect(0, pageHeight - 20, pageWidth, 20, "F");

            const footerText1 =
              "SmartStock Pvt Ltd | 123 Inventory Street, Colombo | support@smartstock.lk | +94 71 234 5678";
            const footerText2 = "© 2025 SmartStock. All rights reserved.";
            const centerX1 = (pageWidth - doc.getTextWidth(footerText1)) / 2;
            const centerX2 = (pageWidth - doc.getTextWidth(footerText2)) / 2;

            doc.setFontSize(8);
            doc.setTextColor(255, 255, 255);
            doc.text(footerText1, centerX1, pageHeight - 13);
            doc.text(footerText2, centerX2, pageHeight - 7);

            // Page Number
            const pageNumber = doc.internal.getNumberOfPages();
            const text = `Page ${pageNumber} of ${totalPagesExp}`;
            const textWidth = doc.getTextWidth(text);
            doc.text(text, pageWidth - textWidth - 14, pageHeight - 7);

            // Watermark
            doc.saveGraphicsState();
            doc.setTextColor(200);
            doc.setFontSize(35);
            doc.setFont("helvetica", "bold");
            doc.setGState(new doc.GState({ opacity: 0.2 }));
            doc.text("Inventory System", pageWidth / 2, pageHeight / 2, {
              angle: 45,
              align: "center",
            });
            doc.restoreGraphicsState();
          },
        });

        if (typeof doc.putTotalPages === "function") {
          doc.putTotalPages(totalPagesExp);
        }

        doc.save(`Inventory_Report_${category || "All"}.pdf`);
      })
      .catch((err) => {
        console.error("Logo load failed", err);
        alert("PDF export failed – logo not found or blocked.");
      });
  };

  return (
    <div className="d-flex">
      <AdminSideNav />
      <div className="container-fluid p-4">
        <h2 className="mb-4 text-success text-center">INVENTORY VIEW</h2>

        {/* Controls */}
        <div className="mb-3 d-flex flex-wrap justify-content-between align-items-center">
          <Link to="/addnewproduct" className="btn btn-success mb-2">
            Add New
          </Link>
          <div className="d-flex">
            <select
              className="form-select me-2"
              style={{ minWidth: "200px" }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Medicine">Medicine</option>
              <option value="Equipment">Equipment</option>
              <option value="Consumable">Consumable</option>
              <option value="Protective Gear">Protective Gear</option>
              <option value="Other">Other</option>
            </select>
            <button className="btn btn-success" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {/* PDF Download */}
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-danger" onClick={downloadPDF}>
            Download PDF
          </button>
        </div>

        {/* Table */}
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Stock Alert</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{getStockAlertMessage(computeStockAlert(item.quantity))}</td>
                <td>
                  <Link
                    to={`/update/${item._id}`}
                    className="btn btn-success btn-sm mx-1"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-danger btn-sm mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {inventory.length === 0 && (
          <p className="text-center text-danger mt-4">No items found</p>
        )}
      </div>
    </div>
  );
};

export default ListView;
