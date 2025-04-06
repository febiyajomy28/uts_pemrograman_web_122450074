import React from "react";
import "../style/Footer.css";
import {
  FaInstagram, 
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <div id="copyright">
      <div className="wrapper">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Celesté Scents</h4>
            <p
              style={{ color: "#666", lineHeight: "1.6", fontSize: "0.95rem" }}
            >
              Your destination for premium beauty and fragrance products that
              celebrate your unique essence.
            </p>
            <div className="social-links">
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaPinterestP />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/beuty">Products</a>
              </li>
              <li>
                <a href="/SecureStock">Pre-Order</a>
              </li>
              <li>
                <a href="/FrequentlyAskedQuestions">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Customer Service</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Shipping Policy</a>
              </li>
              <li>
                <a href="#">Returns & Exchanges</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Newsletter</h4>
            <p
              style={{
                color: "#666",
                fontSize: "0.95rem",
                marginBottom: "15px",
              }}
            >
              Subscribe for exclusive offers and beauty tips
            </p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "4px 0 0 4px",
                  flex: 1,
                  fontSize: "0.9rem",
                }}
              />
              <button
                style={{
                  background: "#d23669",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "0 4px 4px 0",
                  cursor: "pointer",
                }}
              >
                <MdEmail />
              </button>
            </div>
          </div>
        </div>

        <div className="copyright-text">
          &copy; 2025. <b>FEBIYA JOMY PRATIWI</b> All Rights Reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
