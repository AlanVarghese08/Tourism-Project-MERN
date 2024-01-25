import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/config";

const Userbookings = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/auth/userid`, {
          method: "GET",
          credentials: "same-origin",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user information");
        }

        // Parse the JSON response
        const data = await response.json();
        console.log(data, "data");

        // Access the userId from the response
        setUserId(data.userId);
      } catch (error) {
        console.error("Error fetching user information:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch user information
    fetchCurrentUser();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <h2>User Information</h2>
      {loading ? (
        <p>Loading...</p>
      ) : userId ? (
        <p>User ID: {userId}</p>
      ) : (
        <p>No user ID available. Make sure the user is logged in.</p>
      )}
    </div>
  );
};

export default Userbookings;
