import { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import "../pages/products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // Wrap fetchProducts with useCallback to satisfy ESLint
  const fetchProducts = useCallback(async () => {
    const res = await API.get(`/products?search=${search}`);
    setProducts(res.data);
  }, [search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await API.put(`/products/${editId}`, form);
      setEditId(null);
    } else {
      await API.post("/products", form);
    }

    setForm({ name: "", category: "", price: "", quantity: "" });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  const editProduct = (product) => {
    setEditId(product._id);
    setForm(product);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h2>Product Management</h2>
        <input
          className="search-input"
          placeholder="Search product..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        <button className="btn-primary">
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <table className="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className={p.quantity < 5 ? "low-stock" : ""}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <button className="btn-edit" onClick={() => editProduct(p)}>
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => deleteProduct(p._id)}
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

export default Products;
