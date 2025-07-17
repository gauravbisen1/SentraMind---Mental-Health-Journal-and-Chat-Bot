const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Data = require("./models/data.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
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
app.get("/home", async (req,res)=>{
    const allData = await Data.find({});
    res.render("listings/index.ejs",{allData});
});

//new route
app.get("/home/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//show route
app.get("/home/:id", async(req,res)=>{
    let {id} = req.params;
    const data = await Data.findById(id);
    res.render("listings/show.ejs",{data});
});

//create route
app.post("/home", async (req,res)=>{
    const newData = new Data(req.body.data);
    await newData.save();
    res.redirect("/home");
});

//edit route
app.get("/home/:id/edit", async(req,res)=>{
    let {id} = req.params;
    const data = await Data.findById(id);
    res.render("listings/edit.ejs",{data});
});

//update route
app.put("/home/:id",async(req,res)=>{
    let {id} = req.params;
    await Data.findByIdAndUpdate(id, {...req.body.data});
    res.redirect(`/home/${id}`);
});

//delete route
app.delete("/home/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedData = await Data.findByIdAndDelete(id);
    console.log("data deleted!");
    res.redirect("/home");
});