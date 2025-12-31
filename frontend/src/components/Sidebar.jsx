import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role; // "admin" or "staff"

  return (
    <aside className="sidebar">
      <h3>Menu</h3>

      {/* COMMON FOR BOTH */}
      <NavLink to={`/${role}/dashboard`} className="sidebar-link">
        Dashboard
      </NavLink>

      {/* ADMIN ONLY */}
      {role === "admin" && (
        <>
          <NavLink to="/admin/products" className="sidebar-link">
            Products
          </NavLink>

          <NavLink to="/admin/suppliers" className="sidebar-link">
            Suppliers
          </NavLink>

          <NavLink to="/admin/sales" className="sidebar-link">
            Sales
          </NavLink>

          <NavLink to="/admin/reports" className="sidebar-link">
            Reports
          </NavLink>
        </>
      )}

      {/* STAFF ONLY */}
      {role === "staff" && (
        <>
          <NavLink to="/staff/products" className="sidebar-link">
            View Products
          </NavLink>

          <NavLink to="/staff/sales" className="sidebar-link">
            New Sale
          </NavLink>

          <NavLink to="/staff/my-sales" className="sidebar-link">
            My Sales
          </NavLink>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
