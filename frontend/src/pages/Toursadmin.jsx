// ToursAdmin.jsx

import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config";
import "./ToursAdmin.css"; //
import { Button } from "reactstrap";

const Toursadmin = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tours?page=0`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tours");
        }
        const data = await response.json();
        setTours(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/tours/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete tour");
      }

      // Filter out the deleted tour from the state
      setTours((prevTours) => prevTours.filter((tour) => tour._id !== id));
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  return (
    <div>
      <h1>Tours Admin</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="tour-card-container">
          {tours.map((tour) => (
            <div key={tour._id} className="tour-card">
              <img src={tour.photo} alt="tour-img" />
              <h2>{tour.title}</h2>
              <h4>Rs.{tour.price}</h4>
              <p>{tour.address}</p>
              <p>{tour.description}</p>
              <div className="button-container">
                <Button
                  color="danger"
                  variant="contained"
                  onClick={() => handleDelete(tour._id)}
                >
                  Delete
                </Button>{" "}
                <span className="spacer"></span>{" "}
                <Button color="primary" variant="contained">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Toursadmin;
