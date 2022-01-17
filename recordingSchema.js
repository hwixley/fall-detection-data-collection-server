var mongoose = require("mongoose")
var Schema = mongoose.Schema

var recording = new Schema({
    subject_id: String,
    fall_time: Float64Array,
    fall_type: String,
    recording_duration: Float64Array,
    ground_time: Float64Array,
    p_ecg: Float64Array,
    p_acc_x: Float64Array,
    p_acc_y: Float64Array,
    p_acc_z: Float64Array,
    acc_x: Float64Array,
    acc_y: Float64Array,
    acc_z: Float64Array,
    gyro_x: Float64Array,
    gyro_y: Float64Array,
    gyro_z: Float64Array,
    grav_x: Float64Array,
    grav_y: Float64Array,
    grav_z: Float64Array,
    magn_x: Float64Array,
    magn_y: Float64Array,
    magn_z: Float64Array,
    att_roll: Float64Array,
    att_pitch: Float64Array,
    att_yaw: Float64Array,
    delta_heading: Float64Array
})

const Recording = mongoose.model("Recording", recording)

module.exports = Recording