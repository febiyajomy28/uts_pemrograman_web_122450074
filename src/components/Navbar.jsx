import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import "../style/Navbar.css";

function Navbar({ cartItems, onCartClick }) {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav>
      <div className="wrapper">
        <div className="logo">
          <Link to="/">Celesté Scents</Link>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/beuty">BeutyList</Link>
            </li>
            <li>
              <button onClick={onCartClick} className="cart-button">
                <span className="cart-text">Cart🛒</span>
                {cartItemCount > 0 && (
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </button>
            </li>
            <li>
              <Link to="/SecureStock">SecureStock</Link>
            </li>
            <li>
              <Link to="/FrequentlyAskedQuestions">FAQ</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <span>Welcome, {user?.username}</span>
                </li>
                <li>
                  <button onClick={logout} className="logout-button">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="tbl-biru">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="tbl-biru">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
