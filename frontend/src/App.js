import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/Admindashboard";
import StaffDashboard from "./pages/Staffdashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Products from "./pages/Products";
import Suppliers from "./pages/Suppliers";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import StaffProducts from "./pages/StaffProducts";
import StaffNewSale from "./pages/StaffNewSale";
import StaffMySales from "./pages/StaffMySale";
import UpdateStock from "./pages/UpdateStock";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute role="admin">
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/suppliers"
          element={
            <ProtectedRoute role="admin">
              <Suppliers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/sales"
          element={
            <ProtectedRoute role="admin">
              <Sales />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute role="admin">
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute role="staff">
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/staff/products" element={<StaffProducts />} />
        <Route path="/staff/sales" element={<StaffNewSale />} />
        <Route path="/staff/my-sales" element={<StaffMySales />} />
        <Route path="/staff/update-stock" element={<UpdateStock />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
