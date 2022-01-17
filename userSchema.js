var mongoose = require("mongoose")
var Schema = mongoose.Schema

var user = new Schema({
    name: String,
    age: Int32Array,
    height: Float64Array,
    weight: Float64Array,
    is_female: Boolean,
    medical_conditions: String
})

const User = mongoose.model("User", user)

module.exports = User