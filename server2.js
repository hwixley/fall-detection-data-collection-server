const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var accessControl = require("express-ip-access-control");
var ObjectId = mongoose.Types.ObjectId ;

const User = require("./userSchema");
const Chunk = require("./recordingChunkSchema");
const Meta = require("./recordingMetaSchema");

var app = express();

const ip = "192.168.8.160";
const port = 8081;

// Firewall
const whitelist = [ip, "192.168.8.185"];
var options = {
    mode: 'allow',
    denys: [],
    allows: whitelist,
    forceConnectionAddress: false,
    log: (clientIp, access) => {
        console.log(clientIp + (access ? " accessed." : " denied."));
    },
    statusCode: 401,
    redirectTo: "",
    message: "Unauthorized"
}
var middleware = accessControl(options);
app.use(accessControl(options));

// Add bodyParser for sending recordings
app.use(bodyParser.json({limit: '50mb'}));

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Connect to the DB
mongoose.connect("mongodb://127.0.0.1/fddg")

mongoose.connection.once("open", () => {
    console.log("Connected to fddg DB!")
}).on("error", (error) => {
    console.log("Failed to connect " + error)
})

// SERVER ROUTES:

app.head("/ping", (req, res) => {
    console.log("pinged")
    res.send("success");
});

// CREATE
app.post("/createChunk", jsonParser, (req, res) => {
    var chunk = new Chunk({
        _id: req.body._id,
        recording_id: req.body.recording_id,
        chunk_index: req.body.chunk_index,
        labels: req.body.labels,
        p_ecg: req.body.p_ecg,
        p_hr: req.body.p_hr,
        p_contact: req.body.p_contact,
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
        delta_heading: req.body.delta_heading
    })

    if (chunk.isNew) {
        chunk.save().then(() => {
            if (chunk.isNew == false) {
                console.log("Successfully saved chunk " + String(chunk.chunk_index) + " with ID:" + chunk._id)
                res.send("success")
            } else {
                console.log("Failed to /createChunk")
                res.send("fail")
            }
        })
    } else {
        console.log("Failed to add duplicate chunk")
        res.send("duplicate")
    }
})

app.post("/createMeta", jsonParser, (req, res) => {
    var meta = new Meta({
        _id: req.body._id,
        subject_id: req.body.subject_id,
        phone_placement: req.body.phone_placement,
        recording_duration: req.body.recording_duration,
        chunk_ids: req.body.chunk_ids
    })

    meta.save().then(() => {
        if (meta.isNew == false) {
            console.log("Successfully saved metaData with ID:" + meta._id)
            res.send("success")
        } else {
            console.log("Failed to /createMeta")
            res.send("fail")
        }
    })
})

app.post("/createUser", jsonParser, (req, res) => {
    var user = new User({
        subject_id: req.body.subject_id,
        name: req.body.name,
        yob: req.body.yob,
        height: req.body.height,
        weight: req.body.weight,
        is_female: req.body.is_female,
        medical_conditions: req.body.medical_conditions
    })

    user.save().then(() => {
        if (user.isNew == false) {
            console.log("Successfully saved user " + user.name + " with ID:" + user._id)
            res.send(user._id)
        } else {
            console.log("Failed to /createUser")
            res.send("fail")
        }
    })
})


// FETCH
app.get("/fetchChunks", (req, res) => {
    Chunk.find({}).then((DBitems) => {
        res.send(DBitems)
    })
})

app.get("/fetchNumChunks", (req, res) => {
    Chunk.count( {}, (err, result) => {
        if (err) {
            console.log("Failed to perform /fetchNumChunks: " + err)
            res.send("fail")
        } else {
            console.log("Successfully fetched number of chunks!")
            res.json(result)
        }
    })
})

app.get("/fetchMetas", (req, res) => {
    Meta.find({}).then((DBitems) => {
        res.send(DBitems)
    })
})


app.get("/fetchUsers", (req, res) => {
    User.find({}).then((DBitems) => {
        res.send(DBitems)
    })
})

app.get("/fetchNumUsers", (req, res) => {
    User.count( {}, (err, result) => {
        if (err) {
            console.log("Failed to perform /fetchNumUsers: " + err)
            res.send("fail")
        } else {
            console.log("Successfully fetched number of users!")
            res.json(result)
        }
    })
})


// QUERY
app.get("/fetchUser", (req, res) => {
    User.find({
        subject_id: req.get("subject_id")
    }, (err, user) => {
        if (err) {
            console.log("Failed to /fetchUser: " + err)
            res.send("fail")
        } else {
            if (user.length > 0) {
                console.log("Successfully fetched user " +  user[0].name + " with ID:" + user[0].subject_id)
            } else {
                console.log("unable to find users with the id " + req.get("subject_id"))
            }
            res.send(user)
        }
    })
})


// DELETE

app.post("/deleteChunks", (req, res) => {
    console.log("delete...")
    Chunk.find({}).then((DBitems) => {
        for (var i = 0; i < DBitems.count; i++) {
            Chunk.findOneAndRemove({
                _id: DBitems[i]._id
            }, (err) => {
                if (err) {
                    console.log("Failed to /deleteChunk " + err)
                    res.send("fail")
                } else {
                    console.log("Successfully deleted chunk!")
                    res.send("success")
                }
            })
        }
    })
})


app.post("/deleteChunk", (req, res) => {
    User.findOneAndRemove({
        _id: ObjectId(req.get("id").substring(0,11))
    }, (err) => {
        if (err) {
            console.log("Failed to /deleteChunk: " + err)
            res.send("fail")
        } else {
            console.log("Successfully deleted chunk!")
            res.send("success")
        }
    })
})


app.post("/deleteUser", (req, res) => {
    User.findOneAndRemove({
        _id: req.get("id")
    }, (err) => {
        if (err) {
            console.log("Failed to /deleteUser: " + err)
            res.send("fail")
        } else {
            console.log("Successfully deleted user!")
            res.send("success")
        }
    })
})

// Error handler
app.use((err, req, res, next) => {
    console.log("Error handler", err);
    res.statusCode(err.statusCode || 500);
    res.send("Something broke");
})

// http://IPv4:port/create
var server = app.listen(port, ip, () => {
    console.log("HTTP server is running!")
})
