import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import Header from "./Header";
import Sidebar from "./Sidebar";
import ProductCard from "./ProductCard";
import { products } from "./data";

export default function ShopPage() {
  const [cart, setCart] = useState([]);

  // Load cart from cookies
  useEffect(() => {
    const savedCart = Cookies.get("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Add to cart
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main">
        <Header />

        <div className="dashboard-content">
          <h2>🛍 Shop</h2>

          {/* Product Grid */}
          <div className="grid">
            {products.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                addToCart={addToCart}
              />
            ))}
          </div>

          {/* Cart Count */}
          <h3 style={{ marginTop: "20px" }}>
            Cart Items: {cart.length}
          </h3>
        </div>
      </div>
    </div>
  );
}