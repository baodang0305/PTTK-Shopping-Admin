const express = require('express');
const customerController =require('../controller/customer-management');
const router = express.Router();

router.get('/management', customerController.load_customer_management_page);

router.post('/customer-delete=:id', customerController.customer_delete);

module.exports = router;
