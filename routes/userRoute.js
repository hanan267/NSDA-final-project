const express = require("express");
const router = express.Router();


// user controllers
const { register, login, checkUser} = require('../Controller/userConteroller');


// registers routes
router.post("/register", register)

// login user
router.post("/login", login)

// check user 
router.get("/check", checkUser)

  module.exports = router