import React, { useState, useEffect } from "react";
import "../style/CheckoutMenu.css";

const CheckoutMenu = ({
  cartItems,
  onClose,
  onCheckout,
  onRemoveItem,
  onQuantityChange,
}) => {
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping] = useState(5.99); // Made shipping constant since it's not changing
  const [total, setTotal] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const newSubtotal = cartItems.reduce((sum, item) => {
      const discountedPrice =
        item.price * (1 - (item.discountPercentage || 0) / 100);
      return sum + discountedPrice * item.quantity;
    }, 0);

    const newTax = newSubtotal * 0.1; // 10% tax
    const newTotal = newSubtotal + newTax + shipping;

    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newTotal);
  }, [cartItems, shipping]);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onCheckout();
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-menu">
      <div className="checkout-header">
        <h2>
          Your Shopping Cart (
          {cartItems.reduce((total, item) => total + item.quantity, 0)})
        </h2>
        <button className="close-btn" onClick={onClose} aria-label="Close cart">
          ×
        </button>
      </div>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#fc5185"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
            <p>Your cart is empty</p>
            <button className="continue-shopping" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => {
                const discountedPrice =
                  item.price * (1 - (item.discountPercentage || 0) / 100);
                return (
                  <li key={item.id} className="cart-item">
                    <div className="item-image">
                      <img
                        src={item.thumbnail || "https://via.placeholder.com/80"}
                        alt={item.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="item-details">
                      <h3>{item.title}</h3>
                      <div className="price-info">
                        <span className="current-price">
                          ${discountedPrice.toFixed(2)}
                        </span>
                        {item.discountPercentage > 0 && (
                          <>
                            <span className="original-price">
                              ${item.price.toFixed(2)}
                            </span>
                            <span className="discount-badge">
                              -{Math.round(item.discountPercentage)}%
                            </span>
                          </>
                        )}
                      </div>
                      <div className="availability">
                        {item.availabilityStatus || "In Stock"}
                      </div>
                      <div className="quantity-controls">
                        <button
                          onClick={() => onQuantityChange(item.id, -1)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => onQuantityChange(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutMenu;
