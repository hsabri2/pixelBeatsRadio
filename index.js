const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to handle the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'producer.html'));
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});