import React, { useState } from "react";
import "./TrackMyOrderPage.css"; // Import the CSS file for styling

const TrackMyOrderPage = () => {
  const [orderId, setOrderId] = useState(""); // State to store the entered order ID
  const [trackingStatus, setTrackingStatus] = useState(null); // State to store tracking status
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages

  // Simulated tracking data (you would replace this with an actual API call)
  const trackingData = {
    ORD12345: {
      status: "In Transit",
      location: "Nairobi, Kenya",
      estimatedDelivery: "2025-02-05",
    },
    ORD67890: {
      status: "Delivered",
      location: "Mombasa, Kenya",
      estimatedDelivery: "2025-01-28",
    },
    ORD11223: {
      status: "Pending",
      location: "Kisumu, Kenya",
      estimatedDelivery: "TBD",
    },
  };

  // Handle tracking
  const handleTrackOrder = () => {
    if (trackingData[orderId]) {
      setTrackingStatus(trackingData[orderId]);
      setErrorMessage(""); // Reset error message if valid order ID
    } else {
      setTrackingStatus(null);
      setErrorMessage("Order ID not found. Please try again.");
    }
  };

  return (
    <div className="track-order-container">
      <h1>Track Your Order</h1>
      <div className="track-order-form">
        <label htmlFor="orderId">Enter Order ID:</label>
        <input
          type="text"
          id="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID"
        />
        <button className="track-button" onClick={handleTrackOrder}>
          Track
        </button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {trackingStatus && (
        <div className="order-status-card">
          <h3>Order ID: {orderId}</h3>
          <p>
            <strong>Status:</strong> {trackingStatus.status}
          </p>
          <p>
            <strong>Current Location:</strong> {trackingStatus.location}
          </p>
          <p>
            <strong>Estimated Delivery:</strong>{" "}
            {trackingStatus.estimatedDelivery}
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackMyOrderPage;
