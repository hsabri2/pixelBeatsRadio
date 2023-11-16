// Song Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: String,
    artist: String,
    duration: Number,
    genre: String,
  });

const Song = mongoose.model('Song', songSchema);