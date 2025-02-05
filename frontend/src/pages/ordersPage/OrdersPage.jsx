import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./OrdersPage.css";
import OrderCard from "../../components/OrderCard/OrderCard";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/v1/get-parcels");

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.parcels);
        setFilteredOrders(data.parcels);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusFilter = (status) => {
    setStatus(status);
    setActiveButton(status);
    if (status === "") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === status));
    }
  };

  return (
    <div className="orders-container">
      <h1>All Orders</h1>
      <p>Here are all orders in the system:</p>

      <div className="buttons-container">
        <button className={activeButton === "" ? "active" : ""} onClick={() => handleStatusFilter("")}>
          All
        </button>
        <button className={activeButton === "delivered" ? "active" : ""} onClick={() => handleStatusFilter("delivered")}>
          Delivered
        </button>
        <button className={activeButton === "pending" ? "active" : ""} onClick={() => handleStatusFilter("pending")}>
          Pending
        </button>
        <button className={activeButton === "cancelled" ? "active" : ""} onClick={() => handleStatusFilter("canceled")}>
          Cancelled
        </button>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="orders-list">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Link key={order.id} to={`/parcelsadm/${order.id}`}>
                <OrderCard order={order} />
              </Link>
            ))
          ) : (
            <p>No orders found for this status.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
