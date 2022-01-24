const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose")
const MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
const jfile = require("./amy11.json")
const cors = require('cors');

app.use(cors());

app.get("/receipt",(req,res)=>{
    res.json(jfile);
});


MongoClient.connect('mongodb://localhost:27017/',(err,db)=>{
      if(err)
      {
          console.log(err);
      }
      else{
          console.log("Database connected successfully");
       }
});

 

app.listen(4000,(err)=>{
     if(err)
     {
         console.log(err);
     }
     else{
         console.log("Server started on port 4000");
     }
});

