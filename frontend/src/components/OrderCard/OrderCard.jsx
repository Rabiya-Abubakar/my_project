import React from "react";
import "./OrderCard.css"; // Import the CSS file for styling

const OrderCard = ({ order }) => {
  return (
    <div className="order-card">
      <h3>Order ID: {order.id}</h3>
      <p>
        <strong>Parcel Origin:</strong> {order.parcelOrigin}
      </p>
      <p>
        <strong>Destination:</strong> {order.destination}
      </p>
      <p>
        <strong>Description:</strong> {order.description}
      </p>
    </div>
  );
};

export default OrderCard;
