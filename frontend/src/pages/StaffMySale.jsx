// frontend/src/pages/StaffMySales.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";

const StaffMySales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchMySales = async () => {
      try {
        const res = await API.get("/sales/my");
        setSales(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMySales();
  }, []);

  return (
    <div className="staff-my-sales">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-main">
          <h1>My Sales</h1>

          {sales.length === 0 ? (
            <p>No sales yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Customer</th>
                </tr>
              </thead>

              <tbody>
                {sales.map((s) => (
                  <tr key={s._id}>
                    <td>{new Date(s.soldAt).toLocaleString()}</td>
                    <td>{s.product?.name || "Deleted Product"}</td>
                    <td>{s.quantity}</td>
                    <td>${s.totalPrice}</td>
                    <td>{s.customerName || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
};

export default StaffMySales;
