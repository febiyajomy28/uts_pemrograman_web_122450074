// SecureStock.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/SecureStock.css";

const SecureStock = ({ addToCart }) => {
  const [preOrderItems, setPreOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch pre-order items from dummyjson API
  useEffect(() => {
    const fetchPreOrderItems = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        // Filter products that would be suitable for pre-order
        const preOrderProducts = data.products.map((product) => ({
          ...product,
          expectedDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0], // 30 days from now
          currentPreOrders: Math.floor(Math.random() * 50), // Random pre-order count
        }));

        setPreOrderItems(preOrderProducts.slice(0, 6)); // Take first 6 products
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pre-order items:", error);
        setLoading(false);
      }
    };

    fetchPreOrderItems();
  }, []);

  const handlePreOrder = (item) => {
    setSelectedItem(item);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log("Pre-order submitted:", {
      item: selectedItem,
      quantity,
      customerInfo: formData,
    });
    alert(
      `Pre-order confirmed for ${quantity} ${selectedItem.title}! We'll notify you when it's available.`
    );
    setSelectedItem(null);
    setFormData({ name: "", email: "", phone: "", address: "" });
  };

  if (loading) return <div className="loading">Loading pre-order items...</div>;

  return (
    <div className="secure-stock-container">
      <div className="secure-stock-header">
        <h1>SecureStock Pre-Order</h1>
        <p className="subtitle">
          Reserve upcoming products before they're released. You'll be the first
          to get them when they arrive!
        </p>
      </div>

      {!selectedItem ? (
        <div className="pre-order-list">
          {preOrderItems.map((item) => (
            <div key={item.id} className="pre-order-card">
              <div className="image-container">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className="item-details">
                <h3>{item.title}</h3>
                <p className="description">{item.description}</p>
                <div className="meta-info">
                  <span className="price">${item.price}</span>
                  <span className="expected-date">
                    Expected: {new Date(item.expectedDate).toLocaleDateString()}
                  </span>
                  <span className="pre-orders">
                    {item.currentPreOrders} pre-orders
                  </span>
                </div>
                <button
                  onClick={() => handlePreOrder(item)}
                  className="pre-order-btn"
                >
                  Pre-Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="pre-order-form-container">
          <h2>Pre-Order: {selectedItem.title}</h2>

          <div className="item-summary">
            <img src={selectedItem.thumbnail} alt={selectedItem.title} />
            <div>
              <p>{selectedItem.description}</p>
              <p>
                <strong>Price:</strong> ${selectedItem.price}
              </p>
              <p>
                <strong>Expected Availability:</strong>{" "}
                {new Date(selectedItem.expectedDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="pre-order-form">
            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
              />
            </div>

            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Shipping Address:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setSelectedItem(null)}
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Confirm Pre-Order
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="info-section">
        <h3>How SecureStock Works</h3>
        <ul>
          <li>Pre-order upcoming products before official release</li>
          <li>No payment required now - pay when item ships</li>
          <li>Guaranteed allocation - we reserve stock just for you</li>
          <li>Early notifications when your item is ready</li>
        </ul>
      </div>
    </div>
  );
};

export default SecureStock;
