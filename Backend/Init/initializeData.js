const mongoose = require("mongoose");
const initData = require("./data.js");
const data = require("../models/data.js");

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

async function main(){
    await mongoose.connect(Mongo_URL);
}

const initDB = async ()=>{
    await data.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner: '68df60cc0c4042f9de7a2ad0'}));
    await data.insertMany(initData.data);
    console.log("data was initialized!");
}

initDB();