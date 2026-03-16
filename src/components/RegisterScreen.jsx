import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .ecart-input:focus { border-color: #2874f0 !important; box-shadow: none !important; outline: none; }
      .btn-active:hover { box-shadow: 0 4px 12px rgba(40,116,240,0.3) !important; transform: translateY(-2px); }
      .btn-inactive:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.08) !important; transform: translateY(-2px); }
      .ecart-link:hover { color: #2874f0 !important; text-decoration: underline !important; }

      /* Animations */
      @keyframes fadeUp {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @keyframes scaleReveal {
        0% { opacity: 0; transform: scale(1.05); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes formSwitch {
        0% { opacity: 0; filter: blur(5px); transform: translateY(10px); }
        100% { opacity: 1; filter: blur(0); transform: translateY(0); }
      }

      .stagger-1 { opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.1s; }
      .stagger-2 { opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.2s; }
      .stagger-3 { opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.3s; }
      .stagger-4 { opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.4s; }
      .stagger-5 { opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: 0.5s; }

      .animate-right-side { animation: scaleReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .animate-form-switch { animation: formSwitch 0.5s ease-out forwards; }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("ecart_user"));

    if (
      savedUser &&
      savedUser.email === email &&
      savedUser.password === password
    ) {
      alert("Login Successful! Welcome " + savedUser.name);
      navigate("/");
    } else {
      alert("Invalid Email or Password. Please try again.");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = { name, email, password };
    localStorage.setItem("ecart_user", JSON.stringify(userData));

    alert("Account Created Successfully! Please Login.");

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsLogin(true);
  };

  return (
    <div style={s.page}>
      <div style={s.leftSide}>
        <div style={s.formContainer}>
          <div className="stagger-1" style={s.logoWrapper}>
            <span style={s.logoText}>
              E-Cart<span style={{ color: "#ff9900" }}>.</span>
            </span>
            <div style={s.logoUnderline}></div>
          </div>

          <div style={s.loginBox}>
            <div className="stagger-2">
              <h1 style={s.title}>{isLogin ? "Login" : "Sign Up"}</h1>
              <p style={s.subtitle}>
                {isLogin
                  ? "Get access to your Orders, Wishlist and Recommendations"
                  : "Create a new account to get started"}
              </p>
            </div>

            <div
              key={isLogin ? "login" : "register"}
              className="animate-form-switch"
            >
              {isLogin ? (
                <form onSubmit={handleLoginSubmit}>
                  <div className="stagger-3" style={s.fieldGroup}>
                    <label style={s.label}>Enter Email</label>
                    <div style={s.inputWrapper}>
                      <input
                        type="email"
                        className="ecart-input"
                        style={s.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <MailIcon />
                    </div>
                  </div>

                  <div className="stagger-4" style={s.fieldGroup}>
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
                      <LockIcon />
                    </div>
                  </div>

                  <div className="stagger-5" style={s.buttonGroup}>
                    <button
                      type="submit"
                      className="btn-active"
                      style={s.btnActive}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className="btn-inactive"
                      style={s.btnInactive}
                      onClick={() => setIsLogin(false)}
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit}>
                  <div className="stagger-3" style={s.fieldGroup}>
                    <label style={s.label}>Enter Name</label>
                    <div style={s.inputWrapper}>
                      <input
                        type="text"
                        className="ecart-input"
                        style={s.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <UserIcon />
                    </div>
                  </div>

                  <div className="stagger-3" style={s.fieldGroup}>
                    <label style={s.label}>Enter Email</label>
                    <div style={s.inputWrapper}>
                      <input
                        type="email"
                        className="ecart-input"
                        style={s.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <MailIcon />
                    </div>
                  </div>

                  <div className="stagger-4" style={s.fieldGroup}>
                    <label style={s.label}>Password</label>
                    <div style={s.inputWrapper}>
                      <input
                        type="password"
                        className="ecart-input"
                        style={s.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <LockIcon />
                    </div>
                  </div>

                  <div className="stagger-4" style={s.fieldGroup}>
                    <label style={s.label}>Confirm Password</label>
                    <div style={s.inputWrapper}>
                      <input
                        type="password"
                        className="ecart-input"
                        style={s.input}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <LockIcon />
                    </div>
                  </div>

                  <div className="stagger-5" style={s.buttonGroup}>
                    <button
                      type="button"
                      className="btn-inactive"
                      style={s.btnInactive}
                      onClick={() => setIsLogin(true)}
                    >
                      Login
                    </button>
                    <button
                      type="submit"
                      className="btn-active"
                      style={s.btnActive}
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="animate-right-side" style={s.rightSide}>
        <div style={s.centerGraphic}>
          <div style={s.textBrand}>E-CART</div>
          <div style={s.textLogin}>{isLogin ? "LOGIN" : "JOIN US"}</div>
        </div>
      </div>
    </div>
  );
};

const MailIcon = () => (
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
);
const LockIcon = () => (
  <svg
    style={s.icon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);
const UserIcon = () => (
  <svg
    style={s.icon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

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
    paddingTop: "60px",
    overflowY: "auto",
  },
  formContainer: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoWrapper: {
    marginBottom: "35px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoText: {
    fontSize: "38px",
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
  loginBox: { width: "100%", padding: "10px 20px", paddingBottom: "40px" },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#000",
  },
  subtitle: {
    fontSize: "13px",
    color: "#878787",
    marginBottom: "30px",
    marginTop: "0",
  },
  fieldGroup: { marginBottom: "18px" },
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
    fontSize: "12px",
    color: "#e45b45",
    textDecoration: "none",
    fontWeight: "600",
  },
  inputWrapper: { position: "relative", display: "flex", alignItems: "center" },
  input: {
    width: "100%",
    padding: "12px 40px 12px 15px",
    border: "1px solid #d4d5d9",
    borderRadius: "25px",
    fontSize: "14px",
    color: "#212121",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
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
  btnActive: {
    flex: 1,
    backgroundColor: "#2874f0",
    color: "#fff",
    border: "none",
    borderRadius: "25px",
    padding: "14px 0",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  btnInactive: {
    flex: 1,
    backgroundColor: "#fff",
    color: "#2874f0",
    border: "1px solid #d4d5d9",
    borderRadius: "25px",
    padding: "14px 0",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  rightSide: {
    flex: "1",
    backgroundColor: "#D3AD82",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  centerGraphic: { textAlign: "center" },
  textBrand: { fontSize: "80px", fontWeight: "900", letterSpacing: "2px" },
  textLogin: {
    fontSize: "80px",
    fontWeight: "900",
    color: "transparent",
    WebkitTextStroke: "2px #000",
    transition: "all 0.4s ease-in-out",
    letterSpacing: "2px",
  },
};

export default RegisterScreen;
