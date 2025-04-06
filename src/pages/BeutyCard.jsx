import React, { useRef } from "react";
import PropTypes from "prop-types";
import "../style/BeutyCard.css";

const BeutyCard = ({ beuty, onClick }) => {
  const cardRef = useRef(null);

  // Determine the category display name
  const getCategoryDisplayName = (category) => {
    switch (category.toLowerCase()) {
      case "beauty":
        return "Beauty Product";
      case "fragrances":
        return "Fragrance";
      case "tops":
        return "Top Wear";
      default:
        return category;
    }
  };

  return (
    <div
      ref={cardRef}
      className="recipe-card border p-4 rounded-lg shadow-sm hover:scale-105 transition"
      onClick={() => onClick && onClick(beuty.id)}
    >
      <img
        src={beuty.thumbnail}
        alt={beuty.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="font-bold text-lg mt-2">{beuty.title}</h3>
      <p className="text-gray-600">{getCategoryDisplayName(beuty.category)}</p>
      <p>{beuty.price} USD</p>
      <p>
        Rating: {beuty.rating} ({beuty.stock} in stock)
      </p>
    </div>
  );
};

BeutyCard.propTypes = {
  beuty: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

BeutyCard.defaultProps = {
  onClick: null,
};

export default BeutyCard;
