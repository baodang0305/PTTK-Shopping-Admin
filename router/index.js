const express = require('express');
const indexController = require('../controller/index');
const router = express.Router();

router.get('/', indexController.load_home_page);

module.exports = router;
