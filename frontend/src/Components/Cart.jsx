import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = "http://172.105.34.207:8000/api/v1/cart/";

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Cart error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  if (loading) return <p>Loading cart...</p>;
  if (!cart || !cart.items || cart.items.length === 0)
    return <p>Your cart is empty</p>;

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>

      {cart.items.map((item) => (
        <div
          key={item.id}
         className="card mb-3 p-3 d-flex flex-row align-items-center"
        >
          <img
            src={item.product.image}
            alt={item.product.name}
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />

          <div className="ms-3 flex-grow-1">
            <h5>{item.product.name}</h5>
            <p>
              ₦{item.product.price} × {item.quantity}
            </p>
          </div>

          <strong>₦{item.subtotal}</strong>
        </div>
      ))}

      <hr />

      <h4>Total: ₦{cart.total_price}</h4>
      <button
                className="btn btn-primary btn-lg w-100 py-3 mb-3 fw-bold"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>

              <div className="text-center">
                <small className="text-muted">
                  <i className="bi bi-shield-check me-1"></i>
                  Secure Checkout
                </small>
              </div>
    </div>
  );
};

export default Cart;
