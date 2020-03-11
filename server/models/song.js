const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: String,
    genre: String,
    album: String,
    artist_id: String
});

module.exports = mongoose.model("Song", songSchema);