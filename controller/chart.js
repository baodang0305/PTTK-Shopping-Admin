var express = require('express');
var router = express.Router();


router.get('/chart', function (req, res, next) {
    res.render('chart', { title: 'Chart' });
});

module.exports = router;
