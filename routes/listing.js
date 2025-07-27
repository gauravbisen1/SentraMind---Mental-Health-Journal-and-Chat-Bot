const express = require("express");
const router = express.Router();
const Data = require("../models/data.js");
const wrapAsync = require("../utils/wrapAsync.js");

//index route
router.get("/", wrapAsync (async (req,res)=>{
    const allData = await Data.find({});
    res.render("listings/index.ejs",{allData});
}));

//new route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//show route
router.get("/:id",wrapAsync (async(req,res)=>{
    let {id} = req.params;
    const data = await Data.findById(id);
    res.render("listings/show.ejs",{data});
}));

//create route
router.post("/" ,wrapAsync (async (req,res,next)=>{
    try {
        const newData = new Data(req.body.data);
        await newData.save();
        req.flash("success", "New Data Created!");
        res.redirect("/home");
    } catch (error) {
        next(error);//error handler call
    }
}));

//edit route
router.get("/:id/edit", wrapAsync (async(req,res)=>{
    let {id} = req.params;
    const data = await Data.findById(id);
    res.render("listings/edit.ejs",{data});
}));

//update route
router.put("/:id",wrapAsync (async(req,res)=>{
    let {id} = req.params;
    await Data.findByIdAndUpdate(id, {...req.body.data});
    res.redirect(`/home/${id}`);
}));

//delete route
router.delete("/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let deletedData = await Data.findByIdAndDelete(id);
    console.log("data deleted!");
    res.redirect("/home");
}));

module.exports = router;