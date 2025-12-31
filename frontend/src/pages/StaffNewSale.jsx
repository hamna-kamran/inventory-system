import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import "./StaffNewSale.css";

const StaffNewSale = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [stock, setStock] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // Update stock when product changes
  useEffect(() => {
    const selected = products.find((p) => p._id === productId);
    if (selected) {
      setStock(selected.quantity);
    } else {
      setStock(0);
    }
  }, [productId, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!productId) {
      setError("Please select a product");
      return;
    }

    if (quantity <= 0) {
      setError("Quantity must be greater than 0");
      return;
    }

    if (quantity > stock) {
      setError(`Only ${stock} items available in stock`);
      return;
    }

    try {
      await API.post("/sales", {
        product: productId,
        quantity: Number(quantity),
        customerName,
      });

      setMessage("✅ Sale completed successfully");
      setQuantity(1);
      setCustomerName("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "❌ Sale failed");
    }
  };

  return (
    <div className="staff-new-sale">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-main">
          <h1>New Sale</h1>

          <form className="sale-form" onSubmit={handleSubmit}>
            <label>Product</label>
            <select value={productId} onChange={(e) => setProductId(e.target.value)}>
              <option value="">-- Select Product --</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} (Stock: {p.quantity})
                </option>
              ))}
            </select>

            <label>Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />

            <label>Customer Name</label>
            <input
              type="text"
              placeholder="Optional"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />

            <button type="submit">Complete Sale</button>

            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}
          </form>
        </main>
      </div>
    </div>
  );
};

export default StaffNewSale;
