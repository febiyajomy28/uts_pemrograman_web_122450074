import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../style/Home.css";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProducts(data.products);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-subtitle">
            Unveil Your Radiance, Embrace Your Essence.
          </h2>
          <h1 className="hero-title">
            Tetap Percaya Diri, Tetap Celesté Scents!
          </h1>
          <p className="hero-description">
            Celesté Scents merupakan destinasi kecantikan eksklusif untuk makeup
            dan parfum premium. Kami menghadirkan koleksi terbaik dari
            produk-produk yang memancarkan pesona, elegansi, dan kemewahan. Dari
            riasan sempurna hingga aroma yang memikat, setiap produk dipilih
            dengan cinta untuk menonjolkan kecantikan alami Anda. Temukan
            kecantikan yang berkelas hanya di Celesté Scents.
          </p>
          <div className="hero-buttons">
            <Link to="/beuty" className="primary-button">
              Explore Products
            </Link>
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
            alt="Luxury beauty products"
            className="hero-image"
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Our most popular beauty selections</p>
        </div>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/beuty/${product.id}`}>
                <div className="product-image-container">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                  />
                  <div className="product-badge">
                    {product.discountPercentage > 0 && (
                      <span className="discount-badge">
                        -{Math.round(product.discountPercentage)}%
                      </span>
                    )}
                    <span className="rating-badge">⭐ {product.rating}</span>
                  </div>
                </div>
                <div className="product-info">
                  <h3
                    className="product-title"
                    style={{
                      fontSize: "1rem",
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: "500",
                      marginBottom: "0.5rem",
                      color: "#333",
                    }}
                  >
                    {product.title}
                  </h3>
                  <p
                    className="product-category"
                    style={{
                      fontSize: "0.8rem",
                      fontFamily: '"Montserrat", sans-serif',
                      color: "#666",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {product.category}
                  </p>
                  <div
                    className="product-price"
                    style={{
                      fontFamily: '"Montserrat", sans-serif',
                    }}
                  >
                    {product.discountPercentage > 0 ? (
                      <>
                        <span
                          className="original-price"
                          style={{
                            textDecoration: "line-through",
                            color: "#999",
                            marginRight: "0.5rem",
                            fontSize: "0.9rem",
                          }}
                        >
                          ${product.price}
                        </span>
                        <span
                          className="discounted-price"
                          style={{
                            color: "#2a2a2a",
                            fontWeight: "600",
                            fontSize: "1rem",
                          }}
                        >
                          $
                          {(
                            product.price *
                            (1 - product.discountPercentage / 100)
                          ).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span
                        className="normal-price"
                        style={{
                          color: "#2a2a2a",
                          fontWeight: "600",
                          fontSize: "1rem",
                        }}
                      >
                        ${product.price}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p>Real experiences from our beauty community</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              "The perfume lasts all day and gets me so many compliments!"
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">S</div>
              <div className="author-info">
                <h4>Sarah</h4>
                <p>Jakarta</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              "My skin has never looked better since using Celesté skincare
              products."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">D</div>
              <div className="author-info">
                <h4>Dian</h4>
                <p>Bandung</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
