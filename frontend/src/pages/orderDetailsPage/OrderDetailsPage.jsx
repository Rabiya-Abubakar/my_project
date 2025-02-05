// // import React, { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom"; // To access the order ID from URL
// // import "./OrderDetailsPage.css"; // Import the CSS file for styling

// // const OrderDetailsPage = () => {
// //   const { orderId } = useParams(); // Get the order ID from the URL params
// //   const [orderDetails, setOrderDetails] = useState(null); // State to store order details
// //   const navigate = useNavigate(); // To navigate to another page after canceling

// //   // Simulate fetching order details (you would replace this with an actual API call)
// //   useEffect(() => {
// //     // Simulating a fetch request for order details based on the orderId
// //     const fetchOrderDetails = () => {
// //       const sampleOrders = [
// //         {
// //           id: "ORD12345",
// //           parcelOrigin: "Nairobi",
// //           destination: "Mombasa",
// //           description: "Electronics - Laptop",
// //         },
// //         {
// //           id: "ORD67890",
// //           parcelOrigin: "Kisumu",
// //           destination: "Nairobi",
// //           description: "Books - Educational",
// //         },
// //         {
// //           id: "ORD11223",
// //           parcelOrigin: "Eldoret",
// //           destination: "Nakuru",
// //           description: "Clothing - Jackets",
// //         },
// //       ];

// //       const order = sampleOrders.find((order) => order.id === orderId);
// //       setOrderDetails(order);
// //     };

// //     fetchOrderDetails();
// //   }, [orderId]);

// //   // Handle order cancellation
// //   const handleCancelOrder = () => {
// //     // You would typically call an API to cancel the order, then navigate
// //     alert(`Order ${orderId} has been canceled.`); // Simulate cancel action
// //     navigate("/myorders"); // Navigate back to My Orders page
// //   };

// //   if (!orderDetails) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div className="order-details-container">
// //       <h1>Order Details</h1>
// //       <div className="order-details-card">
// //         <h3>Order ID: {orderDetails.id}</h3>
// //         <p>
// //           <strong>Parcel Origin:</strong> {orderDetails.parcelOrigin}
// //         </p>
// //         <p>
// //           <strong>Destination:</strong> {orderDetails.destination}
// //         </p>
// //         <p>
// //           <strong>Description:</strong> {orderDetails.description}
// //         </p>
// //         <button className="cancel-button" onClick={handleCancelOrder}>
// //           Cancel Order
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OrderDetailsPage;


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // To access the order ID from URL
// import "./OrderDetailsPage.css"; // Import the CSS file for styling

// const OrderDetailsPage = () => {
//   const { orderId } = useParams(); // Get the order ID from the URL params
//   const [orderDetails, setOrderDetails] = useState(null); // State to store order details
//   const navigate = useNavigate(); // To navigate to another page after canceling

//   // Fetch order details based on the orderId
//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:5000/api/v1/parcels/${orderId}`);
//         const data = await response.json();

//         console.log(data)
        
//         if (response.ok) {
//           setOrderDetails(data.parcel); // Set the fetched order details
//         } else {
//           alert("Error fetching order details.");
//         }
//       } catch (error) {
//         console.error("Error fetching order details:", error);
//         alert("Network error. Please try again.");
//       }
//     };

//     fetchOrderDetails();
//   }, [orderId]);

//   // Handle order cancellation
//   const handleCancelOrder = async () => {
//     try {
//       const response = await fetch(`http://127.0.0.1:5000/api/v1/parcels/${orderId}/cancel`, {
//         method: "PUT", // PUT method to cancel the order
//       });

//       if (response.ok) {
//         alert(`Order ${orderId} has been canceled.`);
//         navigate("/myorders"); // Navigate back to My Orders page
//       } else {
//         alert("Error canceling the order.");
//       }
//     } catch (error) {
//       console.error("Error canceling the order:", error);
//       alert("Network error. Please try again.");
//     }
//   };

//   if (!orderDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="order-details-container">
//       <h1>Order Details</h1>
//       <div className="order-details-card">
//         <h3>Order ID: {orderDetails.id}</h3>
//         <p>
//           <strong>Origin PIN:</strong> {orderDetails.origin_pin}
//         </p>
//         <p>
//           <strong>Destination PIN:</strong> {orderDetails.destination_pin}
//         </p>
//         <p>
//           <strong>Weight (kg):</strong> {orderDetails.weight_kg}
//         </p>
//         <p>
//           <strong>Description:</strong> {orderDetails.description}
//         </p>
//         <p>
//           <strong>Status:</strong> {orderDetails.status}
//         </p>
//         <div className="action-buttons">
//         <button className="cancel-button" onClick={handleCancelOrder}>
//           Cancel Order
//         </button>
//         <button className="update-button" onClick={handleCancelOrder}>
//           Update Order
//         </button></div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetailsPage;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderDetailsPage.css";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newDestinationPin, setNewDestinationPin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/v1/parcels/${orderId}`);
        const data = await response.json();

        if (response.ok) {
          setOrderDetails(data.parcel);
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

  const handleCancelOrder = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/parcels/${orderId}/cancel`, {
        method: "PUT",
      });

      if (response.ok) {
        alert(`Order ${orderId} has been canceled.`);
        navigate("/myorders");
      } else {
        alert("Error canceling the order.");
      }
    } catch (error) {
      console.error("Error canceling the order:", error);
      alert("Network error. Please try again.");
    }
  };

  const handleUpdateClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewDestinationPin("");
  };

  const handleConfirmUpdate = async () => {
    if (!newDestinationPin.trim()) {
      alert("Please enter a new destination pin.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/parcel/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ destination_pin: newDestinationPin }),
      });

      if (response.ok) {
        alert("Destination pin updated successfully.");
        setOrderDetails((prev) => ({ ...prev, destination_pin: newDestinationPin }));
        handleCloseModal();
      } else {
        alert("Error updating destination pin.");
      }
    } catch (error) {
      console.error("Error updating destination pin:", error);
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
        <p>
          <strong>Origin PIN:</strong> {orderDetails.origin_pin}
        </p>
        <p>
          <strong>Destination PIN:</strong> {orderDetails.destination_pin}
        </p>
        <p>
          <strong>Weight (kg):</strong> {orderDetails.weight_kg}
        </p>
        <p>
          <strong>Description:</strong> {orderDetails.description}
        </p>
        <p>
          <strong>Status:</strong> {orderDetails.status}
        </p>
        { orderDetails.status === 'pending' &&
        <div className="action-buttons">
          <button className="cancel-button" onClick={handleCancelOrder}>
            Cancel Order
          </button>
          <button className="update-button" onClick={handleUpdateClick}>
            Update Order
          </button>
        </div>}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Update Destination</h2>
            <input
              type="text"
              placeholder="Enter new destination pin"
              value={newDestinationPin}
              onChange={(e) => setNewDestinationPin(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="cancel-button" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="confirm-button" onClick={handleConfirmUpdate}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
