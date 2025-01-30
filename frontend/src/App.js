import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Account/login/LoginPage";
import Signup from "./pages/Account/signup/SignupPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import UpdateOrderPage from "./pages/updateOrder/UpdateOrderPage";
import DeliveryDetailsPage from "./pages/DeliveryDetailsPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import CreateOrderPage from "./pages/createorder/CreateOrderPage";
import MyOrdersPage from "./pages/MyOrdersPage/MyOrdersPage";
import OrderDetailsPage from "./pages/orderDetailsPage/OrderDetailsPage";
import TrackMyOrderPage from "./pages/TrackOrder/TrackMyOrderPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Add Navbar here so it renders on all pages */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/myorders" element={<MyOrdersPage />} />
          <Route path="/orderdetails/:orderId" element={<OrderDetailsPage />} />
          <Route path="/createorder" element={<CreateOrderPage />} />
          <Route path="/updateorder" element={<UpdateOrderPage />} />
          <Route path="/trackorder" element={<TrackMyOrderPage />} />
          <Route path="/deliverydetails" element={<DeliveryDetailsPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/recentactivity" element={<RecentActivityPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
