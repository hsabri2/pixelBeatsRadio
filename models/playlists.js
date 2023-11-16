// Playlist Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    name: String,
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
    timeslot: String,

  });

//model based on schema
const Playlist = mongoose.model('Playlist', playlistSchema);