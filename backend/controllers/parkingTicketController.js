import ParkingTicket from "../models/parkingTicket.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createParkingTicket = asyncHandler(async (req, res) => {
  const { ownerId, vehicleNumber, startTime, endTime } = req.body;

  // Validate request data
  if (!ownerId || !vehicleNumber || !startTime || !endTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Create new parking ticket
  const parkingTicket = new ParkingTicket({
    ownerId,
    vehicleNumber,
    startTime,
    endTime,
  });

  // Save parking ticket to the database
  await parkingTicket.save();

  res
    .status(201)
    .json({ message: "Parking ticket created successfully", parkingTicket });
});

export { createParkingTicket };
