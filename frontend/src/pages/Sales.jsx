import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Sales.css";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({ product: "", quantity: 1, customerName: "" });
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchSales = async () => {
    const res = await API.get(`/sales?search=${search}`);
    setSales(res.data);
  };

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchSales();
    fetchProducts();
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/sales", form);
    setForm({ product: "", quantity: 1, customerName: "" });
    fetchSales();
  };

  const deleteSale = async (id) => {
    await API.delete(`/sales/${id}`);
    fetchSales();
  };

  return (
    <div className="sales-page">
      <div className="sales-header">
        <h2>Sales Management</h2>
        <input
          placeholder="Search by product..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <form onSubmit={handleSubmit} className="sales-form">
        <select
          value={form.product}
          onChange={(e) => setForm({ ...form, product: e.target.value })}
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} ({p.quantity} in stock)
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          min={1}
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <input
          placeholder="Customer Name"
          value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
        />
        <button>Add Sale</button>
      </form>

      <table className="sales-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Total Price</th>
            <th>Customer</th>
            <th>Sold At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {sales.map((s) => (
    <tr key={s._id}>
      <td>{s.product?.name || "Deleted Product"}</td>
      <td>{s.quantity}</td>
      <td>${s.totalPrice}</td>
      <td>{s.customerName || "-"}</td>
      <td>{new Date(s.soldAt).toLocaleString()}</td>
      <td>
        <button
          onClick={() => deleteSale(s._id)}
          className="btn-delete"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default Sales;
