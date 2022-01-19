const express = require("express")
const mongoose = require("mongoose")
var bodyParser = require("body-parser")
const Recording = require("./recordingSchema")
const User = require("./userSchema")
var app = express()

const ip = "192.168.8.160"
const port = 8081


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

mongoose.connect("mongodb://127.0.0.1/fddg")

mongoose.connection.once("open", () => {
    console.log("Connected to fddg DB!")
}).on("error", (error) => {
    console.log("Failed to connect " + error)
})


// CREATE
app.post("/createRecording", jsonParser, (req, res) => {
    var recording = new Recording({
        subject_id: req.body.subject_id,
        fall_time: req.body.fall_time,
        fall_type: req.body.fall_type,
        recording_duration: req.body.recording_duration,
        ground_time: req.body.ground_time,
        action: req.body.action,
        phone_placement: req.body.phone_placement,
        p_ecg: req.body.p_ecg,
        p_hr: req.body.p_hr,
        p_hr_rss: req.body.p_hr_rss,
        p_hr_rssms: req.body.p_hr_rssms,
        p_hr_rss_peak: req.body.p_hr_rss_peak,
        p_hr_rssms_peak: req.body.p_hr_rssms_peak,
        p_acc_x: req.body.p_acc_x,
        p_acc_y: req.body.p_acc_y,
        p_acc_z: req.body.p_acc_z,
        acc_x: req.body.acc_x,
        acc_y: req.body.acc_y,
        acc_z: req.body.acc_z,
        gyr_x: req.body.gyr_x,
        gyr_y: req.body.gyr_y,
        gyr_z: req.body.gyr_z,
        gra_x: req.body.gra_x,
        gra_y: req.body.gra_y,
        gra_z: req.body.gra_z,
        mag_x: req.body.mag_x,
        mag_y: req.body.mag_y,
        mag_z: req.body.mag_z,
        att_roll: req.body.att_roll,
        att_pitch: req.body.att_pitch,
        att_yaw: req.body.att_yaw,
        delta_heading: req.body.delta_heading,
        timestamps: req.body.timestamps
    })

    recording.save().then(() => {
        if (recording.isNew == false) {
            console.log("Successfully saved!")
            res.send(recording._id)
        } else {
            console.log("Failed to save")
            res.send("failure")
        }
    })
})

app.post("/createUser", jsonParser, (req, res) => {
    var user = new User({
        subject_id: req.body.subject_id,
        name: req.body.name,
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
        is_female: req.body.is_female,
        medical_conditions: req.body.medical_conditions
    })

    user.save().then(() => {
        if (user.isNew == false) {
            console.log("Successfully saved!")
            res.send(user._id)
        } else {
            console.log("Failed to save")
            res.send("failure")
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
        gyro_x: req.get("gyr_x"),
        gyro_y: req.get("gyr_y"),
        gyro_z: req.get("gyr_z"),
        grav_x: req.get("gra_x"),
        grav_y: req.get("gra_y"),
        grav_z: req.get("gra_z"),
        magn_x: req.get("mag_x"),
        magn_y: req.get("mag_y"),
        magn_z: req.get("mag_z"),
        att_roll: req.get("att_roll"),
        att_pitch: req.get("att_pitch"),
        att_yaw: req.get("att_yaw"),
        delta_heading: req.get("delta_heading")
    }, (err) => {
        if (err != null) {
            console.log("Failed to update " + err)
        } else {
            console.log("Successfully updated!")
        }
    })

    res.send("Updated!")
})

app.post("/updateUser", (req, res) => {
    User.findOneAndUpdate({
        _id: req.get("id")
    }, {
        subject_id: req.get("subject_id"),
        name: req.get("name"),
        age: req.get("age"),
        height: req.get("height"),
        weight: req.get("weight"),
        is_female: req.get("is_female"),
        medical_conditions: req.get("medical_conditions")
    }, (err) => {
        if (err != null) {
            console.log("Failed to update " + err)
        } else {
            console.log("Successfully updated!")
        }
    })

    res.send("Updated!")
})


// FETCH
app.get("/fetchRecordings", (req, res) => {
    Recording.find({}).then((DBitems) => {
        res.send(DBitems)
    })
})

app.get("/fetchUsers", (req, res) => {
    User.find({}).then((DBitems) => {
        res.send(DBitems)
    })
})


// QUERY
app.get("/fetchUser", (req, res) => {
    User.find({
        subject_id: req.get("subject_id")
    }, (err, user) => {
        if (err != null) {
            console.log("Failed to /fetchUser: " + err)
        } else {
            console.log("Successfully fetched user!")
            res.send(user)
        }
    })

    /*User.findById({
        _id: req.get("id")
    }, (err, user) => {
        if (err != null) {
            console.log("Failed to /fetchUser: " + err)
        } else {
            console.log("Successfully fetched user!")
            res.send(user)
        }
    })*/
})


// DELETE
app.post("/deleteRecording", (req, res) => {
    Recording.findOneAndRemove({
        _id: req.get("id")
    }, (err) => {
        if (err != null) {
            console.log("Failed to delete " + err)
        } else {
            console.log("Successfully deleted!")
        }
    })

    res.send("Deleted!")
})

app.post("/deleteUser", (req, res) => {
    User.findOneAndRemove({
        _id: req.get("id")
    }, (err) => {
        if (err != null) {
            console.log("Failed to delete " + err)
        } else {
            console.log("Successfully deleted!")
        }
    })

    res.send("Deleted!")
})


// http://IPv4:port/create
var server = app.listen(port, ip, () => {
    console.log("Server is running!")
})