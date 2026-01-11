import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch(`/api/v1/orders/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch order");
        return res.json();
      })
      .then((data) => setOrder(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading order...</p>;
  if (!order) return <p>Order not found</p>;

  return (
    <div className="container mt-5">
      <h2>Order #{order.id}</h2>
      <p>Status: {order.status}</p>
      <p>Total: ₦{order.grand_total}</p>

      <h4 className="mt-4">Items</h4>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            {item.product_name} × {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
