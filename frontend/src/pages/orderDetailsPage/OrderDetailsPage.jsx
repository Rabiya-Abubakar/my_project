import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // To access the order ID from URL
import "./OrderDetailsPage.css"; // Import the CSS file for styling

const OrderDetailsPage = () => {
  const { orderId } = useParams(); // Get the order ID from the URL params
  const [orderDetails, setOrderDetails] = useState(null); // State to store order details
  const navigate = useNavigate(); // To navigate to another page after canceling

  // Simulate fetching order details (you would replace this with an actual API call)
  useEffect(() => {
    // Simulating a fetch request for order details based on the orderId
    const fetchOrderDetails = () => {
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

      const order = sampleOrders.find((order) => order.id === orderId);
      setOrderDetails(order);
    };

    fetchOrderDetails();
  }, [orderId]);

  // Handle order cancellation
  const handleCancelOrder = () => {
    // You would typically call an API to cancel the order, then navigate
    alert(`Order ${orderId} has been canceled.`); // Simulate cancel action
    navigate("/myorders"); // Navigate back to My Orders page
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-details-container">
      <h1>Order Details</h1>
      <div className="order-details-card">
        <h3>Order ID: {orderDetails.id}</h3>
        <p>
          <strong>Parcel Origin:</strong> {orderDetails.parcelOrigin}
        </p>
        <p>
          <strong>Destination:</strong> {orderDetails.destination}
        </p>
        <p>
          <strong>Description:</strong> {orderDetails.description}
        </p>
        <button className="cancel-button" onClick={handleCancelOrder}>
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
