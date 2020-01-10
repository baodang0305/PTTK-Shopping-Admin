const express = require('express');
const multer = require('multer');
const path = require('path');
const productManagement = require('../controller/product-management');
const router = express.Router();

const storage = multer.diskStorage({
    destination: './public/images',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
  
const upload = multer({storage: storage}).single('Image');

router.get('/create', productManagement.createProduct);

router.get('/management', productManagement.load_product_management_page);

router.get('/product-add', productManagement.load_product_add_page);

router.post('/product-add', upload, productManagement.product_add);

router.get('/product-detail=:id', productManagement.load_product_detail_page);

router.post('/product-edit', upload, productManagement.product_edit);

router.post('/product-delete=:id', productManagement.product_delete);

module.exports = router;
