import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ECartLoginScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .ecart-input:focus { border-color: #2874f0 !important; box-shadow: none !important; outline: none; }
      .btn-login:hover { box-shadow: 0 4px 8px 0 rgba(0,0,0,.2) !important; transform: translateY(-2px); }
      .btn-signup:hover { box-shadow: 0 4px 8px 0 rgba(0,0,0,.1) !important; transform: translateY(-2px); }
      .ecart-link:hover { color: #2874f0 !important; text-decoration: underline !important; }

      /* Animation Keyframes */
      @keyframes slideInFromLeft {
        0% { opacity: 0; transform: translateX(-150px); }
        100% { opacity: 1; transform: translateX(0); }
      }

      @keyframes slideInFromRight {
        0% { opacity: 0; transform: translateX(150px); }
        100% { opacity: 1; transform: translateX(0); }
      }

      /* Animation Classes */
      .animate-left {
        animation: slideInFromLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
      
      .animate-right {
        animation: slideInFromRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      alert("Login Successful");
      navigate("/");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div style={s.page}>
      <div className="animate-left" style={s.leftSide}>
        <div style={s.formContainer}>
          <div style={s.logoWrapper}>
            <span style={s.logoText}>
              E-Cart<span style={{ color: "#ff9900" }}>.</span>
            </span>
            <div style={s.logoUnderline}></div>
          </div>

          <div style={s.loginBox}>
            <h1 style={s.title}>Login</h1>
            <p style={s.subtitle}>
              Get access to your Orders, Wishlist and Recommendations
            </p>
            <form onSubmit={handleSubmit}>
              <div style={s.fieldGroup}>
                <label style={s.label}>Enter Email/Mobile number</label>
                <div style={s.inputWrapper}>
                  <input
                    type="text"
                    className="ecart-input"
                    style={s.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <svg
                    style={s.icon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
              </div>

              <div style={s.fieldGroup}>
                <div style={s.passwordLabelRow}>
                  <label style={s.label}>Enter Password</label>
                  <Link to="#" className="ecart-link" style={s.forgotLink}>
                    Forgot ?
                  </Link>
                </div>
                <div style={s.inputWrapper}>
                  <input
                    type="password"
                    className="ecart-input"
                    style={s.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <svg
                    style={s.icon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>

              <div style={s.buttonGroup}>
                <button type="submit" className="btn-login" style={s.loginBtn}>
                  Login
                </button>

                <button
                  type="button"
                  className="btn-signup"
                  style={s.signupBtn}
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="animate-right" style={s.rightSide}>
        <div style={s.centerGraphic}>
          <div style={s.textBrand}>E-CART</div>
          <div style={s.textLogin}>LOGIN</div>
        </div>
      </div>
    </div>
  );
};

const s = {
  page: {
    height: "100vh",
    display: "flex",
    fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
    backgroundColor: "#fff",
    overflow: "hidden",
  },

  leftSide: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingTop: "40px",
  },

  formContainer: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  logoWrapper: {
    marginBottom: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  logoText: {
    fontSize: "36px",
    fontWeight: "800",
    letterSpacing: "-1px",
    color: "#111",
  },

  logoUnderline: {
    width: "100%",
    height: "4px",
    backgroundColor: "#ff9900",
    borderRadius: "2px",
    marginTop: "2px",
  },

  loginBox: {
    width: "100%",
    padding: "10px 20px",
  },

  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#000",
  },

  subtitle: {
    fontSize: "13px",
    color: "#878787",
    marginBottom: "30px",
    marginTop: "0",
  },

  fieldGroup: {
    marginBottom: "20px",
  },

  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#212121",
    marginBottom: "8px",
    display: "block",
  },

  passwordLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  forgotLink: {
    fontSize: "11px",
    color: "#e45b45",
    textDecoration: "none",
    fontWeight: "500",
  },

  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  input: {
    width: "100%",
    padding: "12px 40px 12px 15px",
    border: "1px solid #d4d5d9",
    borderRadius: "25px",
    fontSize: "14px",
    color: "#212121",
    transition: "all 0.2s ease",
  },

  icon: {
    position: "absolute",
    right: "15px",
    width: "18px",
    height: "18px",
    color: "#878787",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    marginTop: "25px",
  },

  loginBtn: {
    flex: 1,
    backgroundColor: "#2874f0",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    padding: "12px 0",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  signupBtn: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#2874f0",
    border: "1px solid #d4d5d9",
    borderRadius: "25px",
    padding: "12px 0",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  rightSide: {
    flex: "1",
    backgroundColor: "#D3AD82",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  centerGraphic: {
    textAlign: "center",
  },

  textBrand: {
    fontSize: "75px",
    fontWeight: "900",
  },

  textLogin: {
    fontSize: "75px",
    fontWeight: "900",
    color: "transparent",
    WebkitTextStroke: "2px #000",
  },
};

export default ECartLoginScreen;
