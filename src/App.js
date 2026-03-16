
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
import SearchItem from "./components/SearchItem";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Wishlist from "./components/Wishlist";
import Payment from "./components/Payment";
import { items } from "./components/Data";
import OrderSuccess from "./components/OrderSuccess";
import RegisterScreen from "./components/RegisterScreen";

const App = () => {

  const [data, setData] = useState(items);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  return (
    <Router>

      <Navbar
        cart={cart}
        wishlist={wishlist}
        setData={setData}
      />

      <Routes>

        <Route
          path="/"
          element={
            <Product
              items={data}
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetail
              items={data}
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />

        <Route
          path="/search/:term"
          element={
            <SearchItem
              items={data}
              cart={cart}
              setCart={setCart}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />

        <Route
          path="/payment"
          element={
            <Payment
              cart={cart}
              setCart={setCart}
            />
          }
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<RegisterScreen />}
        />

      </Routes>

    </Router>
  );
};

export default App;