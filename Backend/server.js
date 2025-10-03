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
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")
const userRouter = require("./routes/user.js")
const { isLoggedIn } = require('./middlewares/middleware.js');

// allow frontend origin(cors)
app.use(cors({
    origin: "http://localhost:5173",  // your React app
    credentials: true,               // allow cookies/credentials
}));

const sessionOptions = {
    secret : "mySuperSecretCode",
    resave : false,
    saveUninitialized : true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 *1000 ,
        maxAge: 7 * 24 * 60 * 60 *1000 ,//for 7 days
        httpOnly: true,
    }
};
app.use(session(sessionOptions)); //session work successfully


//authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware
app.get('/new', isLoggedIn, (req, res) => {
    res.json({ user: req.user });
});

//demo user
app.get("/demouser", async(req,res) =>{
    let fakeUser = new User({
        email: "gaurav@gmail.com",
        username: "gaurav",
    });
    let registeredUser = await User.register(fakeUser,"hello123");
    res.json(registeredUser);
})



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

//user route
app.use("/",userRouter);

//for remain path.
app.all("/*path",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
});


