//====================
// Model: Vendor Rating
//====================
// Import Dependencies
import mongoose from "mongoose";

//--------------------
// Schema Definition
//--------------------
const vendorRatingSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      unique: true,
      default: 0,
      min: 1,
      max: 5,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    propertyManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PropertyManager",
      required: true,
    },
  },
  { timestamps: true }
);

//--------------------
// Indexes
//--------------------
// Create an index on the fields in ascending order & make it unique so that only one rating can
// be created per vendor and property manager
vendorRatingSchema.index({ vendor: 1, propertyManager: 1 }, { unique: true });

//--------------------
// Model Definition
//--------------------
const VendorRating = mongoose.model("VendorRating", vendorRatingSchema);

export default VendorRating;

/*

Indexes: Consider adding indexes on the vendor and ratingDate fields based on your querying patterns. 
Indexes can improve query performance, especially when filtering ratings by vendor or date range.

Aggregation: MongoDB's aggregation framework can be powerful for analyzing ratings data. 
You can use aggregation pipelines to calculate average ratings per vendor, analyze trends over time, 
and extract meaningful insights from the rating data.
*/

/* ------------------------------------------------------------------------------------------------------------------- */

/*
Calculating Average Ratings

In a typical MERN stack application, you would use the average rating calculation 
in the backend API to provide data to the frontend for display or further processing. 
Let's break down how you can use it in both the backend and frontend:

    Frontend (React.js):

In your frontend React application, you can make an HTTP request to the backend API endpoint 
to fetch the average rating for a vendor and then display it to the user. Here's an example using 
axios for making the HTTP request:

javascript

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorAverageRating = ({ vendorId }) => {
  const [averageRating, setAverageRating] = useState(null);

  useEffect(() => {
    fetchAverageRating();
  }, []);

  const fetchAverageRating = async () => {
    try {
      const response = await axios.get(`/vendors/${vendorId}/average-rating`);
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error('Error fetching average rating:', error);
    }
  };

  return (
    <div>
      <h3>Average Rating:</h3>
      {averageRating !== null ? (
        <p>{averageRating.toFixed(1)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VendorAverageRating;

In this example, the VendorAverageRating component fetches the average rating for a vendor using the 
/vendors/:vendorId/average-rating endpoint. Once the data is fetched, it is displayed to the user. 
You can use this component within your vendor-related pages to show the average rating dynamically.

Remember to replace placeholders like vendorId with actual data from your application state or props as needed.

By implementing these backend and frontend components, you can calculate and display the average rating 
for vendors in your MERN application. Adjust the code according to your specific application structure and requirements.

*/
