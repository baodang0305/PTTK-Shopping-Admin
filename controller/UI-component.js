var express = require('express');
var router = express.Router();


router.get('/button', function (req, res, next) {
    res.render('button', { title: 'Buttons' });
});

router.get('/grid', function (req, res, next) {
    res.render('grid', { title: 'Grids' });
});

module.exports = router;
