//====================
// Model: Vendor
//====================
// Import Dependencies
import mongoose from "mongoose";
import bcrypt from "bcryptjs";




/*
// TODO: Mongoose guide to embed & reference


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for Cities
const citySchema = new Schema({
  city: String
});

// Define schema for Provinces
const provinceSchema = new Schema({
  province: String
});

// Define schema for Postal Codes
const postalCodeSchema = new Schema({
  postalCode: String
});

// Define schema for User
const userSchema = new Schema({
  name: String,
  email: String,
  address: {
    street: String,
    city: {
      type: Schema.Types.ObjectId,
      ref: 'City'
    },
    province: {
      type: Schema.Types.ObjectId,
      ref: 'Province'
    },
    postalCode: {
      type: Schema.Types.ObjectId,
      ref: 'PostalCode'
    }
  }
});

// Define models
const City = mongoose.model('City', citySchema);
const Province = mongoose.model('Province', provinceSchema);
const PostalCode = mongoose.model('PostalCode', postalCodeSchema);
const User = mongoose.model('User', userSchema);

module.exports = { City, Province, PostalCode, User };

*/