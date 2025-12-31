import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import "./UpdateStock.css";

const UpdateStock = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [action, setAction] = useState("add");
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put("/products/update-stock", {
        productId,
        quantity,
        action,
      });

      setMessage(res.data.message);
      setQuantity("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating stock");
    }
  };

  return (
    <div className="update-stock">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-main">
          <h1>📦 Update Stock</h1>

          <form className="stock-form" onSubmit={handleSubmit}>
            <label>Product</label>
            <select value={productId} onChange={(e) => setProductId(e.target.value)} required>
              <option value="">Select product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} (Stock: {p.quantity})
                </option>
              ))}
            </select>

            <label>Action</label>
            <select value={action} onChange={(e) => setAction(e.target.value)}>
              <option value="add">Add Stock</option>
              <option value="reduce">Reduce Stock</option>
            </select>

            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
            />

            <button type="submit">Update Stock</button>

            {message && <p className="message">{message}</p>}
          </form>
        </main>
      </div>
    </div>
  );
};

export default UpdateStock;
