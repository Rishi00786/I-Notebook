const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "Thisismysecret"

// Route 1  Create a User using: POST "/api/auth/createuser". Doesn't require Auth
// It posts the request on https://localhost:3000/api/auth/createuser
router.post('/createuser', [//Describes the limitations on input of user and display errors//
  body('name', 'Name must be atleast 5 characters').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If any error occur in above three statements it will display it
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //finding user with same-email address
  try {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: "User with this E-mail address already exists" })
    }
    // Generating a salt for storage string password into a hash password
    var salt = await bcrypt.genSalt(10);
    var SecuredPassword = await bcrypt.hash(req.body.password, salt)

    //Creating a new user
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      password: SecuredPassword,
      email: req.body.email
    });
    const data = {
      user: {
        id: user.id
      }
    };

    // Making of an Authentication Token
    const AuthToken = jwt.sign(data, JWT_SECRET);
    // res.json(user)
    res.json({ AuthToken: AuthToken });    // If anything in try bracket fails , will come inside error of catch
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ error: "Some UnKnown Error occured" })
  }

})

//  Route 2 Make User Login: POST "/api/auth/login".

router.post('/login',[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Collecting email and password entered above into these variables
  const { email, password } = req.body;
  // Finding if these users exist!?
  try {
    let user = await User.findOne({ email })
    if (!user) {
      res.status(400).json({ error: "Please enter correct credentials" })
    }
    // Comparing user's password to its original password
    const PswdCmpre = await bcrypt.compare(password, user.password)
    if (!PswdCmpre) {
      res.status(400).json({ error: "Please enter correct credentials" })
    }
    const data = {
      user: {
        id: user.id
      }
    };
    const AuthToken = jwt.sign(data, JWT_SECRET);
    // res.json(user)
    res.json({ AuthToken: AuthToken });
  } catch (error) {
    console.error(error.message)
    return res.status(400).json({ error: "Some UnKnown Error occured" })
  }
})

//  Route 3 Get User Info from AuthToken : POST "/api/auth/getuser".
// Input is AuthToken in header
router.post('/getuser', fetchuser,
  async (req, res) => {
    try {
      // Gets user id from data of user passed from fetchuser middleware
      const user_id = req.user.id
      // All details of user except the password
      const user = await User.findById(user_id).select("-password")
      // const user = await User.findById(user_id)
      res.send(user);
    } catch (error) {
      console.error(error.message)
      res.status(400).send("Some UnKnown Error occured")
    }
  })


module.exports = router