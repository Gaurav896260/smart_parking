import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "./assets/ErrorBoundary.jsx"; // Import the ErrorBoundary component

// Restricted
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/signup.jsx";
import Registration from "./pages/owner/register.jsx";
import AfterLogin from "./pages/Auth/afterLogin.jsx";
import PrivateRoute from "./pages/Auth/PrivateRoutes.jsx";

import Home from "./pages/Home.jsx";
import Profile from "./pages/User/Profile.jsx";
import Map from "./pages/Map/map.jsx";
import Dashboard from "./pages/owner/dashboard.jsx";
import ParkingTicketPage from "./pages/Parking/ParkingTicketPage.jsx";
import Settings from "./pages/Auth/settings.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index={true} path="/" element={<Home />} />
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/settings" element={<Settings />} />
      {/* {/* <Route path="/map" element={<Map />} /> */}
      <Route path="/owner" element={<Map />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/afterLogin" element={<AfterLogin />} />
      <Route path="/parkingticket" element={<ParkingTicketPage />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

// Wrap the RouterProvider with the ErrorBoundary
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </Provider>
);
