const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Data = require("./models/data.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session =require("express-session");
const flash = require("connect-flash");

const ExpressError = require("./utils/ExpressError.js");
const validateListing = require("./middleware.js");//let see next time
const listings = require("./routes/listing.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const sessionOptions = {
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 *1000 ,
        maxAge: 7 * 24 * 60 * 60 *1000 ,
        httpOnly: true,
    }
};
app.use(session(sessionOptions));
app.use(flash());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs",ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

//middleware for flash
app.use((req,res,next)=>{
    res.locals.success = req.flash("sucess");
    next();
});

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
app.use("/home",listings);


//for remain path
app.all("/*path",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
});

//middleware
app.use((err,req,res,next)=>{
    let{statusCode=500,message="500:Something went wrong!"} = err;
    //res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{err});
});