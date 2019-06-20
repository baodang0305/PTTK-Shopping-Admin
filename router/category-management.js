const express = require('express');
const categoryController = require('../controller/category');
const router = express.Router();

router.get('/management', categoryController.load_category_management_page);
router.get('/category-add', categoryController.load_category_add_page)
router.post('/category-add', categoryController.category_add);
router.get ('/category-detail=:id', categoryController.load_category_detail);
router.post('/category-edit', categoryController.category_edit);
router.post('/category-delete=:id', categoryController.category_delete);

module.exports = router;