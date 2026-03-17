import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiTrash2,
  FiShoppingBag,
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiX,
  FiCreditCard,
  FiTruck,
  FiCheck,
  FiHeart,
} from "react-icons/fi";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [removingIndex, setRemovingIndex] = useState(null);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0,
  );
  const shipping = subtotal > 500 ? 0 : 40;
  const total = subtotal + shipping;

  const handleBuyNow = (product) => {
    navigate("/payment", {
      state: {
        items: [product],
        totalAmount: product.price * (product.quantity || 1),
        isSingleProduct: true,
      },
    });
  };

  const handleCheckOut = () => {
    navigate("/payment", {
      state: {
        items: cart,
        totalAmount: total,
        isSingleProduct: false,
      },
    });
  };

  const removeFromCart = (index) => {
    setRemovingIndex(index);
    setTimeout(() => {
      const newCart = cart.filter((_, i) => i !== index);
      setCart(newCart);
      setRemovingIndex(null);
    }, 300);
  };

  const updateQuantity = (index, change) => {
    const newCart = cart.map((item, i) => {
      if (i === index) {
        const newQty = (item.quantity || 1) + change;
        if (newQty < 1 || newQty > 10) return item;
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(newCart);
  };

  if (cart.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <div style={styles.emptyIconWrapper}>
          <FiShoppingCart style={styles.emptyIcon} />
        </div>
        <h2 style={styles.emptyTitle}>Your Cart is Empty</h2>
        <p style={styles.emptyText}>
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/" style={styles.continueShoppingBtn}>
          <FiShoppingBag style={{ marginRight: "10px" }} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.header}>
        <Link to="/" style={styles.backLink}>
          <FiArrowLeft />
          <span>Continue Shopping</span>
        </Link>
        <h1 style={styles.pageTitle}>
          <FiShoppingCart style={styles.cartIcon} />
          Shopping Cart
          <span style={styles.itemCount}>{cart.length}</span>
        </h1>
      </div>

      <div style={styles.mainContainer}>
        <div style={styles.deliveryBanner}>
          <FiTruck style={styles.deliveryIcon} />
          <span>
            {subtotal >= 500
              ? "You're eligible for FREE delivery!"
              : `Add ₹${500 - subtotal} more for FREE delivery`}
          </span>
        </div>

        <div style={styles.cartItems}>
          {cart.map((product, index) => (
            <div
              key={index}
              style={{
                ...styles.cartItem,
                ...(removingIndex === index ? styles.cartItemRemoving : {}),
              }}
            >
              <div style={styles.productImageWrapper}>
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  style={styles.productImage}
                />
              </div>

              <div style={styles.productDetails}>
                <div style={styles.productHeader}>
                  <h3 style={styles.productTitle}>{product.title}</h3>
                  <button
                    onClick={() => removeFromCart(index)}
                    style={styles.removeBtn}
                  >
                    <FiX />
                  </button>
                </div>

                <p style={styles.productDesc}>{product.description}</p>

                <span style={styles.inStock}>
                  <FiCheck /> In Stock
                </span>

                <div style={styles.priceQuantityRow}>
                  <div style={styles.priceWrapper}>
                    <span style={styles.currentPrice}>
                      ₹
                      {(
                        product.price * (product.quantity || 1)
                      ).toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span style={styles.originalPrice}>
                        ₹
                        {(
                          product.originalPrice * (product.quantity || 1)
                        ).toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div style={styles.quantitySelector}>
                    <button
                      onClick={() => updateQuantity(index, -1)}
                      style={styles.qtyBtn}
                      disabled={(product.quantity || 1) <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span style={styles.qtyValue}>{product.quantity || 1}</span>
                    <button
                      onClick={() => updateQuantity(index, 1)}
                      style={styles.qtyBtn}
                      disabled={(product.quantity || 1) >= 10}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                <div style={styles.actionButtons}>
                  <button style={styles.wishlistBtn}>
                    <FiHeart />
                    Save for Later
                  </button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    style={styles.buyNowBtn}
                  >
                    <FiCreditCard />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.bottomSection}>
          <div style={styles.priceSummary}>
            <div style={styles.priceRow}>
              <span>Subtotal ({cart.length} items)</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div style={styles.priceRow}>
              <span>Shipping</span>
              <span style={shipping === 0 ? styles.freeText : {}}>
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </span>
            </div>
            <div style={styles.totalRow}>
              <span>Total</span>
              <span style={styles.totalPrice}>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <div style={styles.bottomButtons}>
            <button onClick={handleCheckOut} style={styles.checkoutBtn}>
              <FiCreditCard />
              Proceed to Checkout
            </button>
            <button onClick={() => setCart([])} style={styles.clearCartBtn}>
              <FiTrash2 />
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    backgroundColor: "#f5f5f7",
    minHeight: "100vh",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  header: {
    background: "#fff",
    borderBottom: "1px solid #e5e5e5",
    padding: "16px 24px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "#0066cc",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "12px",
  },
  pageTitle: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#1d1d1f",
    margin: 0,
  },
  cartIcon: {
    fontSize: "24px",
  },
  itemCount: {
    background: "#0066cc",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "600",
    padding: "4px 10px",
    borderRadius: "20px",
  },

  mainContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },

  deliveryBanner: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#e8f5e9",
    padding: "12px 16px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontSize: "14px",
    color: "#2e7d32",
  },
  deliveryIcon: {
    fontSize: "20px",
  },

  cartItems: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "20px",
  },
  cartItem: {
    display: "flex",
    gap: "16px",
    background: "#fff",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #e5e5e5",
    transition: "all 0.3s ease",
  },
  cartItemRemoving: {
    opacity: 0,
    transform: "translateX(-20px)",
  },

  productImageWrapper: {
    width: "120px",
    height: "120px",
    borderRadius: "10px",
    overflow: "hidden",
    flexShrink: 0,
    background: "#f5f5f7",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  productDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  productHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "10px",
  },
  productTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1d1d1f",
    margin: 0,
    lineHeight: "1.3",
  },
  removeBtn: {
    background: "none",
    border: "none",
    color: "#86868b",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "4px",
    display: "flex",
    fontSize: "18px",
  },
  productDesc: {
    fontSize: "13px",
    color: "#86868b",
    margin: "4px 0 8px 0",
    lineHeight: "1.4",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  inStock: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    color: "#34c759",
    fontWeight: "500",
    marginBottom: "10px",
  },

  priceQuantityRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
    flexWrap: "wrap",
    gap: "10px",
  },
  priceWrapper: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
  },
  currentPrice: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1d1d1f",
  },
  originalPrice: {
    fontSize: "14px",
    color: "#86868b",
    textDecoration: "line-through",
  },

  quantitySelector: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #d2d2d7",
    borderRadius: "8px",
    overflow: "hidden",
  },
  qtyBtn: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f5f7",
    border: "none",
    cursor: "pointer",
    color: "#1d1d1f",
  },
  qtyValue: {
    width: "36px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "600",
    color: "#1d1d1f",
  },

  actionButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  wishlistBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 12px",
    background: "transparent",
    border: "1px solid #d2d2d7",
    borderRadius: "8px",
    color: "#1d1d1f",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
  },
  buyNowBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    background: "#0066cc",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },

  bottomSection: {
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e5e5e5",
    padding: "20px",
    position: "sticky",
    bottom: "20px",
  },

  priceSummary: {
    marginBottom: "16px",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#1d1d1f",
    marginBottom: "8px",
  },
  freeText: {
    color: "#34c759",
    fontWeight: "600",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    fontWeight: "600",
    color: "#1d1d1f",
    paddingTop: "12px",
    borderTop: "1px solid #e5e5e5",
  },
  totalPrice: {
    fontSize: "20px",
    fontWeight: "700",
  },

  bottomButtons: {
    display: "flex",
    gap: "12px",
  },
  checkoutBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "14px 24px",
    background: "#0066cc",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
  clearCartBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "14px 20px",
    background: "transparent",
    color: "#ff3b30",
    border: "1px solid #ff3b30",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },

  emptyContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "70vh",
    padding: "40px 20px",
    textAlign: "center",
    background: "#f5f5f7",
  },
  emptyIconWrapper: {
    width: "100px",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    borderRadius: "50%",
    marginBottom: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  emptyIcon: {
    fontSize: "40px",
    color: "#86868b",
  },
  emptyTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#1d1d1f",
    margin: "0 0 10px 0",
  },
  emptyText: {
    fontSize: "14px",
    color: "#86868b",
    margin: "0 0 24px 0",
  },
  continueShoppingBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "12px 24px",
    background: "#0066cc",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
  },
};

export default Cart;
