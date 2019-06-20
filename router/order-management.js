const express = require('express');
const orderController = require('../controller/order-management');
const router = express.Router();

router.get('/management', orderController.load_order_management_page);
router.get ('/order-detail=:id', orderController.load_order_detail);
router.post('/order-edit', orderController.order_edit);
router.post('/order-delete=:id', orderController.order_delete);
module.exports = router;