const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Data = require("./models/data.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session =require("express-session");
const flash = require("connect-flash");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const validateListing = require("./middleware.js");//let see next time

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
app.use(flash());
app.use(session(sessionOptions));
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

//index route
app.get("/home", wrapAsync (async (req,res)=>{
    const allData = await Data.find({});
    res.render("listings/index.ejs",{allData});
}));

//new route
app.get("/home/new",wrapAsync((req,res)=>{
    res.render("listings/new.ejs");
}));

//show route
app.get("/home/:id",wrapAsync (async(req,res)=>{
    let {id} = req.params;
    const data = await Data.findById(id);
    res.render("listings/show.ejs",{data});
}));

//create route
app.post("/home" ,wrapAsync (async (req,res)=>{
    try {
        const newData = new Data(req.body.data);
        await newData.save();
        res.redirect("/home");
    } catch (error) {
        next(arr);//error handler call
    }
}));

//edit route
app.get("/home/:id/edit", wrapAsync (async(req,res)=>{
    let {id} = req.params;
    const data = await Data.findById(id);
    res.render("listings/edit.ejs",{data});
}));

//update route
app.put("/home/:id",wrapAsync (async(req,res)=>{
    let {id} = req.params;
    await Data.findByIdAndUpdate(id, {...req.body.data});
    res.redirect(`/home/${id}`);
}));

//delete route
app.delete("/home/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let deletedData = await Data.findByIdAndDelete(id);
    console.log("data deleted!");
    res.redirect("/home");
}));

//for remain path
// app.all("*/path",(req,res,next)=>{
//     next(new ExpressError(404,"Page not found!"));
// });
app.all("/*path",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
});

//middleware
app.use((err,req,res,next)=>{
    let{statusCode=500,message="500:Something went wrong!"} = err;
    //res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{err});
});