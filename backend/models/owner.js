import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    garageRegistered: { type: Boolean, default: false }, // Indicates whether the owner has registered a garage
    garageName: { type: String }, // Name of the registered garage (if any)
    numberOfSpaces: { type: Number, default: 0 }, // Number of parking spaces in the garage
    // Add more fields as needed
  },
  { timestamps: true }
);

const Owner = mongoose.model("Owner", ownerSchema);

export default Owner;
