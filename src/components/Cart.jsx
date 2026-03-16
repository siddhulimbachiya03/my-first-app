import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    navigate("/payment", {
      state: {
        items: [product],
        totalAmount: product.price,
        isSingleProduct: true,
      },
    });
  };

  const handleCheckOut = () => {
    const totalAmount = cart.reduce((total, item) => total + item.price, 0);
    navigate("/payment", {
      state: {
        items: cart,
        totalAmount,
        isSingleProduct: false,
      },
    });
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  return (
    <>
      <div className="container my-5" style={{ width: "54%" }}>
        {cart.length === 0 ? (
          <div className="text-center">
            <h1>Your Cart is Empty</h1>
            <Link to={"/"} className="btn btn-warning">
              Continue Shopping...
            </Link>
          </div>
        ) : (
          cart.map((product, index) => {
            return (
              <div
                className="card mb-3 my-5"
                key={index}
                style={{
                  width: "700px",
                  height: "220px",
                  overflow: "hidden",
                }}
              >
                <div className="row g-0" style={{ height: "100%" }}>
                  <div
                    className="col-md-4"
                    style={{
                      height: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={product.imgSrc}
                      alt="..."
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div
                    className="col-md-8"
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div className="card-body text-center">
                      <h5
                        className="card-title"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {product.title}
                      </h5>

                      <p
                        className="card-text"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          textOverflow: "ellipsis",
                          minHeight: "60px",
                          maxHeight: "60px",
                        }}
                      >
                        {product.description}
                      </p>

                      <button className="btn btn-primary mx-2">
                        {product.price} ₹
                      </button>

                      <button
                        className="btn btn-warning mx-2"
                        onClick={() => handleBuyNow(product)}
                      >
                        Buy Now
                      </button>

                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {cart.length !== 0 && (
        <div
          className="container text-center my-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button className="btn btn-warning mx-5" onClick={handleCheckOut}>
            CheckOut ({cart.length} items)
          </button>
          <button onClick={() => setCart([])} className="btn btn-danger">
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
