const express = require("express")
const mongoose = require("mongoose")
var app = express()
var Data = require("./sampleSchema")

mongoose.connect("mongodb://127.0.0.1/fddg")

mongoose.connection.once("open", () => {
    console.log("Connected to fddg DB!")
}).on("error", (error) => {
    console.log("Failed to connect " + error)
})


// CREATE
app.post("/create", (req, res) => {
    var sample = new Data({
        subjectID: req.get("subjectID"),
        p_ecg: req.get("p_ecg"),
        p_acc_x: req.get("p_acc_x"),
        p_acc_y: req.get("p_acc_y"),
        p_acc_z: req.get("p_acc_z")
    })

    sample.save().then(() => {
        if (sample.isNew == false) {
            console.log("Saved data!")
            res.send("Saved data!")
        } else {
            console.log("Failure to save data")
        }
    })
})

// DELETE

// UPDATE

// FETCH
app.get("/fetch", (req, res) => {
    Data.find({}).then((DBitems) => {
        res.send(DBitems)
    })
})


// http://IPv4:port/create
var server = app.listen(8081, "192.168.10.114", () => {
    console.log("Server is running!")
})