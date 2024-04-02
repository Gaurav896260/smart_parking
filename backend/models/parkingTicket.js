import mongoose from "mongoose";

const parkingTicketSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
    vehicleNumber: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
  },
  { timestamps: true }
);

const ParkingTicket = mongoose.model("ParkingTicket", parkingTicketSchema);

export default ParkingTicket;
