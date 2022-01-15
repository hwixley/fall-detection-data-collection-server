var mongoose = require("mongoose")
var Schema = mongoose.Schema

var sample = new Schema({
    subjectID: String,
    p_ecg: Float32Array,
    p_acc_x: Float32Array,
    p_acc_y: Float32Array,
    p_acc_z: Float32Array,


})

const data = mongoose.model("data", sample)

module.export = data