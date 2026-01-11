import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    phone: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        "http://akhube.online/api/v1/orders/place/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            shippingAddress,
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        alert(err.error || "Order failed");
        return;
      }

      const data = await response.json();
      navigate(`/order/success/${data.id}`);
    } catch (error) {
      console.error("Order error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Shipping Address</h2>

      <input
        className="form-control mb-2"
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="city"
        placeholder="City"
        onChange={handleChange}
      />

      <input
        className="form-control mb-2"
        name="state"
        placeholder="State"
        onChange={handleChange}
      />

      <input
        className="form-control mb-3"
        name="zipCode"
        placeholder="Zip Code"
        onChange={handleChange}
      />

      <button className="btn btn-success w-100" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
