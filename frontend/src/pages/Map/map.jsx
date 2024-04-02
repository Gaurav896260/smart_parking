import React, { useEffect } from "react";
import L from "leaflet";
import axios from "axios";

const Map = () => {
  useEffect(() => {
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

    const fetchCoordinates = async (address) => {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${address}&format=json&apiKey=f92ad3531ac94bbfab5678453336d853`
        );
        const data = await response.json();

        console.log("Results:", data.results[0]); // Log the entire results object

        if (data.results && data.results.length > 0) {
          const result = data.results[0];
          if (result.lat && result.lon) {
            console.log(
              `Address: ${address}, Latitude: ${result.lat}, Longitude: ${result.lon}`
            );
            // Add marker to the map
            L.marker([result.lat, result.lon]).addTo(map).bindPopup(address);
          } else {
            console.error(
              "Latitude or longitude is missing in the response for:",
              address
            );
          }
        } else {
          console.error("No results found in the response for:", address);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    const fetchAllCoordinates = async () => {
      try {
        // Call handleMapClick to get the addresses
        const addresses = await handleMapClick();

        // Call fetchCoordinates for each address
        addresses.forEach(fetchCoordinates);
      } catch (error) {
        console.error("Error fetching and displaying coordinates:", error);
      }
    };

    // Initialize map centered around India
    const map = L.map("my-map").setView([20.5937, 78.9629], 5);

    // Add tile layer from Geoapify with attribution
    L.tileLayer(
      "https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=f92ad3531ac94bbfab5678453336d853",
      {
        attribution:
          'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
        maxZoom: 20,
        id: "osm-bright",
      }
    ).addTo(map);

    // Call fetchAllCoordinates to start the process
    fetchAllCoordinates();

    // Clean up function
    return () => {
      map.remove();
    };
  }, []); // Empty dependency array to run effect only once

  return <div id="my-map" style={{ width: "100%", height: "100vh" }}></div>;
};

export default Map;
