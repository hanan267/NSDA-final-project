const express = require("express");
const app = express();
const port = 5500;

// db connection
const dbconnection = require("./DataBase/dbConfig");

// user routes middleware
const userRoute = require("./routes/userRoute")

// user routes middle ware
app.use("/api/users", userRoute);

//question routes middle ware

// answer routes middle ware

async function start() {
  try {
    const result = await dbconnection.execute("select 'test'");
    console.log("Database connection established");

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.log(err.message);
  }
}
start();
