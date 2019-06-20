const express = require('express');
const manufacturerController = require('../controller/manufacturer-management');
const router = express.Router();

router.get('/management', manufacturerController.load_manufacturer_management_page);
router.get('/manufacturer-add', manufacturerController.load_manufacturer_add_page)
router.post('/manufacturer-add', manufacturerController.manufacturer_add);
router.get ('/manufacturer-detail=:id', manufacturerController.load_manufacturer_detail);
router.post('/manufacturer-edit', manufacturerController.manufacturer_edit);
router.post('/manufacturer-delete=:id', manufacturerController.manufacturer_delete);
module.exports = router;