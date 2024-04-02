import axios from "axios";
import fetch from "node-fetch";

const handleMapClick = async () => {
  try {
    // Send GET request to fetch owner addresses
    const response = await axios.get(
      "http://localhost:3000/api/owners/getAllOwnerAddresses"
    );

    // Extract addresses from the response data
    const addresses = response.data;

    // Log the addresses for debugging
    console.log("Addresses:", addresses);

    // Return the array of addresses
    return addresses;
  } catch (error) {
    console.error("Error fetching owner addresses:", error);
    // Return an empty array or handle the error as needed
    return [];
  }
};

const fetchCoordinates = async (location) => {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${location}&format=json&apiKey=f92ad3531ac94bbfab5678453336d853`
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const { lat, lon } = data.results[0];
      console.log(`Location: ${location}, Latitude: ${lat}, Longitude: ${lon}`);
    } else {
      console.error("No features found in the response");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }
};

const fetchAllCoordinates = async () => {
  // Call handleMapClick to get the addresses
  const addresses = await handleMapClick();

  // Call fetchCoordinates for each address
  await Promise.all(addresses.map(fetchCoordinates));
};

// Call fetchAllCoordinates to start the process
fetchAllCoordinates();
