import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import "./Staffdashboard.css";

const StaffDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await API.get("/dashboard/staff");
      setData(res.data);
    };
    fetchDashboard();
  }, []);

  if (!data) return <p className="loading">Loading staff dashboard...</p>;

  return (
    <div className="staff-dashboard">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-main">
          <h1>Staff Dashboard</h1>

          {/* QUICK ACTIONS */}
          <section className="quick-actions">
            <NavLink to="/staff/sales" className="sidebar-link">
  <button className="action-btn sale">➕ Create Sale</button>
</NavLink>
 <NavLink to="/staff/update-stock" className="sidebar-link">
  <button className="action-btn sale">📦 Update Stock</button>
</NavLink>


          </section>

          {/* TODAY SUMMARY */}
          <section className="summary-cards">
            <div className="summary-card blue">
              <h3>Today's Sales</h3>
              <p>{data.recentSales.length}</p>
            </div>

            <div className="summary-card green">
              <h3>Today's Revenue</h3>
              <p>
                $
                {data.recentSales.reduce(
                  (sum, s) => sum + s.totalPrice,
                  0
                )}
              </p>
            </div>
          </section>

          {/* LOW STOCK */}
          <section className="dashboard-section">
            <h2>Low Stock Alerts</h2>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {data.lowStock.map((p) => (
                  <tr key={p._id} className="low-stock">
                    <td>{p.name}</td>
                    <td>{p.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* TODAY'S SALES */}
          <section className="dashboard-section">
            <h2>Today's Sales</h2>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {data.recentSales.map((s) => (
                  <tr key={s._id}>
                    <td>{s.product?.name}</td>
                    <td>{s.quantity}</td>
                    <td>${s.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;
