var mongoose = require("mongoose")
var Schema = mongoose.Schema

var recording = new Schema({
    creation: {type: Date, default: Date.now},
    subject_id: String,
    fall_time: Number,
    fall_type: String,
    recording_duration: Number,
    ground_time: Number,
    p_ecg: [Number],
    p_acc_x: [Number],
    p_acc_y: [Number],
    p_acc_z: [Number],
    acc_x: [Number],
    acc_y: [Number],
    acc_z: [Number],
    gyr_x: [Number],
    gyr_y: [Number],
    gyr_z: [Number],
    gra_x: [Number],
    gra_y: [Number],
    gra_z: [Number],
    mag_x: [Number],
    mag_y: [Number],
    mag_z: [Number],
    att_roll: [Number],
    att_pitch: [Number],
    att_yaw: [Number],
    delta_heading: [Number]
})

const Recording = mongoose.model("Recording", recording)

module.exports = Recording