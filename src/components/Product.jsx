import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHeart,
  FiShoppingCart,
  FiEye,
  FiStar,
  FiPackage,
  FiX,
} from "react-icons/fi";
import { FaHeart, FaStar, FaStarHalfAlt, FaHeartBroken } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = ({
  items = [],
  cart = [],
  setCart,
  wishlist = [],
  setWishlist,
}) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredWishlist, setHoveredWishlist] = useState(null);
  const [hoveredCartBtn, setHoveredCartBtn] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const isInWishlist = (id) => {
    if (!wishlist || !Array.isArray(wishlist)) return false;
    return wishlist.some((item) => item.id === id);
  };

  const isInCart = (id) => {
    if (!cart || !Array.isArray(cart)) return false;
    return cart.some((item) => item.id === id);
  };

  const toggleWishlist = (product) => {
    if (!setWishlist) {
      toast.error("Wishlist function not available");
      return;
    }

    if (isInWishlist(product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      toast.info("Removed from wishlist", {
        icon: <FaHeartBroken size={20} />,
        position: "bottom-right",
      });
    } else {
      setWishlist([...wishlist, product]);
      toast.success("Added to wishlist!", {
        icon: <FaHeart size={20} />,
        position: "bottom-right",
      });
    }
  };

  const addToCart = (product) => {
    if (!setCart) {
      toast.error("Cart function not available");
      return;
    }

    if (isInCart(product.id)) {
      toast.warn("Already in cart!", { position: "bottom-right" });
      return;
    }
    setCart([...cart, { ...product, qty: 1 }]);
    toast.success("Added to cart!", {
      icon: <FiShoppingCart size={20} />,
      position: "bottom-right",
    });
  };

  const renderStars = (rating = 4.5) => {
    const stars = [];
    const full = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 0; i < full; i++)
      stars.push(
        <FaStar
          key={`f${i}`}
          style={{ ...styles.starIcon, color: "#ffc107" }}
        />,
      );
    if (hasHalf)
      stars.push(
        <FaStarHalfAlt
          key="h"
          style={{ ...styles.starIcon, color: "#ffc107" }}
        />,
      );
    for (let i = 0; i < 5 - Math.ceil(rating); i++)
      stars.push(
        <FiStar key={`e${i}`} style={{ ...styles.starIcon, color: "#ddd" }} />,
      );
    return stars;
  };

  const getDiscount = (original, price) =>
    original ? Math.round(((original - price) / original) * 100) : 0;

  const styles = {
    section: {
      padding: "60px 0",
      background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    container: {
      maxWidth: "1300px",
      margin: "0 auto",
      padding: "0 20px",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: 800,
      color: "#1a1a2e",
      marginBottom: "10px",
    },
    titleHighlight: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "#6c757d",
      maxWidth: "500px",
      margin: "0 auto",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "30px",
    },
    card: (isHovered) => ({
      background: "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      position: "relative",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      boxShadow: isHovered
        ? "0 20px 40px rgba(0, 0, 0, 0.12)"
        : "0 2px 15px rgba(0, 0, 0, 0.06)",
      transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      border: "1px solid rgba(0,0,0,0.04)",
    }),
    badgesContainer: {
      position: "absolute",
      top: "15px",
      left: "15px",
      zIndex: 3,
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    badgeBase: {
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.7rem",
      fontWeight: 700,
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      width: "fit-content",
      color: "white",
    },
    discountBadge: { background: "linear-gradient(135deg, #ff416c, #ff4b2b)" },
    newBadge: { background: "linear-gradient(135deg, #11998e, #38ef7d)" },
    bestsellerBadge: {
      background: "linear-gradient(135deg, #f093fb, #f5576c)",
    },
    wishlistBtn: (isActive, isHoveredW) => ({
      position: "absolute",
      top: "15px",
      right: "15px",
      zIndex: 3,
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      border: "none",
      background: isActive ? "#fff0f0" : "rgba(255,255,255,0.95)",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: isHoveredW
        ? "0 4px 15px rgba(0,0,0,0.15)"
        : "0 2px 10px rgba(0,0,0,0.1)",
      transform: isHoveredW ? "scale(1.15)" : "scale(1)",
    }),
    heartIcon: (isActive, isHoveredW) => ({
      fontSize: "18px",
      color: isActive || isHoveredW ? "#ff4757" : "#666",
      transition: "all 0.3s ease",
      animation: isActive ? "heartBeat 0.6s ease-in-out" : "none",
    }),
    imageWrapper: {
      position: "relative",
      overflow: "hidden",
      height: "280px",
      background: "#f5f5f5",
    },
    image: (isHovered) => ({
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
      transform: isHovered ? "scale(1.08)" : "scale(1)",
    }),
    quickActions: (isHovered) => ({
      position: "absolute",
      bottom: isHovered ? "0" : "-60px",
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      gap: "12px",
      padding: "15px",
      background: "linear-gradient(transparent, rgba(0,0,0,0.4))",
      transition: "bottom 0.4s ease",
    }),
    actionBtn: (isHoveredA) => ({
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      border: "none",
      background: isHoveredA ? "#667eea" : "white",
      color: isHoveredA ? "white" : "#333",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "18px",
      transition: "all 0.3s ease",
      textDecoration: "none",
      boxShadow: isHoveredA
        ? "0 4px 12px rgba(102,126,234,0.4)"
        : "0 2px 8px rgba(0,0,0,0.15)",
      transform: isHoveredA ? "translateY(-3px)" : "translateY(0)",
    }),
    content: { padding: "20px" },
    category: {
      fontSize: "0.75rem",
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      color: "#667eea",
      fontWeight: 600,
      marginBottom: "6px",
      display: "inline-block",
    },
    productTitleLink: { textDecoration: "none" },
    productTitle: {
      fontSize: "1.1rem",
      fontWeight: 700,
      color: "#1a1a2e",
      marginBottom: "6px",
      lineHeight: 1.3,
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      transition: "color 0.3s ease",
      cursor: "pointer",
    },
    description: {
      fontSize: "0.85rem",
      color: "#999",
      marginBottom: "10px",
      lineHeight: 1.5,
    },
    ratingWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginBottom: "12px",
    },
    starsRow: { display: "flex", gap: "2px" },
    starIcon: { fontSize: "14px" },
    ratingCount: { fontSize: "0.8rem", color: "#999" },
    priceWrapper: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "16px",
      flexWrap: "wrap",
    },
    currentPrice: {
      fontSize: "1.4rem",
      fontWeight: 800,
      color: "#1a1a2e",
    },
    originalPrice: {
      fontSize: "1rem",
      color: "#999",
      textDecoration: "line-through",
    },
    discountText: {
      fontSize: "0.8rem",
      color: "#11998e",
      fontWeight: 700,
      background: "#e8fdf5",
      padding: "2px 8px",
      borderRadius: "4px",
    },
    cartBtn: (inCart, isHoveredC) => ({
      width: "100%",
      padding: "12px 20px",
      border: inCart ? "none" : "2px solid #667eea",
      background: inCart
        ? "linear-gradient(135deg, #11998e, #38ef7d)"
        : isHoveredC
          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          : "transparent",
      color: inCart || isHoveredC ? "white" : "#667eea",
      borderRadius: "12px",
      fontSize: "0.95rem",
      fontWeight: 700,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      transition: "all 0.3s ease",
      letterSpacing: "0.5px",
      transform: isHoveredC && !inCart ? "translateY(-2px)" : "translateY(0)",
      boxShadow:
        isHoveredC && !inCart
          ? "0 6px 20px rgba(102,126,234,0.4)"
          : inCart && isHoveredC
            ? "0 6px 20px rgba(56,239,125,0.4)"
            : "none",
      borderColor: inCart ? "transparent" : "#667eea",
    }),
    emptyState: { textAlign: "center", padding: "60px 20px", color: "#666" },
    emptyIcon: { fontSize: "4rem", marginBottom: "20px", color: "#667eea" },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(4px)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    modalContent: {
      background: "#fff",
      borderRadius: "20px",
      maxWidth: "800px",
      width: "100%",
      position: "relative",
      display: "flex",
      flexWrap: "wrap",
      overflow: "hidden",
      animation:
        "modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    },
    closeModalBtn: {
      position: "absolute",
      top: "15px",
      right: "15px",
      background: "rgba(0,0,0,0.05)",
      border: "none",
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: "20px",
      color: "#333",
      zIndex: 10,
      transition: "all 0.3s ease",
    },
    modalImageSide: {
      flex: "1 1 300px",
      minHeight: "300px",
      background: "#f8f9fa",
    },
    modalImage: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      padding: "20px",
    },
    modalInfoSide: {
      flex: "1 1 300px",
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    modalActionsRow: { display: "flex", gap: "15px", marginTop: "20px" },
    modalWishlistBtn: (isActive) => ({
      width: "50px",
      height: "50px",
      borderRadius: "12px",
      border: "2px solid #eaeaea",
      background: isActive ? "#fff0f0" : "white",
      color: isActive ? "#ff4757" : "#666",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      borderColor: isActive ? "#ff4757" : "#eaeaea",
    }),
  };

  const keyframes = `
    @keyframes heartBeat {
      0%   { transform: scale(1); }
      15%  { transform: scale(1.3); }
      30%  { transform: scale(1); }
      45%  { transform: scale(1.2); }
      60%  { transform: scale(1); }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes modalPop {
      from { opacity: 0; transform: scale(0.9); }
      to   { opacity: 1; transform: scale(1); }
    }
  `;

  if (!items || items.length === 0) {
    return (
      <div style={styles.section}>
        <div style={styles.container}>
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <FiPackage />
            </div>
            <h3>No Products Available</h3>
            <p>Check back later for new products!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{keyframes}</style>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
        toastStyle={{ borderRadius: "12px", fontWeight: 600 }}
      />

      <div style={styles.section}>
        <div style={styles.container}>
          <div style={styles.header}>
            <h2 style={styles.title}>
              <span style={styles.titleHighlight}>Trending</span> Products
            </h2>
            <p style={styles.subtitle}>
              Discover our most popular items loved by customers
            </p>
          </div>

          <div style={styles.grid}>
            {items.map((product) => {
              const discount = getDiscount(
                product.originalPrice,
                product.price,
              );
              const isHovered = hoveredCard === product.id;
              const wishlisted = isInWishlist(product.id);
              const inCart = isInCart(product.id);

              return (
                <div
                  key={product.id}
                  style={{
                    ...styles.card(isHovered),
                    animation: "fadeInUp 0.5s ease forwards",
                  }}
                  onMouseEnter={() => setHoveredCard(product.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={styles.badgesContainer}>
                    {discount > 0 && (
                      <span
                        style={{ ...styles.badgeBase, ...styles.discountBadge }}
                      >
                        -{discount}%
                      </span>
                    )}
                    {product.isNew && (
                      <span style={{ ...styles.badgeBase, ...styles.newBadge }}>
                        NEW
                      </span>
                    )}
                    {product.isBestseller && (
                      <span
                        style={{
                          ...styles.badgeBase,
                          ...styles.bestsellerBadge,
                        }}
                      >
                        BESTSELLER
                      </span>
                    )}
                  </div>

                  <button
                    style={styles.wishlistBtn(
                      wishlisted,
                      hoveredWishlist === product.id,
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    onMouseEnter={() => setHoveredWishlist(product.id)}
                    onMouseLeave={() => setHoveredWishlist(null)}
                    title={
                      wishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                    }
                  >
                    {wishlisted ? (
                      <FaHeart
                        style={styles.heartIcon(
                          true,
                          hoveredWishlist === product.id,
                        )}
                      />
                    ) : (
                      <FiHeart
                        style={styles.heartIcon(
                          false,
                          hoveredWishlist === product.id,
                        )}
                      />
                    )}
                  </button>

                  <div style={styles.imageWrapper}>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.imgSrc}
                        alt={product.title}
                        style={styles.image(isHovered)}
                      />
                    </Link>

                    <div style={styles.quickActions(isHovered)}>
                      <button
                        style={styles.actionBtn(
                          hoveredAction === `view-${product.id}`,
                        )}
                        onMouseEnter={() =>
                          setHoveredAction(`view-${product.id}`)
                        }
                        onMouseLeave={() => setHoveredAction(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickViewProduct(product);
                        }}
                        title="Quick View"
                      >
                        <FiEye />
                      </button>

                      <button
                        style={{
                          ...styles.actionBtn(
                            hoveredAction === `cart-${product.id}`,
                          ),
                          ...(inCart
                            ? { background: "#38ef7d", color: "white" }
                            : {}),
                        }}
                        onMouseEnter={() =>
                          setHoveredAction(`cart-${product.id}`)
                        }
                        onMouseLeave={() => setHoveredAction(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        title={inCart ? "Already in Cart" : "Add to Cart"}
                      >
                        <FiShoppingCart />
                      </button>
                    </div>
                  </div>

                  <div style={styles.content}>
                    {product.category && (
                      <span style={styles.category}>{product.category}</span>
                    )}
                    <Link
                      to={`/product/${product.id}`}
                      style={styles.productTitleLink}
                    >
                      <h3 style={styles.productTitle}>{product.title}</h3>
                    </Link>
                    <p style={styles.description}>
                      {product.description?.substring(0, 60)}...
                    </p>

                    <div style={styles.ratingWrapper}>
                      <div style={styles.starsRow}>
                        {renderStars(product.rating)}
                      </div>
                      <span style={styles.ratingCount}>
                        ({product.reviewCount || 128})
                      </span>
                    </div>

                    <div style={styles.priceWrapper}>
                      <span style={styles.currentPrice}>₹{product.price}</span>
                      {product.originalPrice && (
                        <span style={styles.originalPrice}>
                          ₹{product.originalPrice}
                        </span>
                      )}
                      {discount > 0 && (
                        <span style={styles.discountText}>{discount}% off</span>
                      )}
                    </div>

                    <button
                      style={styles.cartBtn(
                        inCart,
                        hoveredCartBtn === product.id,
                      )}
                      onMouseEnter={() => setHoveredCartBtn(product.id)}
                      onMouseLeave={() => setHoveredCartBtn(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      <FiShoppingCart />
                      {inCart ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {quickViewProduct && (
        <div
          style={styles.modalOverlay}
          onClick={() => setQuickViewProduct(null)}
        >
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              style={styles.closeModalBtn}
              onClick={() => setQuickViewProduct(null)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#ffebe9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(0,0,0,0.05)")
              }
            >
              <FiX />
            </button>

            <div style={styles.modalImageSide}>
              <img
                src={quickViewProduct.imgSrc}
                alt={quickViewProduct.title}
                style={styles.modalImage}
              />
            </div>

            <div style={styles.modalInfoSide}>
              <span style={styles.category}>
                {quickViewProduct.category || "Product"}
              </span>
              <h2
                style={{
                  ...styles.productTitle,
                  fontSize: "1.8rem",
                  marginBottom: "15px",
                }}
              >
                {quickViewProduct.title}
              </h2>

              <div style={styles.ratingWrapper}>
                <div style={styles.starsRow}>
                  {renderStars(quickViewProduct.rating)}
                </div>
                <span style={styles.ratingCount}>
                  ({quickViewProduct.reviewCount || 128} Reviews)
                </span>
              </div>

              <div style={{ ...styles.priceWrapper, marginBottom: "20px" }}>
                <span style={{ ...styles.currentPrice, fontSize: "2rem" }}>
                  ₹{quickViewProduct.price}
                </span>
                {quickViewProduct.originalPrice && (
                  <span style={{ ...styles.originalPrice, fontSize: "1.2rem" }}>
                    ₹{quickViewProduct.originalPrice}
                  </span>
                )}
              </div>

              <p
                style={{
                  ...styles.description,
                  fontSize: "1rem",
                  marginBottom: "30px",
                }}
              >
                {quickViewProduct.description ||
                  "No description available for this product. High quality material and perfect design."}
              </p>

              <div style={styles.modalActionsRow}>
                <div style={{ flex: 1 }}>
                  <button
                    style={styles.cartBtn(isInCart(quickViewProduct.id), false)}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(quickViewProduct);
                    }}
                  >
                    <FiShoppingCart />
                    {isInCart(quickViewProduct.id)
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </button>
                </div>

                <button
                  style={styles.modalWishlistBtn(
                    isInWishlist(quickViewProduct.id),
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(quickViewProduct);
                  }}
                  title="Wishlist"
                >
                  {isInWishlist(quickViewProduct.id) ? (
                    <FaHeart />
                  ) : (
                    <FiHeart />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
