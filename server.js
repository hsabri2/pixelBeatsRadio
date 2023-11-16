const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser')
const port = 3000;
require('dotenv').config();

const uri = process.env.MONGO_URI;
const key = process.env.MONGO_PASSWORD

app.use(cors());

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
        //console.log(collection)
        // Read data from songs.json file
        const songsData = JSON.parse(fs.readFileSync('models/songs.json', 'utf8'));
        const djData = JSON.parse(fs.readFileSync('models/djs.json', 'utf8'));
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        console.log('Connection closed');
    }
}
run().catch(console.dir);

app.use(session({
    secret: key,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, // Set to true if using HTTPS
        maxAge: 30 * 60 * 1000 // e.g., 30 minutes for session timeout
    }
}));

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

app.get('/data/playlists', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('PixelBeatsRadio');
        const playlistsCollection = database.collection('Playlists');
        const playlists = await playlistsCollection.find({}).toArray();
        res.json(playlists);
    } catch (err) {
        console.error("Error fetching playlists:", err);
        res.status(500).send('Error fetching playlists');
    }
});

app.get('/data/songs/:id', async (req, res) => {
    try {
        await client.connect();
        const songId = req.params.id;
        const database = client.db('PixelBeatsRadio');
        const songsCollection = database.collection('Songs');

        // Assuming '_id' is used as the identifier in your Songs collection
        const song = await songsCollection.findOne({ _id: songId });

        if (song) {
            res.json(song);
        } else {
            res.status(404).send('Song not found');
        }
    } catch (err) {
        console.error("Error fetching song:", err);
        res.status(500).send('Error fetching song');
    }
});

app.get('/data/djs', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('PixelBeatsRadio');
        const djCollection = database.collection('DJs');
        const djs = await djCollection.find({}).toArray();
        res.json(djs);
    } catch (err) {
        console.error("Error fetching DJs:", err);
        res.status(500).send('Error fetching DJs');
    }
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

// Route to add a DJ
app.post('/add-dj', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('PixelBeatsRadio');
        const djCollection = database.collection('DJs');
        // Generate random gender and age if not provided
        const randomGender = ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)];
        const randomAge = Math.floor(Math.random() * (60 - 18 + 1)) + 18; // Random age between 18 and 60

        // Add the DJ to the database
        const djData = {
            name: req.body.name,
            gender: req.body.gender || randomGender,
            age: req.body.age || randomAge
        };

        await djCollection.insertOne(djData);

        // Respond with updated DJ list
        const updatedDJs = await djCollection.find({}).toArray();
        res.json(updatedDJs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding DJ');
    } finally {
        await client.close();
    }
});

app.delete('/delete-dj', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('PixelBeatsRadio');
        const djCollection = database.collection('DJs');
        
        // Delete the DJ with the given name
        await djCollection.deleteOne({ name: req.body.name });

        // Respond with the updated DJ list
        const updatedDJs = await djCollection.find({}).toArray();
        res.json(updatedDJs);
    } catch (err) {
        console.error("Error deleting DJ:", err);
        res.status(500).send('Error deleting DJ');
    }
});

app.post('/clear-session', function(req, res) {
    req.session.destroy(err => {
        if (err) {
            console.log("Session couldn't be destroyed.");
            res.status(500).send('Error');
        } else {
            res.send('Session cleared');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});