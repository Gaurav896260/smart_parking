import express from "express";
// controllers
import {
  createOwner,
  getAllOwners,
  getAllOwnerAddresses,
} from "../controllers/ownerController.js";

// middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for creating a new owner
router.route("/").post(createOwner).get(getAllOwners);

// Create a route to trigger getAllOwnerAddresses
router.get("/getAllOwnerAddresses", getAllOwnerAddresses);

export default router;
