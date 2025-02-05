






import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Use Link to navigate to the details page
import "./MyOrdersPage.css";
import OrderCard from "../../components/OrderCard/OrderCard";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [filteredOrders, setFilteredOrders] = useState([]); // Track filtered orders
  const [status, setStatus] = useState(""); // Track selected status
  const [activeButton, setActiveButton] = useState(""); // Track active button

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const response = await fetch(
          `http://127.0.0.1:5000/api/v1/users/${userId}/parcels`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.parcels); // Set the fetched parcels data to state
        setFilteredOrders(data.parcels); // Set filtered orders initially
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchOrders();
  }, []);

  const handleStatusFilter = (status) => {
    setStatus(status);
    setActiveButton(status); // Set active button on click
    if (status === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  return (
    <div className="my-orders-container">
      <h1>My Orders</h1>
      <p>Here are the orders you have placed:</p>

      <div className="buttons-container">
        <button
          className={activeButton === "" ? "active" : ""}
          onClick={() => handleStatusFilter("")}
        >
          All
        </button>
        <button
          className={activeButton === "delivered" ? "active" : ""}
          onClick={() => handleStatusFilter("delivered")}
        >
          Delivered
        </button>
        <button
          className={activeButton === "pending" ? "active" : ""}
          onClick={() => handleStatusFilter("pending")}
        >
          Pending
        </button>
        <button
          className={activeButton === "cancelled" ? "active" : ""}
          onClick={() => handleStatusFilter("canceled")}
        >
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
              <Link
                key={order.id}
                to={`/parcels/${order.id}`} // Link to the order details page with order ID in the URL
              >
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

export default MyOrdersPage;
