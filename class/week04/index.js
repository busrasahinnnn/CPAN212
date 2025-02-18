/* Project setup: For the server
1 - new project folder
2 - open an integrated terminal
3 - run these commands:
    npm init -y
    npm i nodemon express 
    (optional) -> go into package.json and add "type": "module" to enable import from 
*/
 
// [Please enable only ONE of these] 
import express from "express"; // if you are using type: module
//const express = require("express"); // if using common JS (Default)
import logger from "./middleware/logger.js";
import auth from "./middleware/auth.js";
const app = express();
const PORT = process.env.PORT || 8000;
 

app.use(logger); //this is application wide, so its run


//routes
app.get("/", logger, (req, res) => {
  res.send("Welcome to our server");
});

app.get("/login", (req, res) => {
 res.send("Welcome to our server");
  });

app.get("/login", (req, res) => {
 res.send("We've received your request - Login");
  });

app.post("/login", (req, res) => {
 res.send("We stole your information");
 });

app.get("/fetchData", auth, (req, res) => {
 res.send("Hi Busra, here is your profile data");
 });

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});