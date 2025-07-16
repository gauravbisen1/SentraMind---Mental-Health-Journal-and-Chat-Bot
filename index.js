const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Data = require("./models/data.js");
const path = require("path");
const ejsMate = require("ejs-mate");

app.engine("ejs",ejsMate);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

app.get("/",(req,res)=>{
    res.send("sentramind root!");
});

//connectDB
const Mongo_URL = "mongodb://127.0.0.1:27017/sentramind";
async function main(){
    await mongoose.connect(Mongo_URL);
}
main().then(()=>{
    console.log("connected to DB");
}).catch(err => {
    console.log(err);
});

//index route
app.get("/data", async (req,res)=>{
    const allData = await Data.find({});
    res.render("listings/index.ejs",{allData});
});