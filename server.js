const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

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