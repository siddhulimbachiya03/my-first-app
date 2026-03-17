import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";

const Wishlist = ({ wishlist, setWishlist }) => {
  const removeItem = (id) => {
    const filtered = wishlist.filter((item) => item.id !== id);
    setWishlist(filtered);
  };
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="text-center">
          <h4 className="mt-3">
            Your Wishlist is Empty <FaHeart size={30} color="red" />
          </h4>

          <Link to="/" className="btn btn-warning mt-3">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          {wishlist.map((product) => (
            <div key={product.id} className="col-md-4 my-3">
              <div className="card shadow">
                <img
                  src={product.imgSrc}
                  className="card-img-top"
                  alt={product.title}
                />

                <div className="card-body text-center">
                  <h5>{product.title}</h5>

                  <p>{product.description}</p>

                  <button className="btn btn-primary">{product.price} ₹</button>

                  <button
                    onClick={() => removeItem(product.id)}
                    className="btn btn-danger mx-2"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
