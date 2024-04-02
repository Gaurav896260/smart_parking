import fetch from "node-fetch"; // npm install node-fetch

const fetchCoordinates = async () => {
  const response = await fetch(
    "https://api.geoapify.com/v1/geocode/search?text=delhi&format=json&apiKey=f92ad3531ac94bbfab5678453336d853"
  );
  const data = await response.json();

  // Destructure latitude and longitude from the response data
  const { lat, lon } = data.features[0].geometry;
  console.log("gajwhydgs");

  console.log(`Latitude: ${lat}, Longitude: ${lon}`);

  return { lat, lon };
};

// Export the fetchCoordinates function
export default fetchCoordinates;
