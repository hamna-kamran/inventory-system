import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Reports.css";

const Reports = () => {
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const res = await API.get("/reports");
      setReport(res.data);
    };
    fetchReport();
  }, []);

  if (!report) return <p className="loading">Loading reports...</p>;

  return (
    <div className="reports-page">
      <div className="reports-header">
        <h2>Reports Overview</h2>
        <p>System performance and sales analytics</p>
      </div>

      <div className="report-cards">
        <div className="card primary">
          <h3>Total Products</h3>
          <p>{report.totalProducts}</p>
        </div>

        <div className="card warning">
          <h3>Low Stock Items</h3>
          <p>{report.lowStockItems}</p>
        </div>

        <div className="card success">
          <h3>Total Sales</h3>
          <p>{report.totalSales}</p>
        </div>

        <div className="card revenue">
          <h3>Total Revenue</h3>
          <p>${report.totalRevenue}</p>
        </div>
      </div>

      <div className="top-products">
        <h3>Top Selling Products</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Product ID</th>
                <th>Quantity Sold</th>
              </tr>
            </thead>
            <tbody>
              {report.topSellingProducts.map(([id, qty], index) => (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{id}</td>
                  <td>{qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
