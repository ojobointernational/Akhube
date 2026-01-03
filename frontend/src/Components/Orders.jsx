import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("accessToken");

      try {
        const response = await fetch(
          "http://172.105.34.207:8000/api/v1/orders/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Orders error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (orders.length === 0) return <p>No orders yet</p>;

  return (
    <div className="container mt-5">
      <h2>My Orders</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>₦{order.grand_total}</td>
              <td>{order.status}</td>
              <td>
                {new Date(order.created_at).toLocaleDateString()}
              </td>
              <td>
                <Link
                  to={`/orders/${order.id}`}
                  className="btn btn-sm btn-primary"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
