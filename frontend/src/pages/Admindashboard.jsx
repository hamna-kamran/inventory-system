import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import "./Admindashboard.css";

const AdminDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard/admin");
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
      }
    };
    fetchDashboard();
  }, []);

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-main">
          <h1>Admin Dashboard</h1>

          {/* Stats cards */}
          <div className="stats-container">
           
            <div className="stats-card stats-lowstock">
              <h3>Low Stock Items</h3>
              <p>{data.lowStock.length}</p>
            </div>
          </div>

          {/* Low stock section */}
          <section className="dashboard-section">
            <h2>Low Stock Alerts</h2>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {data.lowStock.map((p) => (
                  <tr key={p._id} className="low-stock">
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>{p.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Recent sales section
          <section className="dashboard-section">
            <h2>Recent Sales</h2>
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
          </section> */}

          {/* Recently added products */}
          <section className="dashboard-section">
            <h2>Recently Added Products</h2>
            <ul>
              {data.recentProducts.map((p) => (
                <li key={p._id}>
                  {p.name} — {p.category} ({p.quantity})
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
