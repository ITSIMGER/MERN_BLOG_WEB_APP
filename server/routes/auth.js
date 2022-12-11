const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      // If no user is found, send a response with a status code of 400, an error message, and a "message" property with the error message
      return res.status(400).json({
        message: "Wrong username!",
        error: "Wrong username!"
      });
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      // If the passwords don't match, send a response with a status code of 400, an error message, and a "message" property with the error message
      return res.status(400).json({
        message: "Wrong Password",
        error: "Wrong Password"
      });
    }

    // If the username and password are correct, return the user object without the password field
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    // In the event of an error, send a response with a status code of 500 and the error
    res.status(500).json(err);
  }
});

module.exports = router;

// //LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     !user && res.status(400).json("Wrong username!");

//     const validated = await bcrypt.compare(req.body.password, user.password);
//     !validated && res.status(400).json("Wrong Password");

//     const { password, ...others } = user._doc;
//     return res.status(200).json(others);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });





// //LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//    if(!user){res.status(400).json("Wrong credentials!");}

//     const validated = await bcrypt.compare(req.body.password, user.password);
//     if(!validated)  {res.status(400).json("Wrong credentials!");}

//     const { password, ...others } = user._doc;
//     return res.status(200).json(others);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

// module.exports = router;





// const bcrypt = require('bcrypt');
// const express = require("express");
// const router = require("express").Router();


// // Set up a database or use an existing one here
// const User = require("../models/User");

// // router.use(express.json()); // Use JSON middleware to parse request body

// router.post('/register', async (req, res) => {
//   try {
//     // Extract the username and password from the request body
//     const { username, password, role } = req.body;

//     // Generate a salt for the user
//     const salt = await bcrypt.genSalt(10);

//     // Hash the password using the salt
//     const hashedPass = await bcrypt.hash(password, salt);

//     // Save the user to the database, including the hashed password and the role
//     // You will need to create a way to store and retrieve users from the database
//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPass,
//       role,
//     });

//     const user = await newUser.save();
//     // Save the user to the database here

//     res.send('User registered successfully');
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).send('Error registering user: ' + err.message);
//     res.status(500).json(err);
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     // Extract the username and password from the request body
//     // const { username, password } = req.body;

//     // Retrieve the user from the database by username
//     // You will need to create a way to store and retrieve users from the database
//     const user = await User.findOne({ username: req.body.username });
//     // Retrieve the user from the database here

//     // Check if the user exists
//     if (!user) {
//       return res.status(404).send('User not found');
      
//     }

//     // Compare the hashed password in the database with the provided password

//     const isMatch = await bcrypt.compare(req.body.password, user.password);

//     // If the passwords don't match, return an error
//     if (!isMatch) {
//       return res.status(401).send('Invalid username or password');
//     }

//     // If the passwords match, return the user's role
//     const { password, ...others } = user._doc;
//     res.status(200).json(others);
//     // res.send({ role: user.role });
//   } catch (err) {
//     res.status(500).send('Error logging in: ' + err.message);
//   }
// });

// module.exports = router;

