const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    name: String,
    year_started: Number,
});

module.exports = mongoose.model("Artist", artistSchema);