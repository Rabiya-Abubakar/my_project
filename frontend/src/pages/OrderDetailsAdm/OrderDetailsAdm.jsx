


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderDetailsAdm.css";

const OrderDetailsAdm = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/parcels/${orderId}`);
        const data = await response.json();

        if (response.ok) {
          setOrderDetails(data.parcel);
          setStatus(data.parcel.status);
        } else {
          alert("Error fetching order details.");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        alert("Network error. Please try again.");
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
        const userRole = localStorage.getItem("user_role"); // Retrieve role from localStorage

      const response = await fetch(`http://127.0.0.1:5000/api/v1/parcels/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status , role: userRole 
        }),
      });

      if (response.ok) {
        alert("Order status updated successfully.");
      } else {
        alert("Error updating order status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Network error. Please try again.");
    }
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-details-container">
      <h1>Order Details</h1>
      <div className="order-details-card">
        <h3>Order ID: {orderDetails.id}</h3>
        <p><strong>Origin PIN:</strong> {orderDetails.origin_pin}</p>
        <p><strong>Destination PIN:</strong> {orderDetails.destination_pin}</p>
        <p><strong>Weight (kg):</strong> {orderDetails.weight_kg}</p>
        <p><strong>Description:</strong> {orderDetails.description}</p>
        <p><strong>Status:</strong> {orderDetails.status}</p>
        <p>
          <strong>Status:</strong>
          <select value={status} onChange={handleStatusChange}>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
          </select>
        </p>
        <button className="update-button" onClick={handleUpdateStatus}>Update Status</button>
      </div>
    </div>
  );
};

export default OrderDetailsAdm;
