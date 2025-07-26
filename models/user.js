const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    }
});

userSchema.plugin(PassportLocalMongoose);
module.exports = mongoose.model("User", userSchema);