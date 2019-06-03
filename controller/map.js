var express = require('express');
var router = express.Router();

router.get('/map', function (req, res, next) {
    res.render('map', { title: 'Maps' });
});

module.exports = router;
