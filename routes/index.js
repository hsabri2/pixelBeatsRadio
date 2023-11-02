const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'DJ Schedule' });
});

module.exports = router;