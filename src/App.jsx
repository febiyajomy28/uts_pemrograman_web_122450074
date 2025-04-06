import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import BeutyCard from "./pages/BeutyCard";
import BeutyList from "./components/BeutyList";
import BeutyDetail from "./pages/BeutyDetail";
import FAQ from "./pages/FAQ";
import SecureStock from "./pages/SecureStock";
import CheckoutMenu from "./pages/CheckoutMenu";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./auth/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
          discountPercentage: product.discountPercentage || 0,
          availabilityStatus: "In Stock",
        },
      ];
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckout = () => {
    alert("Checkout completed successfully!");
    setCartItems([]);
    setShowCheckout(false);
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar
          cartItems={cartItems}
          onCartClick={() => setShowCheckout(true)}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Protected routes */}
          <Route
            path="/beuty"
            element={
              <PrivateRoute>
                <BeutyList addToCart={addToCart} />
              </PrivateRoute>
            }
          />
          <Route
            path="/beuty/:id"
            element={
              <PrivateRoute>
                <BeutyDetail addToCart={addToCart} />
              </PrivateRoute>
            }
          />
          <Route path="/beutycard" element={<BeutyCard />} />
          // In App.jsx, modify the SecureStock route:
          <Route
            path="/SecureStock"
            element={
              <PrivateRoute>
                <SecureStock addToCart={addToCart} />
              </PrivateRoute>
            }
          />
          <Route path="/FrequentlyAskedQuestions" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {showCheckout && (
          <CheckoutMenu
            cartItems={cartItems}
            onClose={() => setShowCheckout(false)}
            onCheckout={handleCheckout}
            onRemoveItem={handleRemoveItem}
            onQuantityChange={handleQuantityChange}
          />
        )}
      </Router>
    </AuthProvider>
  );
}

export default App;
