const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Data = require("./models/data.js");

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

//test
app.get("/test" , async (req,res)=>{
    let sampleData = new Data({
        text: "Sample Data",
        sentiment: "sample emotion",
    });
    //to save in db
    await sampleData.save();
    console.log("Sample data saved!");
    res.send("test successful!!");
});