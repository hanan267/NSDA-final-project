require("dotenv").config()
const express = require("express");
const app = express();
const port = 5500;

// db connection
const dbconnection = require("./DataBase/dbConfig");

// user routes middleware
const userRoute = require("./routes/userRoute")

// question routs middle  ware file 
const questionRoutes = require('./routes/questionRoute');
//authentication middle ware
const authMiddleWare = require("./middleWare/authMiddleWare");
 
// json middle ware to extract json data
app.use(express.json());

// user routes middle ware
app.use("/api/users", userRoute);


//question routes middle ware
app.use("/api/questions",authMiddleWare, questionRoutes);

// answer routes middle ware

async function start() {
  try {
    const result = await dbconnection.execute("select 'test'");
    await app.listen(port);
      console.log(`Server listening on port ${port}`);
      console.log("Database connection established");
  } catch (err) {
    console.log(err.message);
  }
}
start();


