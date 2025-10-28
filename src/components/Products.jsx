import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

const Products = () => {
  const products = [
    { id: 1, name: "iPhone", category: "electronics", price: 90000 },
    { id: 2, name: "Laptop", category: "electronics", price: 70000 },
    { id: 3, name: "Rice Bag", category: "grocery", price: 1200 },
    { id: 4, name: "Cooking Oil", category: "grocery", price: 200 },
    { id: 5, name: "T-Shirts", category: "dresses", price: 200 },
  ];

  const [cart, setCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "electronics", "grocery", "dresses"];

  // Add item to cart (count per product)
  const addToCart = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  // Total items in cart (sum of all counts)
  const totalCartItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Top bar */}
      <div style={styles.topBar}>
        <div style={styles.filterContainer}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                ...styles.filterButton,
                backgroundColor:
                  selectedCategory === cat ? "#e5e7eb" : "transparent",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={styles.cartIcon}>
          <FaShoppingCart size={18} style={{ marginRight: "5px" }} />
          Cart ({totalCartItems})
        </div>
      </div>

      {/* Product Grid */}
      <div style={styles.container}>
        {filteredProducts.map((p) => (
          <div key={p.id} style={styles.card}>
            <h3>{p.name}</h3>
            <p>Category: {p.category}</p>
            <p>
              <strong>Price:</strong> ₹{p.price}
            </p>

            {/* Toggle button */}
            <button
              style={{
                ...styles.button,
                backgroundColor: cart[p.id] ? "#22c55e" : "#1a73e8",
              }}
              onClick={() => addToCart(p.id)}
            >
              {cart[p.id] ? `Added (${cart[p.id]})` : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
  },
  filterContainer: {
    display: "flex",
    gap: "10px",
  },
  filterButton: {
    padding: "6px 15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  cartIcon: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "6px 10px",
    backgroundColor: "white",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    width: "300px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  button: {
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Products;
