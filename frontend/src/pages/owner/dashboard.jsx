import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [openingsLeft, setOpeningsLeft] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchGarageStatus = async () => {
      try {
        const response = await axios.get("/api/garage/status");
        setOpeningsLeft(response.data.openingsLeft);
      } catch (error) {
        console.error("Error fetching garage status:", error);
      }
    };

    fetchUserData();
    fetchGarageStatus();

    const socket = new WebSocket("ws://localhost:3000/ws/garage");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setOpeningsLeft(data.openingsLeft);
      if (data.notification) {
        setSnackbarOpen(true);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
        {userData && (
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Welcome, {userData.fullName}!
            </h2>
            <p className="text-base mb-2">Email: {userData.email}</p>
            <p className="text-base mb-2">Openings Left: {openingsLeft}</p>
          </div>
        )}
      </div>
      {snackbarOpen && (
        <div className="fixed bottom-0 left-0 right-0 p-4">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md">
            Vehicle parked successfully!
            <button className="ml-2 text-white" onClick={handleCloseSnackbar}>
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
