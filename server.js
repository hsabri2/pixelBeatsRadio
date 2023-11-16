const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const uri = "mongodb+srv://odessouk:pvdiD7VjHmU9ihPW@cluster0.pm2pmsq.mongodb.net/?retryWrites=true&w=majority";
const path = require('path');
const app = express();
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
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);


// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Setup routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});