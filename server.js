const express = require("express")
const mongoose = require("mongoose")
const Recording = require("./recordingSchema")
var app = express()
var Data = require("./sampleSchema")

mongoose.connect("mongodb://127.0.0.1/fddg")

mongoose.connection.once("open", () => {
    console.log("Connected to fddg DB!")
}).on("error", (error) => {
    console.log("Failed to connect " + error)
})


// CREATE
app.post("/createRecording", (req, res) => {
    var recording = new Recording({
        subject_id: req.get("subject_id"),
        fall_time: req.get("fall_time"),
        fall_type: req.get("fall_type"),
        recording_duration: req.get("recording_duration"),
        ground_time: req.get("ground_time"),
        p_ecg: Freq.get("p_ecg"),
        p_acc_x: req.get("p_acc_x"),
        p_acc_y: req.get("p_acc_y"),
        p_acc_z: req.get("p_acc_z"),
        acc_x: req.get("acc_x"),
        acc_y: req.get("acc_y"),
        acc_z: req.get("acc_z"),
        gyro_x: req.get("gyro_x"),
        gyro_y: req.get("gyro_y"),
        gyro_z: req.get("gyro_z"),
        grav_x: req.get("grav_x"),
        grav_y: req.get("grav_y"),
        grav_z: req.get("grav_z"),
        magn_x: req.get("magn_x"),
        magn_y: req.get("magn_y"),
        magn_z: req.get("magn_z"),
        att_roll: req.get("att_roll"),
        att_pitch: req.get("att_pitch"),
        att_yaw: req.get("att_yaw"),
        delta_heading: req.get("delta_heading")
    })

    sample.save().then(() => {
        if (sample.isNew == false) {
            console.log("Saved data!")
            res.send("Saved data!")
        } else {
            console.log("Failure to save data")
            res.send("Fauked to save data")
        }
    })
})

app.post("/createUser", (req, res) => {
    var user = new User({
        name: req.get("name"),
        age: req.get("age"),
        height: req.get("height"),
        weight: req.get("weight"),
        is_female: req.get("is_female"),
        medical_conditions: req.get("medical_conditions")
    })

    sample.save().then(() => {
        if (sample.isNew == false) {
            console.log("Saved data!")
            res.send("Saved data!")
        } else {
            console.log("Failure to save data")
            res.send("Failed to save data")
        }
    })
})

// UPDATE
app.post("/updateRecording", (req, res) => {
    Recording.findOneAndUpdate({
        _id: req.get("id")
    }, {
        subject_id: req.get("subject_id"),
        fall_time: req.get("fall_time"),
        fall_type: req.get("fall_type"),
        recording_duration: req.get("recording_duration"),
        ground_time: req.get("ground_time"),
        p_ecg: Freq.get("p_ecg"),
        p_acc_x: req.get("p_acc_x"),
        p_acc_y: req.get("p_acc_y"),
        p_acc_z: req.get("p_acc_z"),
        acc_x: req.get("acc_x"),
        acc_y: req.get("acc_y"),
        acc_z: req.get("acc_z"),
        gyro_x: req.get("gyro_x"),
        gyro_y: req.get("gyro_y"),
        gyro_z: req.get("gyro_z"),
        grav_x: req.get("grav_x"),
        grav_y: req.get("grav_y"),
        grav_z: req.get("grav_z"),
        magn_x: req.get("magn_x"),
        magn_y: req.get("magn_y"),
        magn_z: req.get("magn_z"),
        att_roll: req.get("att_roll"),
        att_pitch: req.get("att_pitch"),
        att_yaw: req.get("att_yaw"),
        delta_heading: req.get("delta_heading")
    }, (err) => {
        console.log("Failed to update " + err)
    })

    res.send("Updated!")
})

// FETCH
app.get("/fetchRecordings", (req, res) => {
    Recording.find({}).then((DBitems) => {
        res.send(DBitems)
    })
})

/*
// DELETE
app.post("/delete", (req, res) => {
    Data.findOneAndRemove({
        _id: req.get("id")
    }, (err) => {
        console.log("Failed to delete " + err)
    })

    res.send("Deleted!")
})
*/

// http://IPv4:port/create
var server = app.listen(8081, "192.168.10.114", () => {
    console.log("Server is running!")
})