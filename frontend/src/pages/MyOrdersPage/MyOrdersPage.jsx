import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Use Link to navigate to the details page
import "./MyOrdersPage.css";
import OrderCard from "../../components/OrderCard/OrderCard";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const sampleOrders = [
      {
        id: "ORD12345",
        parcelOrigin: "Nairobi",
        destination: "Mombasa",
        description: "Electronics - Laptop",
      },
      {
        id: "ORD67890",
        parcelOrigin: "Kisumu",
        destination: "Nairobi",
        description: "Books - Educational",
      },
      {
        id: "ORD11223",
        parcelOrigin: "Eldoret",
        destination: "Nakuru",
        description: "Clothing - Jackets",
      },
    ];

    setOrders(sampleOrders);
  }, []);

  return (
    <div className="my-orders-container">
      <h1>My Orders</h1>
      <p>Here are the orders you have placed:</p>

      <div className="orders-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Link
              key={order.id}
              to={`/orderdetails/${order.id}`} // Link to the order details page with order ID in the URL
            >
              <OrderCard order={order} />
            </Link>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
