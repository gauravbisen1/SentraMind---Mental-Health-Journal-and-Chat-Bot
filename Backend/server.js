const express = require("express");
const app = express();
const chatRoutes = require("./routes/chat.js")
require('dotenv').config();
const mongoose = require("mongoose");
const Data = require("./models/data.js");
const listings = require("./routes/listing.js");
const ExpressError = require("./utils/ExpressError.js");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");

// allow frontend origin
app.use(cors({
    origin: "http://localhost:5173"  // your React app
}));

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

//listing routes
app.use("/sentra",listings);
//ai
app.use("/api", chatRoutes);

//for remain path.
app.all("/*path",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
});


