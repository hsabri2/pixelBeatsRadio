// DJ Schema
const Schema = mongoose.Schema;

const djSchema = new Schema({
    name: String,
    gender: String,
    age: Number
  });

const DJ = mongoose.model('DJ', djSchema);