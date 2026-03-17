import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { items } from "./Data";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FiSearch, FiHeart } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";

const Navbar = ({ setData, cart }) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    let filteredData = items;

    if (searchTerm.trim() !== "") {
      filteredData = filteredData.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (category !== "") {
      filteredData = filteredData.filter((p) => p.category === category);
    }

    if (price > 0) {
      filteredData = filteredData.filter((p) => p.price <= price);
    }

    setData(filteredData);
  }, [searchTerm, category, price, setData]);

  const handleFilter = (cat, pr, name) => {
    setCategory(cat);
    setPrice(pr);
    setActiveFilter(name);
  };

  return (
    <>
      <style>{`
        .top-bar {
          background: #232f3e;
          padding: 4px 0;
        }

        .top-bar-inner {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
        }

        .top-bar-left {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #ccc;
          font-size: 12px;
          cursor: pointer;
        }

        .top-bar-left:hover {
          color: white;
        }

        .top-bar-left span {
          color: white;
          font-weight: 600;
        }

        .top-bar-links {
          display: flex;
          gap: 20px;
        }

        .top-bar-links a {
          color: #ccc;
          font-size: 12px;
          text-decoration: none;
          transition: color 0.2s;
        }

        .top-bar-links a:hover {
          color: white;
        }

        .main-nav {
          background: #131921;
          padding: 10px 0;
        }

        .main-nav-inner {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          padding: 0 20px;
          gap: 16px;
        }

        /* Logo */
        .nav-logo {
          text-decoration: none;
          padding: 6px 8px;
          border: 1px solid transparent;
          border-radius: 3px;
          flex-shrink: 0;
          transition: border-color 0.2s;
        }

        .nav-logo:hover {
          border-color: white;
        }

        .nav-logo-text {
          font-size: 22px;
          font-weight: 800;
          color: white;
          letter-spacing: 0.5px;
        }

        .nav-logo-text em {
          color: #ff9900;
          font-style: normal;
        }

        .nav-search {
          flex: 1;
          display: flex;
          height: 40px;
          border-radius: 4px;
          overflow: hidden;
        }

        .nav-search-select {
          background: #e6e6e6;
          border: none;
          padding: 0 8px;
          font-size: 12px;
          color: #555;
          cursor: pointer;
          border-right: 1px solid #ccc;
          outline: none;
        }

        .nav-search-input {
          flex: 1;
          border: none;
          padding: 0 12px;
          font-size: 14px;
          outline: none;
        }

        .nav-search-btn {
          background: #febd69;
          border: none;
          width: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          color: #131921;
          transition: background 0.2s;
        }

        .nav-search-btn:hover {
          background: #f3a847;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        .nav-action-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 6px 10px;
          border: 1px solid transparent;
          border-radius: 3px;
          cursor: pointer;
          text-decoration: none;
          color: white;
          transition: border-color 0.2s;
          white-space: nowrap;
        }

        .nav-action-item:hover {
          border-color: white;
          color: white;
        }

        .nav-action-small {
          font-size: 11px;
          color: #ccc;
          line-height: 1.2;
        }

        .nav-action-big {
          font-size: 13px;
          font-weight: 700;
          line-height: 1.3;
        }

        .nav-cart {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          padding: 6px 10px;
          border: 1px solid transparent;
          border-radius: 3px;
          text-decoration: none;
          color: white;
          position: relative;
          transition: border-color 0.2s;
        }

        .nav-cart:hover {
          border-color: white;
          color: white;
        }

        .nav-cart-icon {
          font-size: 26px;
          position: relative;
        }

        .nav-cart-count {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ff9900;
          color: #131921;
          font-size: 12px;
          font-weight: 800;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-cart-label {
          font-size: 13px;
          font-weight: 700;
        }

        .filter-bar {
          background: #232f3e;
          padding: 0;
        }

        .filter-bar-inner {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          padding: 0 12px;
          gap: 0;
        }

        .filter-tag {
          color: #ff9900;
          font-weight: 700;
          font-size: 13px;
          padding: 8px 14px;
          white-space: nowrap;
          letter-spacing: 0.5px;
        }

        .filter-scroll {
          display: flex;
          align-items: center;
          gap: 0;
          overflow-x: auto;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .filter-scroll::-webkit-scrollbar {
          display: none;
        }

        .filter-item {
          background: none;
          border: none;
          color: white;
          font-size: 13px;
          font-weight: 400;
          padding: 8px 14px;
          cursor: pointer;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }

        .filter-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-bottom-color: rgba(255, 255, 255, 0.5);
        }

        .filter-item.selected {
          color: #ff9900;
          font-weight: 600;
          border-bottom-color: #ff9900;
          background: rgba(255, 153, 0, 0.08);
        }

        .filter-sep {
          width: 1px;
          height: 20px;
          background: rgba(255, 255, 255, 0.15);
          margin: 0 2px;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .main-nav-inner {
            flex-wrap: wrap;
            gap: 8px;
          }

          .nav-search {
            order: 3;
            width: 100%;
          }

          .nav-action-item {
            padding: 4px 6px;
          }

          .nav-action-small,
          .nav-action-big {
            display: none;
          }

          .nav-cart-label {
            display: none;
          }

          .top-bar-links {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .nav-logo-text {
            font-size: 18px;
          }

          .filter-item {
            font-size: 12px;
            padding: 6px 10px;
          }

          .filter-tag {
            font-size: 12px;
            padding: 6px 10px;
          }
        }
      `}</style>

      <header className="sticky-top">
        <nav className="main-nav">
          <div className="main-nav-inner">
            <Link to="/" className="nav-logo">
              <span className="nav-logo-text">
                E-<em>Cart</em>
              </span>
            </Link>

            <form onSubmit={(e) => e.preventDefault()} className="nav-search">
              <select className="nav-search-select">
                <option>All</option>
                <option>Mobiles</option>
                <option>Laptops</option>
                <option>Tablets</option>
              </select>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search E-Cart"
                className="nav-search-input"
              />
              <button type="submit" className="nav-search-btn">
                <FiSearch />
              </button>
            </form>

            <div className="nav-actions">
              <Link to="/login" className="nav-action-item">
                <span className="nav-action-small">Hello, Sign in</span>
                <span className="nav-action-big">Account ▾</span>
              </Link>

              <Link to="/wishlist" className="nav-action-item">
                <span className="nav-action-small">Your</span>
                <span className="nav-action-big">
                  <FiHeart style={{ marginRight: "4px" }} />
                  Wishlist
                </span>
              </Link>

              <Link to="/cart" className="nav-cart">
                <span className="nav-cart-icon">
                  <BsFillCartCheckFill />
                  {cart.length > 0 && (
                    <span className="nav-cart-count">{cart.length}</span>
                  )}
                </span>
                <span className="nav-cart-label">Cart</span>
              </Link>
            </div>
          </div>
        </nav>

        {location.pathname === "/" && (
          <div className="filter-bar">
            <div className="filter-bar-inner">
              <span className="filter-tag">☰ Filters</span>

              <div className="filter-scroll">
                <button
                  onClick={() => handleFilter("", 0, "all")}
                  className={`filter-item ${activeFilter === "all" ? "selected" : ""}`}
                >
                  All Products
                </button>

                <div className="filter-sep" />

                <button
                  onClick={() => handleFilter("mobiles", 0, "mobiles")}
                  className={`filter-item ${activeFilter === "mobiles" ? "selected" : ""}`}
                >
                  Mobiles
                </button>

                <button
                  onClick={() => handleFilter("laptops", 0, "laptops")}
                  className={`filter-item ${activeFilter === "laptops" ? "selected" : ""}`}
                >
                  Laptops
                </button>

                <button
                  onClick={() => handleFilter("tablets", 0, "tablets")}
                  className={`filter-item ${activeFilter === "tablets" ? "selected" : ""}`}
                >
                  Tablets
                </button>

                <div className="filter-sep" />

                <button
                  onClick={() => handleFilter("", 29999, "29999")}
                  className={`filter-item ${activeFilter === "29999" ? "selected" : ""}`}
                >
                  Under ₹29,999
                </button>

                <button
                  onClick={() => handleFilter("", 49999, "49999")}
                  className={`filter-item ${activeFilter === "49999" ? "selected" : ""}`}
                >
                  Under ₹49,999
                </button>

                <button
                  onClick={() => handleFilter("", 69999, "69999")}
                  className={`filter-item ${activeFilter === "69999" ? "selected" : ""}`}
                >
                  Under ₹69,999
                </button>

                <button
                  onClick={() => handleFilter("", 89999, "89999")}
                  className={`filter-item ${activeFilter === "89999" ? "selected" : ""}`}
                >
                  Under ₹89,999
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
export default Navbar;
