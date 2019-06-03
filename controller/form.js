var express = require('express');
var router = express.Router();


router.get('/validation', function (req, res, next) {
    res.render('validation', { title: 'Validation' });
});

router.get('/input', function (req, res, next) {
    res.render('input', { title: 'Input' });
});

module.exports = router;
