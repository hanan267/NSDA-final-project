const dbConnection = require("../DataBase/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');


async function register(req, res) {
  const {username, firstname, lastname, email, password} = req.body;
  if (!email || !password || !firstname || !lastname) {
    return res.status(StatusCodes.BAD_REQUEST).json({msg: "Provide all the required fields"})
  }

  try {

    const [user] = await dbConnection.query("select username, userid from users where username = ? or email = ?", [username, email])
    if (user.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({msg: "user already registered."})
    }

    if (password.length <= 8) {
      return res.status(StatusCodes.BAD_REQUEST).json({msg: "password must be at least 8 characters "})
    }
    // encrypt the password 
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query("INSERT INTO users (username, firstname, lastname, email,password) VALUES (?,?,?,?,?)", 
      [username, firstname,lastname, email, hashedPassword])
      return res.status(StatusCodes.CREATED).json({msg : "user registered!"})
    
  } catch(err) {
    console.log(err.message) 
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });

  }
  
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "please enter all required fields "})
  } try {
     const [user] = await dbConnection.query("select username, userid,password from users where email = ?", [email]);
     if (user.length == 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg : "invalid credintial" })
     } 
     //compare password
     const isMuch = await bcrypt.compare(password, user[0].password);
     if (!isMuch) {
       return res.status(StatusCodes.BAD_REQUEST).json({ msg: "invalid credintial"})
     }

     const username = user[0].username;
     const userid = user[0].userid;
     const token = jwt.sign({username, userid}, process.env.JWT_SECRET,{expiresIn: "1d"})

     return res.status(StatusCodes.OK).json({msg : "usre log in successful", token })

     
  }  catch(err) {
    console.log(err.message) 
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });

  }
  
}

async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;

  res.status(StatusCodes.OK).json({ msg : "valid user", username, userid})
  //res.send("check use"); 
}

module.exports = {register, login, checkUser}