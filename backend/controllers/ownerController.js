import Owner from "../models/owner.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import createToken from "../utils/createToken.js";

const createOwner = asyncHandler(async (req, res) => {
  const { fullName, email, password, address } = req.body;

  if (!fullName || !email || !password || !address) {
    throw new Error("Please fill all the fields");
  }

  const userExists = await Owner.findOne({ email });
  if (userExists) res.status(400).send("User already exists");

  // Hash the user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new Owner({
    fullName,
    email,
    password: hashedPassword,
    address,
  });

  try {
    await newUser.save();
    createToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      address: newUser.address,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const getAllOwners = asyncHandler(async (req, res) => {
  const users = await Owner.find({});
  res.json(users);
  console.log(users);
});

const getAllOwnerAddresses = asyncHandler(async (req, res) => {
  try {
    // Fetch all owners from the database
    const owners = await Owner.find({});

    // Extract addresses from each owner object
    const addresses = owners.map((owner) => owner.address);

    // Respond with the addresses in JSON format
    res.json(addresses);
  } catch (error) {
    console.error("Error fetching owner addresses:", error);
    // Handle the error and respond accordingly
    res.status(500).json({ error: "Internal server error" });
  }
});

export { createOwner, getAllOwners, getAllOwnerAddresses };
