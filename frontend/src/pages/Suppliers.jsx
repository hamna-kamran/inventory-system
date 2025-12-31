import { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import "./Suppliers.css";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchSuppliers = useCallback(async () => {
    const res = await API.get(`/suppliers?search=${search}`);
    setSuppliers(res.data);
  }, [search]);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/suppliers/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/suppliers", form);
    }
    setForm({ name: "", email: "", phone: "", address: "" });
    fetchSuppliers();
  };

  const deleteSupplier = async (id) => {
    await API.delete(`/suppliers/${id}`);
    fetchSuppliers();
  };

  const editSupplier = (supplier) => {
    setEditId(supplier._id);
    setForm(supplier);
  };

  return (
    <div className="suppliers-page">
      <div className="suppliers-header">
        <h2>Suppliers</h2>
        <input
          placeholder="Search supplier..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <form onSubmit={handleSubmit} className="supplier-form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <button>{editId ? "Update Supplier" : "Add Supplier"}</button>
      </form>

      <table className="suppliers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.address}</td>
              <td>
                <button onClick={() => editSupplier(s)}>Edit</button>
                <button onClick={() => deleteSupplier(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Suppliers;
