// loaded .env file for config
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const User = require("./models/users");
const Blog = require("./models/blog");
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
    return res.status(400).send({ error: "User already exists please login" });
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

app.post("/blogs", jsonParser, async (req, res) => {
  const { authtoken } = req.headers;
  const blog = req.body;

  const user = await validateAuthToken(authtoken);
  if (user) {
    const newBlog = new Blog({
      ...blog,
      userID: user._id,
    });
    await newBlog.save();
    return res.status(200).send(newBlog);
  }
  return res.status(401).send({ msg: "Unauthorized user" });
});

app.put("/blogs/:blogID", jsonParser, async (req, res) => {
  const { authtoken } = req.headers;
  const { blogID } = req.params;
  const updatedBlog = req.body;

  const user = await validateAuthToken(authtoken);
  if (user) {
    let blog;
    try {
      blog = await Blog.findById(blogID);
    } catch (error) {
      return res.status(404).send({ msg: "Invalid blog ID" });
    }
    if (blog) {
      if (blog.userID.toString() === user._id.toString()) {
        blog.title = updatedBlog.title;
        blog.content = updatedBlog.content;
        await blog.save();
        return res.status(200).send(blog);
      } else {
        return res
          .status(401)
          .send({ msg: "You are not authorized to perform this operation" });
      }
    } else {
      return res.status(400).send({ msg: "Blog does not exist" });
    }
  }

  return res.status(401).send({ msg: "Unauthorized user" });
});

app.delete("/blogs/:blogID", jsonParser, async (req, res) => {
  const { authtoken } = req.headers;
  const { blogID } = req.params;

  const user = await validateAuthToken(authtoken);
  if (user) {
    let blog;
    try {
      blog = await Blog.findById(blogID);
    } catch (error) {
      return res.status(404).send({ msg: "Invalid blog ID" });
    }
    if (blog) {
      if (blog.userID.toString() === user._id.toString()) {
        await blog.delete();
        return res
          .status(200)
          .send({ msg: "Blog has been delted succesfully" });
      } else {
        return res
          .status(401)
          .send({ msg: "You are not authorized to perform this operation" });
      }
    } else {
      return res.status(400).send({ msg: "Blog does not exist" });
    }
  }

  return res.status(401).send({ msg: "Unauthorized user" });
});

app.get("/user-blogs", jsonParser, async (req, res) => {
  const { authtoken } = req.headers;
  const user = await validateAuthToken(authtoken);
  if (user) {
    let blogs = await Blog.find({ userID: user._id });
    return res.status(200).send(blogs);
  }
  return res.status(401).send({ msg: "Unauthorized user" });
});

app.get("/blogs", jsonParser, async (req, res) => {
  let blogs = await Blog.find({});
  return res.status(200).send(blogs);
});

async function validateAuthToken(authtoken) {
  if (!authtoken) {
    return; //undefined value
  }
  const user = await User.findOne({ authToken: authtoken });

  return user; // user, null
}

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
