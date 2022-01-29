var mongoose = require("mongoose")
var Schema = mongoose.Schema

var meta = new Schema({
    _id: String,
    subject_id: String,
    phone_placement: String,
    recording_duration: Number,
    chunk_ids: [String]
})

const Meta = mongoose.model("Meta", meta)

module.exports = Meta