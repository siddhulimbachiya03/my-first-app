import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  CreditCard,
  Smartphone,
  Truck,
  ChevronLeft,
  Loader2,
  Package,
  MapPin,
  User,
  Phone,
  Mail,
  Home,
  Building2,
  Hash,
  Shield,
  Banknote,
} from "lucide-react";

const Payment = ({ cart, setCart }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    items = [],
    totalAmount = 0,
    isSingleProduct = false,
  } = location.state || {};

  const formatPrice = (price) => {
    const cleaned = String(price ?? "").replace(/[^\d.]/g, "");
    const num = parseFloat(cleaned);
    if (!cleaned || isNaN(num)) return "0";
    return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(
      num,
    );
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "cod",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const generateOrderId = () =>
    "ORD" + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();

  const getDeliveryDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + Math.floor(Math.random() * 3) + 5);
    return d.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Please fill all required fields!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const orderDetails = {
        orderId: generateOrderId(),
        items,
        totalAmount,
        customerName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        shippingAddress: `${formData.address}, ${formData.city} - ${formData.pincode}`,
        paymentMethod: formData.paymentMethod,
        orderDate: new Date().toLocaleDateString("en-IN"),
        deliveryDate: getDeliveryDate(),
      };
      if (isSingleProduct) {
        setCart(cart.filter((ci) => ci.id !== items[0]?.id));
      } else {
        setCart([]);
      }
      setLoading(false);
      navigate("/order-success", { state: { orderDetails } });
    }, 2000);
  };

  const paymentMethods = [
    {
      value: "cod",
      label: "Cash on Delivery",
      sublabel: "Pay when your order arrives",
      Icon: Banknote,
    },
    {
      value: "upi",
      label: "UPI",
      sublabel: "GPay / PhonePe / Paytm",
      Icon: Smartphone,
    },
    {
      value: "card",
      label: "Credit / Debit Card",
      sublabel: "All major cards accepted",
      Icon: CreditCard,
    },
  ];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .pr { font-family: 'Inter', sans-serif; background: linear-gradient(135deg, #f0f4f8 0%, #e8eef7 100%); min-height: 100vh; }

    /* NAV */
    .pr-nav {
      background: linear-gradient(90deg, #1e3c72 0%, #2a5298 100%); 
      padding: 0 32px; height: 58px;
      display: flex; align-items: center; gap: 16px;
      position: sticky; top: 0; z-index: 100;
      box-shadow: 0 4px 20px rgba(30, 60, 114, 0.3);
    }
    .pr-logo  { font-size: 22px; font-weight: 800; color: #00d4ff; letter-spacing: -1px; }
    .pr-sep   { width: 1px; height: 20px; background: rgba(255,255,255,.2); }
    .pr-nav-t { color: #b0d4ff; font-size: 13px; font-weight: 500; }
    .pr-ssl {
      margin-left: auto; display: flex; align-items: center; gap: 5px;
      background: rgba(0, 212, 255, 0.15); border: 1px solid rgba(0, 212, 255, 0.3);
      border-radius: 20px; padding: 4px 12px;
      font-size: 11px; color: #00d4ff; font-weight: 600;
    }

    /* STEPS */
    .pr-steps-bar { background: #fff; border-bottom: 1px solid #e0e7f1; padding: 13px 32px; }
    .pr-steps {
      max-width: 420px; margin: 0 auto;
      display: flex; align-items: center;
    }
    .pr-step {
      display: flex; flex-direction: column; align-items: center; gap: 4px;
      flex: 1; position: relative;
    }
    .pr-step:not(:last-child)::after {
      content: ''; position: absolute; top: 13px; left: 60%; right: -10%;
      height: 2px; background: #e0e7f1;
    }
    .pr-step.sd:not(:last-child)::after,
    .pr-step.sa:not(:last-child)::after { background: linear-gradient(90deg, #2a5298 0%, #6ba3d6 100%); }
    .pr-dot {
      width: 26px; height: 26px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 700;
      background: #e0e7f1; color: #7b8fa3;
      position: relative; z-index: 1;
    }
    .pr-step.sd .pr-dot,
    .pr-step.sa .pr-dot { background: linear-gradient(135deg, #2a5298 0%, #6ba3d6 100%); color: #fff; }
    .pr-step.sa .pr-dot { box-shadow: 0 0 0 4px rgba(42, 82, 152, 0.15); }
    .pr-dot-lbl { font-size: 9px; font-weight: 700; color: #7b8fa3; text-transform: uppercase; letter-spacing: .6px; }
    .pr-step.sd .pr-dot-lbl,
    .pr-step.sa .pr-dot-lbl { color: #2a5298; }

    /* BODY */
    .pr-body { padding: 24px 24px 56px; }
    .pr-layout {
      max-width: 1000px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 340px;
      gap: 18px; align-items: start;
    }
    @media (max-width: 760px) {
      .pr-layout { grid-template-columns: 1fr; }
      .pr-right  { order: -1; }
      .pr-body   { padding: 16px 14px 40px; }
      .pr-nav    { padding: 0 16px; }
      .pr-steps-bar { padding: 12px 16px; }
    }

    /* CARD */
    .pr-card { 
      background: #fff; 
      border: 1px solid #e0e7f1; 
      border-radius: 14px; 
      overflow: hidden; 
      box-shadow: 0 2px 8px rgba(30, 60, 114, 0.08);
      transition: all 0.3s ease;
    }
    .pr-card:hover { box-shadow: 0 4px 16px rgba(30, 60, 114, 0.12); }
    .pr-card + .pr-card { margin-top: 14px; }
    .pr-head  { 
      padding: 14px 20px; 
      background: linear-gradient(90deg, #f8fafd 0%, #f0f4f8 100%); 
      border-bottom: 1px solid #e0e7f1; 
      display: flex; align-items: center; gap: 11px; 
    }
    .pr-badge { 
      width: 26px; height: 26px; border-radius: 50%; 
      background: linear-gradient(135deg, #2a5298 0%, #6ba3d6 100%);
      color: #fff; font-size: 12px; font-weight: 700; 
      display: flex; align-items: center; justify-content: center; flex-shrink: 0; 
      box-shadow: 0 2px 8px rgba(42, 82, 152, 0.25);
    }
    .pr-head h2 { font-size: 14px; font-weight: 700; color: #1e3c72; }
    .pr-cbody { padding: 20px; }

    /* SEC */
    .pr-sec { font-size: 10px; font-weight: 700; color: #7b8fa3; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center; gap: 8px; margin-bottom: 13px; }
    .pr-sec::after { content: ''; flex: 1; height: 1px; background: #e8eef7; }
    .pr-sec svg { color: #6ba3d6; }

    /* FIELDS */
    .pr-f { margin-bottom: 12px; }
    .pr-lbl { display: flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600; color: #4b5563; margin-bottom: 5px; }
    .pr-lbl svg { color: #a8b8cc; }
    .req { color: #ef4444; }
    .pr-inp {
      width: 100%; padding: 9px 12px;
      border: 1.5px solid #dce4f0; border-radius: 8px;
      font-size: 14px; font-family: 'Inter', sans-serif;
      color: #1e3c72; background: #fff; outline: none;
      transition: border-color .18s, box-shadow .18s;
    }
    .pr-inp::placeholder { color: #a8b8cc; }
    .pr-inp:hover { border-color: #c0cde0; }
    .pr-inp:focus { border-color: #2a5298; box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1); }
    textarea.pr-inp { resize: vertical; min-height: 68px; line-height: 1.5; }
    .pr-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

    /* DIVIDER */
    .pr-div { border: none; border-top: 1px solid #e8eef7; margin: 16px 0; }

    /* PAYMENT */
    .pr-methods { display: flex; flex-direction: column; gap: 8px; }
    .pr-pm {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 14px; border: 1.5px solid #dce4f0; border-radius: 10px;
      cursor: pointer; background: #fff; transition: all .18s; user-select: none;
    }
    .pr-pm:hover { border-color: #6ba3d6; background: #f8fafd; }
    .pr-pm.on    { border-color: #2a5298; background: #f0f4f8; box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.08); }
    .pr-pm-ico {
      width: 38px; height: 38px; border-radius: 9px;
      background: #f8fafd; border: 1px solid #dce4f0;
      display: flex; align-items: center; justify-content: center;
      color: #6ba3d6; flex-shrink: 0; transition: all .18s;
    }
    .pr-pm.on .pr-pm-ico { background: #e8eef7; border-color: #bccde8; color: #2a5298; }
    .pr-pm-txt { flex: 1; }
    .pr-pm-txt strong { display: block; font-size: 13px; font-weight: 600; color: #1e3c72; margin-bottom: 1px; }
    .pr-pm-txt small  { font-size: 11px; color: #7b8fa3; }
    .pr-pm input { display: none; }
    .pr-radio {
      width: 18px; height: 18px; border-radius: 50%; border: 2px solid #c0cde0;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all .18s;
    }
    .pr-pm.on .pr-radio { border-color: #2a5298; background: linear-gradient(135deg, #2a5298 0%, #6ba3d6 100%); }
    .pr-radio::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #fff; opacity: 0; transition: opacity .18s; }
    .pr-pm.on .pr-radio::after { opacity: 1; }

    /* BUTTONS */
    .pr-acts { display: flex; gap: 10px; margin-top: 20px; }
    .pr-back {
      display: flex; align-items: center; gap: 5px;
      padding: 11px 16px; border: 1.5px solid #dce4f0; border-radius: 8px;
      background: #fff; font-size: 13px; font-weight: 600; color: #4b5563;
      cursor: pointer; font-family: 'Inter', sans-serif; transition: all .15s; white-space: nowrap;
    }
    .pr-back:hover    { border-color: #6ba3d6; color: #2a5298; background: #f8fafd; }
    .pr-back:disabled { opacity: .4; cursor: not-allowed; }
    .pr-place {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 7px;
      padding: 12px 20px; 
      background: linear-gradient(135deg, #2a5298 0%, #6ba3d6 100%);
      border: none; border-radius: 8px;
      font-size: 14px; font-weight: 700; color: #fff;
      cursor: pointer; font-family: 'Inter', sans-serif;
      box-shadow: 0 4px 15px rgba(42, 82, 152, 0.3); 
      transition: all .15s;
    }
    .pr-place:hover:not(:disabled)  { 
      transform: translateY(-2px); 
      box-shadow: 0 6px 20px rgba(42, 82, 152, 0.4); 
    }
    .pr-place:active:not(:disabled) { transform: translateY(0); }
    .pr-place:disabled { opacity: .6; cursor: not-allowed; }
    .spin { animation: spin .8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* SUMMARY */
    .pr-sticky { position: sticky; top: 72px; }
    .pr-item   { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-bottom: 1px solid #e8eef7; }
    .pr-item:last-child { border-bottom: none; }
    .pr-item img { width: 56px; height: 56px; object-fit: cover; border-radius: 8px; border: 1px solid #dce4f0; flex-shrink: 0; background: #f8fafd; }
    .pr-item-t { font-size: 13px; font-weight: 500; color: #1e3c72; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 3px; }
    .pr-item-p { font-size: 14px; font-weight: 700; color: #2a5298; }
    .pr-prow   { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; font-size: 13px; color: #4b5563; }
    .pr-prow b { font-size: 15px; font-weight: 800; color: #1e3c72; }
    .pr-free   { color: #059669; font-weight: 600; font-size: 12px; }
    .pr-trust  { display: flex; align-items: center; gap: 7px; padding: 9px 18px; border-top: 1px solid #e8eef7; font-size: 11px; color: #4b5563; font-weight: 500; }
    .pr-trust svg { color: #059669; flex-shrink: 0; }

    /* EMPTY */
    .pr-empty { max-width: 340px; margin: 80px auto; text-align: center; }
    .pr-empty-ico { width: 72px; height: 72px; background: #e8eef7; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; color: #6ba3d6; }
    .pr-empty h2  { font-size: 18px; font-weight: 700; color: #1e3c72; margin-bottom: 8px; }
    .pr-empty p   { font-size: 13px; color: #7b8fa3; margin-bottom: 20px; }
    .pr-empty-btn { 
      padding: 10px 28px; 
      background: linear-gradient(135deg, #2a5298 0%, #6ba3d6 100%);
      border: none; border-radius: 8px; 
      font-size: 14px; font-weight: 700; color: #fff; 
      cursor: pointer; font-family: 'Inter', sans-serif; 
      box-shadow: 0 4px 15px rgba(42, 82, 152, 0.3);
    }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="pr">
        <nav className="pr-nav">
          <span className="pr-logo">ShopKart</span>
          <div className="pr-sep" />
          <span className="pr-nav-t">Secure Checkout</span>
          <span className="pr-ssl">
            <Shield size={11} /> SSL Encrypted
          </span>
        </nav>

        <div className="pr-steps-bar">
          <div className="pr-steps">
            {[
              { n: 1, lbl: "Cart", cls: "sd" },
              { n: 2, lbl: "Address", cls: "sa" },
              { n: 3, lbl: "Payment", cls: "sa" },
              { n: 4, lbl: "Done", cls: "" },
            ].map((s) => (
              <div key={s.n} className={`pr-step ${s.cls}`}>
                <div className="pr-dot">{s.n}</div>
                <div className="pr-dot-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pr-body">
          {items.length === 0 ? (
            <div className="pr-empty">
              <div className="pr-empty-ico">
                <ShoppingBag size={32} />
              </div>
              <h2>No items to checkout</h2>
              <p>Your cart is empty. Add some items before proceeding.</p>
              <button
                className="pr-empty-btn"
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </button>
            </div>
          ) : (
            <div className="pr-layout">
              <div>
                <div className="pr-card">
                  <div className="pr-head">
                    <div className="pr-badge">1</div>
                    <h2>Delivery Address</h2>
                  </div>
                  <div className="pr-cbody">
                    <div className="pr-sec">
                      <User size={11} />
                      Personal Info
                    </div>

                    <div className="pr-f">
                      <label className="pr-lbl">
                        <User size={12} />
                        Full Name <span className="req">*</span>
                      </label>
                      <input
                        className="pr-inp"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="pr-2col">
                      <div className="pr-f">
                        <label className="pr-lbl">
                          <Mail size={12} />
                          Email
                        </label>
                        <input
                          className="pr-inp"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="pr-f">
                        <label className="pr-lbl">
                          <Phone size={12} />
                          Phone <span className="req">*</span>
                        </label>
                        <input
                          className="pr-inp"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 00000 00000"
                        />
                      </div>
                    </div>

                    <hr className="pr-div" />
                    <div className="pr-sec">
                      <Home size={11} />
                      Shipping Address
                    </div>

                    <div className="pr-f">
                      <label className="pr-lbl">
                        <MapPin size={12} />
                        Street Address <span className="req">*</span>
                      </label>
                      <textarea
                        className="pr-inp"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="House no., Street, Area, Landmark"
                      />
                    </div>

                    <div className="pr-2col">
                      <div className="pr-f">
                        <label className="pr-lbl">
                          <Building2 size={12} />
                          City
                        </label>
                        <input
                          className="pr-inp"
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="City"
                        />
                      </div>
                      <div className="pr-f">
                        <label className="pr-lbl">
                          <Hash size={12} />
                          Pincode
                        </label>
                        <input
                          className="pr-inp"
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="000 000"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pr-card">
                  <div className="pr-head">
                    <div className="pr-badge">2</div>
                    <h2>Payment Method</h2>
                  </div>
                  <div className="pr-cbody">
                    <div className="pr-methods">
                      {paymentMethods.map(
                        ({ value, label, sublabel, Icon }) => (
                          <label
                            key={value}
                            className={`pr-pm ${formData.paymentMethod === value ? "on" : ""}`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={value}
                              checked={formData.paymentMethod === value}
                              onChange={handleChange}
                            />
                            <div className="pr-pm-ico">
                              <Icon size={18} />
                            </div>
                            <div className="pr-pm-txt">
                              <strong>{label}</strong>
                              <small>{sublabel}</small>
                            </div>
                            <div className="pr-radio" />
                          </label>
                        ),
                      )}
                    </div>

                    <div className="pr-acts">
                      <button
                        className="pr-back"
                        onClick={() => navigate(-1)}
                        disabled={loading}
                      >
                        <ChevronLeft size={15} /> Back
                      </button>
                      <button
                        className="pr-place"
                        onClick={handlePayment}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 size={16} className="spin" /> Processing…
                          </>
                        ) : (
                          <>
                            <Shield size={15} /> Place Order &nbsp;·&nbsp; ₹
                            {formatPrice(totalAmount)}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pr-right pr-sticky">
                <div className="pr-card">
                  <div className="pr-head">
                    <div className="pr-badge">
                      <Package size={13} />
                    </div>
                    <h2>Order Summary</h2>
                  </div>
                  <div className="pr-cbody">
                    {items.map((item, i) => (
                      <div key={i} className="pr-item">
                        <img src={item.imgSrc} alt={item.title} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="pr-item-t">{item.title}</div>
                          <div className="pr-item-p">
                            ₹{formatPrice(item.price)}
                          </div>
                        </div>
                      </div>
                    ))}

                    <hr className="pr-div" />

                    <div className="pr-prow">
                      <span>
                        Subtotal ({items.length} item
                        {items.length !== 1 ? "s" : ""})
                      </span>
                      <span>₹{formatPrice(totalAmount)}</span>
                    </div>
                    <div className="pr-prow">
                      <span>Delivery</span>
                      <span className="pr-free">FREE</span>
                    </div>
                    <div className="pr-prow">
                      <span>Discount</span>
                      <span
                        style={{
                          color: "#dc2626",
                          fontWeight: 600,
                          fontSize: 12,
                        }}
                      >
                        — ₹0
                      </span>
                    </div>

                    <hr className="pr-div" />

                    <div className="pr-prow">
                      <b>Total Amount</b>
                      <b>₹{formatPrice(totalAmount)}</b>
                    </div>
                  </div>

                  <div className="pr-trust">
                    <Truck size={13} /> Free delivery on this order
                  </div>
                  <div
                    className="pr-trust"
                    style={{ borderTop: "none", paddingTop: 0 }}
                  >
                    <Shield size={13} /> 100% secure &amp; encrypted checkout
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
