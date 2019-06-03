var express = require('express');
var router = express.Router();

router.get('/calendar', function (req, res, next) {
    res.render('calendar', { title: 'Calendar' });
});

router.get('/sign-in', function (req, res, next) {
    res.render('sign-in', { title: 'Tables' });
});

router.get('/sign-up', function (req, res, next) {
    res.render('sign-up', { title: 'Tables' });
});

module.exports = router;
