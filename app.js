require('dotenv').config()
var express = require('express');
var app=express();
const mongoose = require('mongoose');
const port=8000
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors= require('cors');
var authRoutes=require("./routes/auth")
var userRoutes=require("./routes/user")
var categoryRoutes=require("./routes/category")
var productRoutes=require("./routes/product")
var orderRoutes=require("./routes/order")





app.use(cookieParser());
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());

//db connection 
mongoose.connect(process.env.DATABASE,{
useNewUrlParser:true,
useUnifiedTopology:true,
useCreateIndex:true

}).then(()=>{
    console.log("DB CONNECTED")
})
.catch(()=>{
    console.log("DB NOT CONNECTED")
})
   
//custom Routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);









app.listen(port,()=>{
    console.log("server is up and running on 8000")
}) 