import React, { useState } from "react";
import "./updateOrderPage.css"; // Import the CSS file for styling

const UpdateOrderPage = () => {
  // State to manage form inputs
  const [orderId, setOrderId] = useState("");
  const [parcelOrigin, setParcelOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form data here, such as sending it to an API or updating the order
    console.log("Order ID:", orderId);
    console.log("Parcel Origin:", parcelOrigin);
    console.log("Destination:", destination);
    console.log("Description:", description);
  };

  return (
    <div className="update-order-container">
      <h1>Update Your Order</h1>
      <p>Fill in the form below to update your order details:</p>

      <form onSubmit={handleSubmit} className="update-order-form">
        <input
          type="text"
          id="order-id"
          name="order-id"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="form-input"
          required
        />

        <input
          type="text"
          id="parcel-origin"
          name="parcel-origin"
          placeholder="Parcel Origin"
          value={parcelOrigin}
          onChange={(e) => setParcelOrigin(e.target.value)}
          className="form-input"
          required
        />

        <input
          type="text"
          id="destination"
          name="destination"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="form-input"
          required
        />

        <textarea
          id="description"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
          required
        ></textarea>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateOrderPage;
