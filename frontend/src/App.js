import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Account/login/LoginPage";
import Signup from "./pages/Account/signup/SignupPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import UpdateOrderPage from "./pages/UpdateOrderPage";
import CancelOrderPage from "./pages/CancelOrderPage";
import TrackOrderPage from "./pages/TrackMyOrderPage";
import DeliveryDetailsPage from "./pages/DeliveryDetailsPage";
import StatisticsPage from "./pages/StatisticsPage";
import RecentActivityPage from "./pages/RecentActivityPage";
import NotificationsPage from "./pages/NotificationsPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/createorder" element={<CreateOrderPage />} />
          <Route path="/updateorder" element={<UpdateOrderPage />} />
          <Route path="/cancelorder" element={<CancelOrderPage />} />
          <Route path="/trackorder" element={<TrackOrderPage />} />
          <Route path="/deliverydetails" element={<DeliveryDetailsPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/recentactivity" element={<RecentActivityPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
