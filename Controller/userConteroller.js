const dbConnection = require("../DataBase/dbConfig");

async function register(req, res) {
  const {username, firstname, lastname, email, password} = req.body;
  if (!email || !password || !firstname || !lastname) {
    return res.send("Please Provide all required information!")
  }
}

async function login(req, res) {
  res.send("login");
}

async function checkUser(req, res) {
  res.send("check use");
}

module.exports = {register, login, checkUser}