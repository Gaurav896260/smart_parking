// routes/parkingTicketRoutes.js

import express from "express";
import { createParkingTicket } from "../controllers/parkingTicketController.js";

const router = express.Router();

router.post("/create", createParkingTicket);

export default router;
