//====================
// Seed Model: Service Category
//====================
// ENV
import dotenv from "dotenv";
dotenv.config({ path: "../../../.env" }); // Make sure to target the correct path
// Dependencies
import mongoose from "mongoose";
import connectDB from "../../config/db.js"; // Connect to DB
import ServiceCategory from "../serviceCategoryModel.js";

// Establish DB Connection
connectDB();

//--------------------
// Seed Data
//--------------------
const seedServiceCategories = [
  {
    name: "Plumbing",
    categoryImage: {
      publicId: "vendorLynx/icons/serviceCategory/zybomqopfn6rgmcxytwp",
      url: "https://res.cloudinary.com/dxj6szh5w/image/upload/v1709627944/vendorLynx/icons/serviceCategory/zybomqopfn6rgmcxytwp.svg",
    },
  },
  {
    name: "Electrical",
    categoryImage: {
      publicId: "vendorLynx/icons/serviceCategory/pliwnv60wzjkyk9yinkl",
      url: "https://res.cloudinary.com/dxj6szh5w/image/upload/v1709627943/vendorLynx/icons/serviceCategory/pliwnv60wzjkyk9yinkl.svg",
    },
  },
  {
    name: "HVAC",
    categoryImage: {
      publicId: "vendorLynx/icons/serviceCategory/okmmnfyrz6hgikrauevu",
      url: "https://res.cloudinary.com/dxj6szh5w/image/upload/v1709627944/vendorLynx/icons/serviceCategory/okmmnfyrz6hgikrauevu.svg",
    },
  },
  {
    name: "Landscaping",
    categoryImage: {
      publicId: "vendorLynx/icons/serviceCategory/xbccjx0z4tckceylnbjj",
      url: "https://res.cloudinary.com/dxj6szh5w/image/upload/v1709627944/vendorLynx/icons/serviceCategory/xbccjx0z4tckceylnbjj.svg",
    },
  },
  {
    name: "General Maintenance",
    categoryImage: {
      publicId: "vendorLynx/icons/serviceCategory/iudwmeul0cmkvpepl9zh",
      url: "https://res.cloudinary.com/dxj6szh5w/image/upload/v1709627943/vendorLynx/icons/serviceCategory/iudwmeul0cmkvpepl9zh.svg",
    },
  },
  {
    name: "Cleaning",
    categoryImage: {
      publicId: "vendorLynx/icons/serviceCategory/pzghbwaqoz46hjrfzojm",
      url: "https://res.cloudinary.com/dxj6szh5w/image/upload/v1709627943/vendorLynx/icons/serviceCategory/pzghbwaqoz46hjrfzojm.svg",
    },
  },
  {
    name: "Pest Control",
    categoryImage: {
      publicId: "vendorLynx/icons/serviceCategory/ttkxi5qmrl4wbotttgta",
      url: "https://res.cloudinary.com/dxj6szh5w/image/upload/v1709627944/vendorLynx/icons/serviceCategory/ttkxi5qmrl4wbotttgta.svg",
    },
  },
  {
    name: "Roofing",
    categoryImage: {
      publicId: "vendorLynx/icons/serviceCategory/gidvnefer7ilfzeooay2",
      url: "https://res.cloudinary.com/dxj6szh5w/image/upload/v1709627944/vendorLynx/icons/serviceCategory/gidvnefer7ilfzeooay2.svg",
    },
  },
  {
    name: "Appliance Repair",
    categoryImage: {
      publicId: "vendorLynx/icons/serviceCategory/ycq8vc5gpsodqh3drnr4",
      url: "https://res.cloudinary.com/dxj6szh5w/image/upload/v1709628357/vendorLynx/icons/serviceCategory/ycq8vc5gpsodqh3drnr4.svg",
    },
  },
  {
    name: "Waste Management",
    categoryImage: {
      publicId: "vendorLynx/icons/serviceCategory/wdiyxz9dnsfhdtqm59ah",
      url: "https://res.cloudinary.com/dxj6szh5w/image/upload/v1709628088/vendorLynx/icons/serviceCategory/wdiyxz9dnsfhdtqm59ah.svg",
    },
  },
  {
    name: "Flooring",
    categoryImage: {
      publicId: "vendorLynx/icons/serviceCategory/rpmoxj1lpepmmylmag07",
      url: "https://res.cloudinary.com/dxj6szh5w/image/upload/v1709627943/vendorLynx/icons/serviceCategory/rpmoxj1lpepmmylmag07.svg",
    },
  },
  {
    name: "Window and Door",
    categoryImage: {
      publicId: "vendorLynx/icons/serviceCategory/ygjo00uwbwf4ugn4dkrq",
      url: "https://res.cloudinary.com/dxj6szh5w/image/upload/v1709627946/vendorLynx/icons/serviceCategory/ygjo00uwbwf4ugn4dkrq.svg",
    },
  },
  {
    name: "Snow Removal",
    categoryImage: {
      publicId: "vendorLynx/icons/serviceCategory/r0pvduyi2wxzaoqagexq",
      url: "https://res.cloudinary.com/dxj6szh5w/image/upload/v1709627945/vendorLynx/icons/serviceCategory/r0pvduyi2wxzaoqagexq.svg",
    },
  },
  {
    name: "ISP",
    categoryImage: {
      publicId: "vendorLynx/icons/serviceCategory/jrdrva4lp00eecq0b7qe",
      url: "https://res.cloudinary.com/dxj6szh5w/image/upload/v1709627944/vendorLynx/icons/serviceCategory/jrdrva4lp00eecq0b7qe.svg",
    },
  },
  {
    name: "TV/Cable",
    categoryImage: {
      publicId: "vendorLynx/icons/serviceCategory/hkprddjoidjm9ptwj3ya",
      url: "https://res.cloudinary.com/dxj6szh5w/image/upload/v1709627943/vendorLynx/icons/serviceCategory/hkprddjoidjm9ptwj3ya.svg",
    },
  },
];

//--------------------
// Seed DB
//--------------------
const seedDB = async () => {
  try {
    await ServiceCategory.deleteMany({}); // Clears the Collection
    await ServiceCategory.insertMany(seedServiceCategories); // Adds seed data to DB

    mongoose.connection.close(); // Closes MongoDB connection
    console.log("Database seeding completed. Connection closed.");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

// Call the seedDB function within an async function
(async () => {
  await seedDB();
})();
