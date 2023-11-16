const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const Song = require('./models/songs.js'); //import song model
const uri = "mongodb+srv://odessouk:pvdiD7VjHmU9ihPW@cluster0.pm2pmsq.mongodb.net/?retryWrites=true&w=majority";
const path = require('path');
const fs = require('fs');
const app = express();
var bodyParser = require('body-parser')
const port = 3000;
require('dotenv').config();


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
}
});

async function run() {
    try {
        // Connect the client to the server	
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const database = client.db('PixelBeatsRadio'); 
        const collection = await database.collection('Playlists').find({}).toArray(function (err, result) {
          if(err) return done( err );
          console.log(JSON.stringify(result));
        }); 
        collection.forEach(item => {
            item["timeslot"] = `${Math.floor(Math.random() * (12 - 9 + 1)) + 9}:00pm`
        })
console.log(collection)
        // Read data from songs.json file
        const songsData = JSON.parse(fs.readFileSync('models/songs.json', 'utf8'));
        const djData = JSON.parse(fs.readFileSync('models/playlists.json', 'utf8'));
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        console.log('Connection closed');
    }
}
run().catch(console.dir);


// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// Setup routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.use('/data/playlists', async (req, res) => {
    const data = JSON.parse(fs.readFileSync('models/playlists.json', 'utf8'));
    res.json(data)
});

app.use('/data/songs', async (req, res) => {
    const data = JSON.parse(fs.readFileSync('models/songs.json', 'utf8'));
    res.json(data)
});

app.use('/data/djs', async (req, res) => {
    const data = JSON.parse(fs.readFileSync('models/djs.json', 'utf8'));
    res.json(data)
});

app.post('/DJ/dj.html', async (req, res) => {
    let playlistData = JSON.parse(fs.readFileSync('models/playlists.json', 'utf8'));
    let songsList = req.body.songs.split(" ").filter(i => i)
    let entry = {
        name: req.body.name,
        songs: songsList,
        timeslot: req.body.time,
    }
    playlistData.push(entry)

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("connected");

    const database = client.db('PixelBeatsRadio'); 
    database.collection('Playlists').insertOne(entry, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
        
      });
    fs.writeFileSync('models/playlists.json', JSON.stringify(playlistData));
    res.redirect("/DJ/dj.html")
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});