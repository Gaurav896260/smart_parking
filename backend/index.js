// Packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
// Files
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import parkingTicketRouters from "./routes/parkingTicketRouters.js";

// Configuration
dotenv.config();
connectDB();

const app = express();
app.use(cors());

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/users", userRoutes);
app.use("/api/owners", ownerRoutes);
app.use("/api/parking-tickets", parkingTicketRouters);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
