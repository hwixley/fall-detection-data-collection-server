var mongoose = require("mongoose")
var Schema = mongoose.Schema

var sample = new Schema({
    subjectID: String,
    p_ecg: String,
    p_acc_x: String,
    p_acc_y: String,
    p_acc_z: String
})

const Data = mongoose.model("Data", sample)

module.exports = Data