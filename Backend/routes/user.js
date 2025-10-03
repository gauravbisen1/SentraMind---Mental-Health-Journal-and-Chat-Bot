const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const user = require("../models/user");
const passport = require("passport");
const router = express.Router();

router.post("/signup", wrapAsync(async (req, res) => {
  try {
    let { username, email, password } = req.body;
    // simple validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = new user({ email, username });
    const registeredUser = await user.register(newUser, password);
    console.log(registeredUser);
    return res.status(201).json({
      message: "User created successfully!",
      user: registeredUser
    });
    
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
}));

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      // authentication failed
      return res.status(401).json({ message: info?.message || "Invalid username or password" });
    }

    // log the user in
    req.logIn(user, (err) => {
      if (err) return next(err);

      // success
      return res.status(200).json({
        message: "User login successful!",
        user: req.user   // ✅ always use passport user
      });
    });
  })(req, res, next);
});

router.get("/logout",(req,res,next)=>{
  req.logOut((err)=>{
    if (err) {
      return next(err);
    }
    // Destroy session completely
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // clear session cookie
      res.status(200).json({ message: "Logged out successfully" });
    });
  })
})


module.exports = router;

