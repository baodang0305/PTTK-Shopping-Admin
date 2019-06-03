var express = require('express');
var router = express.Router();

router.get('/icon', function (req, res, next) {
    res.render('icon', { title: 'Icons' });
});

router.get('/typography', function (req, res, next) {
    res.render('typography', { title: 'Typography' });
});

router.get('/faq', function (req, res, next) {
    res.render('faq', { title: 'Faq' });
});

module.exports = router;
