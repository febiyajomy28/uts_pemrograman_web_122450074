import React, { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetchData";
import ReviewCard from "../pages/ReviewCard"

const ProductList = () => {
  const { data, loading, error } = useFetch("https://dummyjson.com/products");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviews, setReviews] = useState({}); // Store reviews for each product

  // Handle product click and set selected product
  const handleProductClick = useCallback(
    (id) => {
      const product = data?.products.find((p) => p.id === id);
      setSelectedProduct(product);
    },
    [data]
  );

  // Filter products based on certain categories (e.g., beauty, fragrances)
  const filteredProducts = useMemo(() => {
    if (!data) return [];
    return data.products.filter(
      (product) =>
        product.category === "beauty" || product.category === "fragrances"
    );
  }, [data]);

  // Handle review submission
  const handleReviewSubmit = (productId, review) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [productId]: [...(prevReviews[productId] || []), review],
    }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Product List</h2>

      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <ProductCard product={product} onClick={handleProductClick} />
          </Link>
        ))}
      </div>

      {selectedProduct && (
        <div className="mt-6 p-4 border rounded-lg shadow-md">
          <h2 className="text-xl font-bold">{selectedProduct.title}</h2>
          <img
            src={selectedProduct.thumbnail}
            alt={selectedProduct.title}
            className="w-40 h-40 object-cover rounded"
          />
          <p>{selectedProduct.category}</p>
          <p>Price: {selectedProduct.price} USD</p>
          <p>Rating: {selectedProduct.rating}</p>
          <p>Stock: {selectedProduct.stock}</p>

          <div className="mt-4">
            <h3 className="font-semibold">Reviews</h3>
            {/* Display product reviews */}
            {reviews[selectedProduct.id]?.length > 0 ? (
              <ul>
                {reviews[selectedProduct.id].map((review, index) => (
                  <li key={index} className="border-b py-2">
                    {review}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet. Be the first to review!</p>
            )}

            {/* Review submission */}
            <div className="mt-4">
              <textarea
                placeholder="Write a review..."
                className="border p-2 w-full"
                rows="3"
                id="reviewText"
              />
              <button
                className="mt-2 p-2 bg-blue-500 text-white rounded"
                onClick={() => {
                  const reviewText =
                    document.getElementById("reviewText").value;
                  if (reviewText) {
                    handleReviewSubmit(selectedProduct.id, reviewText);
                    document.getElementById("reviewText").value = ""; // Clear input
                  }
                }}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
