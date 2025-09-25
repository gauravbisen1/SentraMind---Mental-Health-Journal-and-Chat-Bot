const express = require("express");
const router = express.Router();
const Data = require("../models/data.js");
const wrapAsync = require("../utils/wrapAsync.js");


//index route
router.get("/", wrapAsync (async (req,res)=>{
    try {
        const allData = await Data.find({});
        res.json(allData);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to fetch Data"});
    }
}));

//new route REMAIN
// router.get("/new",(req,res)=>{
//     res.render("listings/new.ejs");
// });

//show route
router.get("/:id",wrapAsync (async(req,res)=>{
    let {id} = req.params;
    try {
        if (!id) {
            res.status(404).json({error: " Data Not Found!"});
        }
        const data = await Data.findById(id);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to fetch data"});
    }
}));

//create route
router.post("/" ,wrapAsync (async (req,res,next)=>{
    const newData = new Data(req.body);
    if(!newData){
        res.status(400).json({error: "missing required data"});
    }
    try {
        await newData.save();
        res.json({newData});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "something went wrong"});
    }
}));

//edit route 
router.get("/:id/edit", wrapAsync (async(req,res)=>{
    let {id} = req.params;
    try {
        const data = await Data.findById(id);
        if (!data) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to fetch data"});
    }
}));

//update route
router.put("/:id",wrapAsync (async(req,res)=>{
    let {id} = req.params;
    try {
        let updatedData = await Data.findByIdAndUpdate(id, req.body,{ new: true, runValidators: true }
            );
        if (!updatedData) {
            return res.status(404).json({ error: "Data not found" });
        }
        res.json(updatedData);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to update"});
    }
    
}));

//delete route
router.delete("/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    try {
        let deletedData = await Data.findByIdAndDelete(id);
        if (!deletedData) {
            res.status(404).json({error: " Data could Not be Deleted!"});
        }
        res.status(200).json({success: "Data deleted successfully!"});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Failed to delete chat"});
    }
}));

module.exports = router;