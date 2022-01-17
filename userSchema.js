var mongoose = require("mongoose")
var Schema = mongoose.Schema

var user = new Schema({
    name: String,
    age: Number,
    height: Number,
    weight: Number,
    is_female: Boolean,
    medical_conditions: String
})

const User = mongoose.model("User", user)

module.exports = User