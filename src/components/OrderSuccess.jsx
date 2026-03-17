import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

import {
  FaCheck,
  FaTruck,
  FaHome,
  FaBox,
  FaPhone,
  FaEnvelope,
  FaPrint,
  FaShoppingCart,
  FaMoneyBillWave,
  FaCreditCard,
  FaMapMarkerAlt,
  FaUser,
  FaReceipt,
  FaArrowRight,
  FaShieldAlt,
  FaHeadset,
  FaUndo,
  FaStar,
  FaCopy,
  FaCheckCircle,
  FaWhatsapp,
  FaDownload,
  FaShareAlt,
  FaGift,
  FaCalendarAlt,
  FaClock,
  FaChevronRight,
  FaTag,
  FaInfoCircle,
  FaQuestionCircle,
} from "react-icons/fa";

import {
  MdPayment,
  MdLocalShipping,
  MdVerified,
  MdSecurity,
} from "react-icons/md";
import { BiTime, BiPackage } from "react-icons/bi";
import { HiSparkles } from "react-icons/hi";
import { BsBoxSeam, BsTruck, BsHouseDoor } from "react-icons/bs";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};

  const [copied, setCopied] = useState(false);
  const [showAnim, setShowAnim] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowAnim(true), 200);
    window.scrollTo(0, 0);
  }, []);

  if (!orderDetails) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          padding: "20px",
          background: "#f5f7fa",
        }}
      >
        <FaBox
          style={{ fontSize: "50px", color: "#ccc", marginBottom: "15px" }}
        />
        <h2 style={{ color: "#333", marginBottom: "8px" }}>No Order Found</h2>
        <p style={{ color: "#888", marginBottom: "20px" }}>
          Looks like you haven't placed any order
        </p>
        <Link
          to="/"
          style={{
            padding: "12px 30px",
            background: "#1e3c72",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Go to Home
        </Link>
      </div>
    );
  }
  const {
    orderId,
    items,
    totalAmount,
    customerName,
    phone,
    email,
    shippingAddress,
    paymentMethod,
    orderDate,
    deliveryDate,
  } = orderDetails;

  const savings = Math.round(totalAmount * 0.12);

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPaymentIcon = (m) => {
    if (m === "cod") return <FaMoneyBillWave />;
    if (m === "upi") return <MdPayment />;
    if (m === "card") return <FaCreditCard />;
    return <MdPayment />;
  };

  const getPaymentText = (m) => {
    if (m === "cod") return "Cash on Delivery";
    if (m === "upi") return "UPI Payment";
    if (m === "card") return "Credit/Debit Card";
    return m;
  };

  return (
    <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
      <div
        style={{
          background:
            "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #3d6bb9 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 15% 50%, rgba(255,255,255,0.06) 0%, transparent 50%),
            radial-gradient(circle at 85% 30%, rgba(255,255,255,0.04) 0%, transparent 40%)`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "22px 20px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                border: "2px solid rgba(255,255,255,0.4)",
                transform: showAnim ? "scale(1)" : "scale(0)",
                transition:
                  "transform 0.5s cubic-bezier(0.68,-0.55,0.265,1.55)",
              }}
            >
              <FaCheck style={{ fontSize: "20px", color: "white" }} />
            </div>

            <div style={{ flex: 1, minWidth: "200px" }}>
              <h1
                style={{
                  margin: "0 0 3px",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                Order Placed Successfully!
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                Thank you {customerName}! Your order #{orderId} is confirmed.
              </p>
            </div>

            <button
              onClick={copyOrderId}
              style={{
                background: copied
                  ? "rgba(59, 130, 246, 0.9)"
                  : "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "8px",
                padding: "8px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                color: "white",
                fontWeight: "600",
                transition: "all 0.3s",
              }}
            >
              {copied ? (
                <>
                  <FaCheckCircle /> Copied!
                </>
              ) : (
                <>
                  <FaCopy /> Copy Order ID
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px 20px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "16px",
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 1px 4px rgba(30, 60, 114, 0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 20px",
                borderBottom: "1px solid #e8ecf1",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FaTruck style={{ color: "#1e3c72", fontSize: "15px" }} />
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "#222",
                  }}
                >
                  Delivery Status
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "#f0f8ff",
                  padding: "3px 10px",
                  borderRadius: "20px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#3b82f6",
                    animation: "blink 1.4s infinite",
                  }}
                />
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#1e3c72",
                  }}
                >
                  Live
                </span>
              </div>
            </div>

            <div
              style={{
                padding: "22px 20px 18px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  left: "calc(10% + 14px)",
                  right: "calc(10% + 14px)",
                  height: "3px",
                  background: "#e5e7eb",
                  borderRadius: "2px",
                }}
              >
                <div
                  style={{
                    width: "12%",
                    height: "100%",
                    background: "linear-gradient(90deg, #3b82f6, #1e3c72)",
                    borderRadius: "2px",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {[
                  {
                    icon: <FaCheck />,
                    label: "Confirmed",
                    time: orderDate,
                    s: "done",
                  },
                  {
                    icon: <BiTime />,
                    label: "Processing",
                    time: "In Progress",
                    s: "current",
                  },
                  {
                    icon: <BsBoxSeam />,
                    label: "Shipped",
                    time: "Pending",
                    s: "wait",
                  },
                  {
                    icon: <FaTruck />,
                    label: "Out for Delivery",
                    time: "Pending",
                    s: "wait",
                  },
                  {
                    icon: <FaHome />,
                    label: "Delivered",
                    time: deliveryDate,
                    s: "wait",
                  },
                ].map((step, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "13px",
                        ...(step.s === "done"
                          ? {
                              background: "#3b82f6",
                              color: "white",
                              boxShadow: "0 2px 6px rgba(59, 130, 246, 0.35)",
                            }
                          : step.s === "current"
                            ? {
                                background: "#1e3c72",
                                color: "white",
                                boxShadow: "0 2px 6px rgba(30, 60, 114, 0.35)",
                                animation: "pulse2 2s infinite",
                              }
                            : {
                                background: "#f3f4f6",
                                color: "#9ca3af",
                                border: "2px solid #e5e7eb",
                              }),
                      }}
                    >
                      {step.icon}
                    </div>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: step.s !== "wait" ? "700" : "500",
                        color: step.s !== "wait" ? "#111" : "#9ca3af",
                        textAlign: "center",
                        lineHeight: "1.2",
                      }}
                    >
                      {step.label}
                    </span>
                    <span
                      style={{
                        fontSize: "9px",
                        color: "#aaa",
                        textAlign: "center",
                      }}
                    >
                      {step.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 20px",
                background: "#f8fafd",
                borderTop: "1px solid #e8ecf1",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FaCalendarAlt style={{ color: "#1e3c72", fontSize: "12px" }} />
                <span style={{ fontSize: "12px", color: "#555" }}>
                  Expected by{" "}
                  <strong style={{ color: "#111" }}>{deliveryDate}</strong>
                </span>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "#1e3c72",
                  background: "#f0f8ff",
                  padding: "3px 10px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <MdLocalShipping /> FREE Delivery
              </span>
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 1px 4px rgba(30, 60, 114, 0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 20px",
                borderBottom: "1px solid #e8ecf1",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#222",
                }}
              >
                Items Ordered
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#1e3c72",
                  fontWeight: "600",
                  background: "#f0f8ff",
                  padding: "3px 10px",
                  borderRadius: "4px",
                }}
              >
                {items.length} {items.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            {items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "14px",
                  padding: "14px 20px",
                  borderBottom:
                    i < items.length - 1 ? "1px solid #f5f5f5" : "none",
                }}
              >
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #eee",
                    }}
                  />
                  {item.qty > 1 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-4px",
                        right: "-4px",
                        background: "#1e3c72",
                        color: "white",
                        fontSize: "9px",
                        fontWeight: "700",
                        padding: "1px 5px",
                        borderRadius: "6px",
                      }}
                    >
                      x{item.qty}
                    </span>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4
                    style={{
                      margin: "0 0 3px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#111",
                      lineHeight: "1.3",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.title}
                  </h4>

                  {item.description && (
                    <p
                      style={{
                        margin: "0 0 6px",
                        fontSize: "11px",
                        color: "#888",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.description}
                    </p>
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#111",
                      }}
                    >
                      ₹{item.price?.toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#999",
                            textDecoration: "line-through",
                          }}
                        >
                          ₹{item.originalPrice?.toLocaleString()}
                        </span>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "700",
                            color: "#3b82f6",
                          }}
                        >
                          {Math.round(
                            (1 - item.price / item.originalPrice) * 100,
                          )}
                          % off
                        </span>
                      </>
                    )}
                  </div>

                  <div
                    style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}
                  >
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: "600",
                        color: "#059669",
                        background: "#f0fdf4",
                        padding: "2px 6px",
                        borderRadius: "3px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      <FaTruck style={{ fontSize: "8px" }} /> Free Delivery
                    </span>
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: "600",
                        color: "#1e3c72",
                        background: "#f0f8ff",
                        padding: "2px 6px",
                        borderRadius: "3px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      <FaUndo style={{ fontSize: "8px" }} /> 7 Day Return
                    </span>
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: "600",
                        color: "#ea580c",
                        background: "#fff7ed",
                        padding: "2px 6px",
                        borderRadius: "3px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      <MdVerified style={{ fontSize: "9px" }} /> Genuine
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Savings */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                background: "#fef3c7",
                borderTop: "1px dashed #fcd34d",
              }}
            >
              <FaTag style={{ color: "#d97706", fontSize: "12px" }} />
              <span
                style={{
                  fontSize: "12px",
                  color: "#92400e",
                  fontWeight: "600",
                }}
              >
                You saved ₹{savings.toLocaleString()} on this order! 🎉
              </span>
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 1px 4px rgba(30, 60, 114, 0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "14px 20px",
                borderBottom: "1px solid #e8ecf1",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "#222",
                }}
              >
                Need Help?
              </span>
            </div>

            {[
              {
                icon: <FaHeadset />,
                label: "Contact Customer Support",
                color: "#1e3c72",
                bg: "#f0f8ff",
              },
              {
                icon: <FaUndo />,
                label: "Return / Exchange Policy",
                color: "#ea580c",
                bg: "#fff7ed",
              },
              {
                icon: <FaShieldAlt />,
                label: "Warranty Information",
                color: "#059669",
                bg: "#f0fdf4",
              },
              {
                icon: <FaQuestionCircle />,
                label: "FAQs & Help Center",
                color: "#7c3aed",
                bg: "#f5f3ff",
              },
            ].map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 20px",
                  borderBottom: i < 3 ? "1px solid #f8f8f8" : "none",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#fafbff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "white")
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      background: h.bg,
                      color: h.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                    }}
                  >
                    {h.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    {h.label}
                  </span>
                </div>
                <FaChevronRight style={{ fontSize: "10px", color: "#ccc" }} />
              </div>
            ))}
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 1px 4px rgba(30, 60, 114, 0.08)",
              padding: "16px 20px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
            }}
          >
            {[
              {
                icon: <MdSecurity />,
                t: "Safe Payment",
                s: "256-bit SSL",
                c: "#1e3c72",
                bg: "#f0f8ff",
              },
              {
                icon: <FaUndo />,
                t: "Easy Returns",
                s: "7 day policy",
                c: "#ea580c",
                bg: "#fff7ed",
              },
              {
                icon: <MdVerified />,
                t: "100% Genuine",
                s: "Authentic products",
                c: "#059669",
                bg: "#f0fdf4",
              },
              {
                icon: <FaHeadset />,
                t: "24/7 Support",
                s: "Always available",
                c: "#7c3aed",
                bg: "#f5f3ff",
              },
            ].map((b, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: b.bg,
                    color: b.c,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    flexShrink: 0,
                  }}
                >
                  {b.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "#222",
                    }}
                  >
                    {b.t}
                  </div>
                  <div style={{ fontSize: "10px", color: "#999" }}>{b.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            position: "sticky",
            top: "16px",
            alignSelf: "start",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 1px 4px rgba(30, 60, 114, 0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 18px",
                borderBottom: "1px solid #e8ecf1",
              }}
            >
              <FaMapMarkerAlt style={{ color: "#ef4444", fontSize: "13px" }} />
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "13px",
                  color: "#222",
                  flex: 1,
                }}
              >
                Delivery Address
              </span>
              <MdVerified style={{ color: "#3b82f6", fontSize: "15px" }} />
            </div>

            <div style={{ padding: "14px 18px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "6px",
                }}
              >
                <FaUser style={{ color: "#1e3c72", fontSize: "11px" }} />
                <strong style={{ fontSize: "13px", color: "#111" }}>
                  {customerName}
                </strong>
              </div>

              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: "12px",
                  color: "#555",
                  lineHeight: "1.5",
                  paddingLeft: "17px",
                }}
              >
                {shippingAddress}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <a
                  href={`tel:${phone}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    color: "#059669",
                    textDecoration: "none",
                    background: "#f0fdf4",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    fontWeight: "500",
                  }}
                >
                  <FaPhone style={{ fontSize: "10px" }} /> {phone}
                </a>
                {email && (
                  <a
                    href={`mailto:${email}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      color: "#1e3c72",
                      textDecoration: "none",
                      background: "#f0f8ff",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      fontWeight: "500",
                    }}
                  >
                    <FaEnvelope style={{ fontSize: "10px" }} /> {email}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 1px 4px rgba(30, 60, 114, 0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 18px",
                borderBottom: "1px solid #e8ecf1",
              }}
            >
              <MdPayment style={{ color: "#1e3c72", fontSize: "15px" }} />
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "13px",
                  color: "#222",
                }}
              >
                Price Details
              </span>
            </div>

            <div style={{ padding: "14px 18px" }}>
              {[
                {
                  l: `Price (${items.length} items)`,
                  v: `₹${totalAmount?.toLocaleString()}`,
                  c: "#333",
                },
                { l: "Delivery Charges", v: "FREE", c: "#059669" },
                {
                  l: "Discount",
                  v: `-₹${savings.toLocaleString()}`,
                  c: "#059669",
                },
                { l: "Platform Fee", v: "FREE", c: "#059669" },
              ].map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#555" }}>{r.l}</span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: r.c,
                    }}
                  >
                    {r.v}
                  </span>
                </div>
              ))}

              <div
                style={{
                  borderTop: "1px dashed #d1d5db",
                  margin: "4px 0 12px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                }}
              >
                <strong style={{ fontSize: "14px", color: "#111" }}>
                  Total Amount
                </strong>
                <strong style={{ fontSize: "16px", color: "#1e3c72" }}>
                  ₹{totalAmount?.toLocaleString()}
                </strong>
              </div>

              <div
                style={{
                  background: "#fef3c7",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  marginBottom: "12px",
                  border: "1px solid #fcd34d",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#92400e",
                  }}
                >
                  🎉 You saved ₹{savings.toLocaleString()} on this order
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#f8fafd",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  border: "1px solid #e8ecf1",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      background:
                        paymentMethod === "cod"
                          ? "#fff7ed"
                          : paymentMethod === "upi"
                            ? "#f5f3ff"
                            : "#f0f8ff",
                      color:
                        paymentMethod === "cod"
                          ? "#ea580c"
                          : paymentMethod === "upi"
                            ? "#7c3aed"
                            : "#1e3c72",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                    }}
                  >
                    {getPaymentIcon(paymentMethod)}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "9px",
                        color: "#999",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Paid via
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#222",
                      }}
                    >
                      {getPaymentText(paymentMethod)}
                    </div>
                  </div>
                </div>
                <FaCheckCircle
                  style={{
                    color: "#3b82f6",
                    fontSize: "16px",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 1px 4px rgba(30, 60, 114, 0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 18px",
                borderBottom: "1px solid #e8ecf1",
              }}
            >
              <FaReceipt style={{ color: "#7c3aed", fontSize: "13px" }} />
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "13px",
                  color: "#222",
                }}
              >
                Order Info
              </span>
            </div>

            <div style={{ padding: "14px 18px" }}>
              {[
                { l: "Order ID", v: orderId },
                { l: "Order Date", v: orderDate },
                { l: "Delivery Date", v: deliveryDate },
                { l: "Payment", v: getPaymentText(paymentMethod) },
              ].map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: i < 3 ? "10px" : "0",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#888",
                    }}
                  >
                    {r.l}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#333",
                      maxWidth: "180px",
                      textAlign: "right",
                    }}
                  >
                    {r.v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 1px 4px rgba(30, 60, 114, 0.08)",
              padding: "14px 18px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "11px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #1e3c72 0%, #3d6bb9 100%)",
                color: "white",
                fontSize: "13px",
                fontWeight: "700",
                textDecoration: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaShoppingCart /> Continue Shopping
            </Link>

            <button
              onClick={() => window.print()}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "10px",
                borderRadius: "8px",
                background: "white",
                color: "#1e3c72",
                fontSize: "12px",
                fontWeight: "600",
                border: "1.5px solid #e8ecf1",
                cursor: "pointer",
              }}
            >
              <FaDownload /> Download Invoice
            </button>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => navigate("/cart")}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  padding: "9px",
                  borderRadius: "8px",
                  background: "white",
                  color: "#555",
                  fontSize: "11px",
                  fontWeight: "600",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                }}
              >
                <FaShoppingCart /> Cart
              </button>

              <button
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  padding: "9px",
                  borderRadius: "8px",
                  background: "white",
                  color: "#555",
                  fontSize: "11px",
                  fontWeight: "600",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                }}
              >
                <FaShareAlt /> Share
              </button>

              <a
                href={`https://wa.me/?text=Order ${orderId} confirmed!`}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  padding: "9px",
                  borderRadius: "8px",
                  background: "#f0fdf4",
                  color: "#059669",
                  fontSize: "11px",
                  fontWeight: "600",
                  border: "1px solid #dcfce7",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #f0f8ff, #e8f0fe)",
              borderRadius: "12px",
              padding: "14px 18px",
              border: "1px solid #bfdbfe",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#3b82f6",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                flexShrink: 0,
              }}
            >
              <FaShieldAlt />
            </div>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#1e3c72",
                }}
              >
                100% Purchase Protection
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#1e3c72",
                  marginTop: "2px",
                  opacity: 0.8,
                }}
              >
                Easy returns • Secure payments • 24/7 help
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes pulse2 {
          0%, 100% { box-shadow: 0 2px 6px rgba(30, 60, 114, 0.35); }
          50% { box-shadow: 0 2px 16px rgba(30, 60, 114, 0.55); }
        }
        @media (max-width: 850px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media print {
          button, a[href*="wa.me"] { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default OrderSuccess;
