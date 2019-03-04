// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

require('dotenv').config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

require('../configs/database')

let users = [
  {
    _id: "5c77e61ee8e56c780ea00115",
    email: "abudd1094@gmail.com",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    display_name: "Alec Budd",
    bc_url: "https://alecbudd.bandcamp.com/",
    sc_url: "https://soundcloud.com/alecbudd1994",
    yt_url: "https://www.youtube.com/channel/UCSbLJTJ-Diq_KxUQjnsKxHg?view_as=subscriber",
    custom_url: "",
    bio: "Experiments & compositions of an electronic nature.",
    location: "Berlin",
    user_img: ""
},
]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })