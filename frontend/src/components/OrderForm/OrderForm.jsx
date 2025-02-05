




import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
const navigate = useNavigate()

  const [order, setOrder] = useState({
    origin_pin: "",
    destination_pin: "",
    weight_kg: "",
    description: "",
    user_id: "", // We'll set this from localStorage
  });

  const [message, setMessage] = useState("");

  // Set the user_id from localStorage when the component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        user_id: storedUserId,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://127.0.0.1:5000/api/v1/parcels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Order created successfully!");
        setOrder({
          origin_pin: "",
          destination_pin: "",
          weight_kg: "",
          description: "",
          user_id: "",
        });

          // Navigate to dashboard after a delay of 3 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000); // 3-second delay (3000 milliseconds)
      } else {
        setMessage(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="order-form-container">
      <h2>Create Order</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Origin PIN:</label>
          <input
            type="text"
            name="origin_pin"
            value={order.origin_pin}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Destination PIN:</label>
          <input
            type="text"
            name="destination_pin"
            value={order.destination_pin}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            name="weight_kg"
            value={order.weight_kg}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={order.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>User ID:</label>
          <input
            type="text"
            name="user_id"
            value={order.user_id}
            onChange={handleChange}
            readOnly // Since user_id is coming from localStorage, it shouldn't be editable
          />
        </div>

        <button type="submit">Create Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
