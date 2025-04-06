import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../Hooks/useFetchData";
import "../style/BeutyDetail.css";

const BeutyDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  const {
    data: product,
    loading: productLoading,
    error: productError,
  } = useFetch(`https://dummyjson.com/products/${id}`);

  // Fetch reviews from dummyjson comments API
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoadingReviews(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/comments/post/${id}`
        );
        const data = await response.json();
        setReviews(data.comments || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    if (id) fetchReviews();
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    const newReviewObj = {
      id: reviews.length + 1,
      body: newReview,
      user: { username: "You" },
      postId: id,
      date: new Date().toLocaleDateString(),
    };

    setReviews([newReviewObj, ...reviews]);
    setNewReview("");
  };

  if (productLoading) return <div className="loading">Loading product...</div>;
  if (productError)
    return <div className="error">Error: {productError.message}</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  return (
    <div className="product-detail-container">
      {/* Product Navigation */}
      <div className="product-nav">
        <Link to="/beuty" className="back-link">
          ← Back to List
        </Link>
      </div>

      {/* Main Product Section */}
      <div className="product-main">
        <div className="product-gallery">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="main-image"
          />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>

          <div className="product-meta">
            <span className="product-brand">Brand: {product.brand}</span>
            <span className="product-rating">Rating: {product.rating} ⭐</span>
          </div>

          <div className="product-price">
            <span className="current-price">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="discount-badge">
                ({product.discountPercentage}% OFF)
              </span>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          <div className="stock-info">
            {product.stock > 0 ? (
              <span className="in-stock">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="action-buttons">
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>Product Reviews</h2>

        {isLoadingReviews ? (
          <div className="loading">Loading reviews...</div>
        ) : reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <span className="review-author">
                    {review.user?.username || "Anonymous"}
                  </span>
                  <span className="review-date">
                    {review.date || "Recently"}
                  </span>
                </div>
                <p className="review-text">{review.body || review.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        )}

        <form onSubmit={handleReviewSubmit} className="review-form">
          <h3>Add Your Review</h3>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your honest opinion about this product..."
            className="review-input"
            rows="4"
            required
          />
          <button type="submit" className="submit-review-btn">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeutyDetail;
