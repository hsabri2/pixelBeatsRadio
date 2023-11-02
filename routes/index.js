const express = require('express');
const router = express.Router();
const ejs = require('ejs');
const path = require('path');

router.get('/', (req, res) => {
    const data = {
        title: "Home Page",
        djs: ["DJ 1", "DJ 2", "DJ 3"]
    };
    
    ejs.renderFile(path.join(__dirname, '../views/index.ejs'), data, (err, str) => {
        if (err) throw err;
        res.render('routing', {
            title: data.title,
            body: str
        });
    });
});

module.exports = router;