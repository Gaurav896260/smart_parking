import React, { useState } from "react";
import { useCreateParkingTicketMutation } from "../../redux/api/users.js";
import { useNavigate } from "react-router-dom";
import { useGetOwnersQuery } from "../../redux/api/users.js"; // Import the useGetOwnersQuery hook

import "../Auth/style/styleParking.css";

const ParkingTicketPage = () => {
  const [ownerId, setOwnerId] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Initialize navigate hook

  // Use the useGetOwnersQuery hook to fetch owners' data
  const {
    data: ownersData,
    isLoading: ownersLoading,
    error: ownersError,
  } = useGetOwnersQuery();

  const [createParkingTicket, { isLoading }] = useCreateParkingTicketMutation();

  const handleCreateTicket = async (e) => {
    e.preventDefault();

    const response = await createParkingTicket({
      ownerId,
      vehicleNumber,
      startTime,
      endTime,
    }).unwrap();

    setSuccessMessage(response.data.message);
    setVehicleNumber("");
    setStartTime("");
    setEndTime("");

    console.log(response);
    // Redirect to afterLogin page on success using window.location.href
    window.location.href = "/afterLogin";
  };

  // Render loading state while fetching owners data
  if (ownersLoading) {
    return <p>Loading owners data...</p>;
  }

  // Render error message if failed to fetch owners data
  if (ownersError) {
    return <p>Error fetching owners data: {ownersError.message}</p>;
  }

  return (
    <div className="parking-ticket-container">
      <h2>Parking Ticket Page</h2>

      <h3>Select Owner:</h3>
      <select
        value={ownerId}
        onChange={(e) => setOwnerId(e.target.value)}
        required
      >
        <option value="">Select Owner</option>
        {ownersData.map((owner) => (
          <option key={owner._id} value={owner._id}>
            {owner.fullName}
          </option>
        ))}
      </select>

      <h3>Create Parking Ticket:</h3>
      <form onSubmit={handleCreateTicket}>
        <div>
          <label htmlFor="vehicleNumber">Vehicle Number:</label>
          <input
            type="text"
            id="vehicleNumber"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Ticket</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default ParkingTicketPage;
