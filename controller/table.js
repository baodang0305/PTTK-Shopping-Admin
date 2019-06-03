var express = require('express');
var router = express.Router();

router.get('/table', function (req, res, next) {
    res.render('table', { title: 'Tables' });
});

router.get('/product-type', function (req, res, next) {
    res.render('product-type', { title: 'Product Type' });
});

router.get('/producer', function (req, res, next) {
    res.render('producer', { title: 'Producer' });
});

router.get('/order-list', function (req, res, next) {
    res.render('order-list', { title: 'Order' });
});

router.get('/customer', function (req, res, next) {
    res.render('customer', { title: 'Customer' });
});
module.exports = router;
