const mongoose = require("mongoose");

const moiveSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 200 },
}, { timestamps: true });

const Moive = mongoose.model("Moive", moiveSchema);
module.exports = Moive;
