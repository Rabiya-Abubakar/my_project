import React from "react";
import "./OrderCard.css"; // Import the CSS file for styling

const OrderCard = ({ order }) => {
  return (
    <div className="order-card">
      <h3>Order ID: {order.id}</h3>
      <p>
        <strong>Origin PIN:</strong> {order.origin_pin}
      </p>
      <p>
        <strong>Destination PIN:</strong> {order.destination_pin}
      </p>
      <p>
        <strong>Weight (kg):</strong> {order.weight_kg}
      </p>
      <p>
        <strong>Description:</strong> {order.description}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
    </div>
  );
};

export default OrderCard;
