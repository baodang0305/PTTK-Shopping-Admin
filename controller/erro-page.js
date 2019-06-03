var express = require('express');
var router = express.Router();

router.get('/erro-page', function (req, res, next) {
    res.render('erro-page', { title: 'Erro pages' });
});

module.exports = router;
