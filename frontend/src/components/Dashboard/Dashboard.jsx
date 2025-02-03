// import React from "react";
// import { Link } from "react-router-dom"; // You can use 'react-router-dom' for navigation
// import "./Dashboard.css"; // Import the CSS file
// import createorder from '../../images/order.png'
// import cancelOrder from '../../images/cancelorder.png'
// import updateorder from '../../images/updateorder.png'
// import trackorder from '../../images/trackorder.png'
// import deliverydetails from '../../images/deliverydetails.png'
// import statistics from '../../images/statistics.png'
// import recentactivity from '../../images/recentactivity.png'
// import notifications from '../../images/notifications.png'
// //
// //  import favicon from './logo192.png'

// const Dashboard = () => {
//   return (
//     <div className="dashboard">
//       {/* <header className="dashboard-header">
//         <div className="header-left">
//           <h1>Dashboard</h1>
//         </div>
//         <div className="header-right">
//           <Link to="/login" className="login-link">
//             Login
//           </Link>
//         </div>
//       </header> */}

//       <div className="dashboard-content">
        
//       <Link to='/recentactivity' className="card">
//           <h2>Recent Activity</h2>
//           <p>Overview of your Recent Activity.</p>
//           <img src={recentactivity} alt=" recent activity" />
//         </Link>
        
//         <Link to='/createorder' className="card">
//           <h2>Create Order</h2>
//           <p>Overview of your Create Order.</p>
//           <img src={createorder} alt=" create order" />
//         </Link>

//         <Link to="/updateorder" className="card">
//           <h2>Update Order</h2>
//           <p>Overview of your Update Order.</p>
//           <img src={updateorder} alt=" update order" />
//         </Link>

//         <Link to="/cancelorder" className="card">
//           <h2>Cancel Order</h2>
//           <p>Overview of your Cancel Order.</p>
//           <img src={cancelOrder} alt="cancel order" />
//         </Link>

//         <Link to="/trackorder" className="card">
//           <h2>Track Order</h2>
//           <p>Overview of your Tracking Order.</p>
//           <img src={trackorder} alt="track order" />
//         </Link>

//         <Link to="/deliverydetails" className="card">
//           <h2>Delivery details</h2>
//           <p>Overview of your delivery details.</p>
//           <img src={deliverydetails} alt=" delivery details" />
//         </Link>
       

//         <Link to= '/statistics' className="card">
//           <h2>Statistic </h2>
//           <p>Statistical data here.</p>
//           <img src={statistics} alt=" statistics" />
//         </Link>

//         <Link to= '/notifications' className="card">
//           <h2>Notifications</h2>
//           <p>Recent notifications will show up here.</p>
//           <img src={notifications} alt=" notifications" />
//           </Link>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React from "react";
import { Link } from "react-router-dom"; // You can use 'react-router-dom' for navigation
import "./Dashboard.css"; // Import the CSS file
import createorder from "../../images/createorder.png";
import cancelOrder from "../../images/cancelorder.png";
import updateorder from "../../images/updateorder.png";
import trackorder from "../../images/trackorder.png";
import deliverydetails from "../../images/deliverydetails.png";
// import favicon from './logo192.png'

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* <header className="dashboard-header">
        <div className="header-left">
          <h1>Dashboard</h1>
        </div>
        <div className="header-right">
          <Link to="/login" className="login-link">
            Login
          </Link>
        </div>
      </header> */}

      <div className="dashboard-content">
        <div className="card">
          <h2>Statistics</h2>
          <p>Overview of your statistics.</p>
        </div>

        <Link to="/createorder" className="card">
          <h2>Create Order</h2>
          <p>Overview of your Create Order.</p>
          <img src={createorder} alt=" create order" />
        </Link>

        <Link to="/updateorder" className="card">
          <h2>Update Order</h2>
          <p>Overview of your Update Order.</p>
          <img src={updateorder} alt=" update order" />
        </Link>

        <Link to="/cancelorder" className="card">
          <h2>Cancel Order</h2>
          <p>Overview of your Cancel Order.</p>
          <img src={cancelOrder} alt="cancel order" />
        </Link>

        <Link to="/trackorder" className="card">
          <h2>Track Order</h2>
          <p>Overview of your Tracking Order.</p>
          <img src={trackorder} alt="track order" />
        </Link>

        <Link to="/deliverydetails" className="card">
          <h2>Delivery details</h2>
          <p>Overview of your delivery details.</p>
          <img src={deliverydetails} alt=" delivery details" />
        </Link>

        <div className="card">
          <h2>Recent Activity</h2>
          <p>List of recent activities here.</p>
        </div>

        <div className="card">
          <h2>Notifications</h2>
          <p>Recent notifications will show up here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;