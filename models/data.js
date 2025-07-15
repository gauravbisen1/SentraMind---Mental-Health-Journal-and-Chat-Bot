const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    text: { type: String, required: true },
    sentiment: { type: String },
    date: { type: Date, default: Date.now }
});

const data = mongoose.model("data",dataSchema);
module.exports = data;
