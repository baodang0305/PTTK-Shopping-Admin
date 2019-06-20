const express = require('express');
const chartController = require('../controller/chart');
const router = express.Router();

router.get('/chart', chartController.load_chart_page);

module.exports = router;