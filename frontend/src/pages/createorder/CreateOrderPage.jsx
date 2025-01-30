import React, { useState } from "react";
import "./CreateOrderPage.css"; // Import the CSS file for styling

const CreateOrderPage = () => {
  // State to manage form inputs
  const [parcelOrigin, setParcelOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form data, such as sending it to an API
    console.log("Parcel Origin:", parcelOrigin);
    console.log("Destination:", destination);
    console.log("Description:", description);
  };

  return (
    <div className="create-order-container">
      <h1>Create Your Order</h1>
      <p>Fill in the form below to create your order:</p>

      <form onSubmit={handleSubmit} className="create-order-form">
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

export default CreateOrderPage;
