// loaded .env file for config
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const User = require("./models/users");
const bodyParser = require("body-parser");

//Created app instance using excpress framework
const app = express();

// Extracted values from process env
const PORT = process.env.port;
const mongoURL = process.env.DATABASE_URL;

// created a databse promise for connection
const databsePromise = mongoose.connect(mongoURL);

// created json parser for Parsing of body frompost request
const jsonParser = bodyParser.json();

//defined a new post api with url signup
app.post("/signup", jsonParser, async (req, res) => {
  // Query with email is same emial exists in user database
  const existingUser = await User.findOne({ email: req.body.email });

  // if user exists return an error
  if (existingUser) {
    return res
      .send({ error: "User already exists please login" })
      .statusCode(400);
  }
  // generate new authtoken
  const authToken = uuidv4();

  // try to save user
  try {
    const newUser = new User({ ...req.body, authToken: [authToken] });
    newUser.save();
  } catch (error) {
    console.error(error);
    return res.send(error).status(400);
  }
  return res.send({ msg: "User created succesfully", authToken });
});

app.post("/login", jsonParser, async (req, res) => {
  // fetching user from datbase using emailId
  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) {
    // if user not found
    return res
      .send({ error: "User not found please enter valid details" })
      .status(400);
    // we would return an error
  }
  if (existingUser.password !== req.body.password) {
    return res.send({ error: "Invalid password" }).status(400);
  }
  // generate new authtoken
  const authToken = uuidv4();
  existingUser.authToken.push(authToken);
  await existingUser.save();
  return res.send({ msg: "LogIn succesfull", authToken });
});

// waiting for completion of database connection
databsePromise
  .then(() => {
    // as soon as database is connected start app
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    // if database fails consol.log this
    console.log("DB connection failed", err);
  });
