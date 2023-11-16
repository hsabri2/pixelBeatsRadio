// Playlist Schema
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    name: String,
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],

  });

//model based on schema
const Playlist = mongoose.model('Playlist', playlistSchema);