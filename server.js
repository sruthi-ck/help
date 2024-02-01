const express=require ("express");
const colors=require("colors");
const morgan = require("morgan");
const dotenv= require("dotenv");
const cors=require("cors");
const connectDB = require("./config/db");
//for dotenv config
dotenv.config({path:'routes/.env'}); // giving path 
//mongodb connection in db.js
connectDB();

//for express
const app=express()

//middlewares
app.use(express.json());// parse requests of content-type - application/json
app.use(morgan("dev")) ; // on package jason server running in parellel 

//routes
app.use('/api/v1/user',require('./routes/userRoutes'));//give api version and require give routes path 
app.use('/api/v1/admin',require('./routes/adminRoutes'));// to add admin routes
app.use('/api/v1/doctor',require('./routes/doctorRoutes'));//to add doctor routes

//port uses
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode running on port ${process.env.PORT}`);
});

