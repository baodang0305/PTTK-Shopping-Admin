const express = require('express');
const multer = require('multer');
const path = require('path');
const ObjectId = require('mongodb').ObjectID;
const product = require('../models/product');
const router = express.Router();

const storage = multer.diskStorage({
  destination: './public/images',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({storage: storage}).single('Image');

router.get('/product-management', function(req, res, next) {
    product.find({}).exec((err, all_product)=>{
      if(err){
        console.log(err);
      }
      else{
        res.render('product-management', {title: 'Product Management', 'all_product': all_product});
      }
    });
});

router.get('/product-add', function(req, res, next){
  res.render('product-add', {title: 'Product Add'});
});

router.post('/product-add', upload, function(req, res, next){
  req.checkBody('Name', 'name').notEmpty();
  req.checkBody('Category', 'category').notEmpty();
  req.checkBody('Gender', 'gender').notEmpty();
  req.checkBody('Cost', 'cost').isNumeric();
  req.checkBody('Sale', 'sale').isNumeric(); 
  req.checkBody('Amount', 'amount').isNumeric();
  req.checkBody('Describe', 'describe').notEmpty();
  const temp = req.validationErrors();
  if(temp){
    let strErr;
    for(let i=0;i<temp.length;i++){
      strErr = strErr + ", " + temp[i].msg;
    }
    strErr = strErr + " invalid.";
    res.render('product-add', {title: 'Product Add', 'mess': strErr});
  }
  else if(req.file == null){
    res.render('product-add', {title: 'Product Add', 'mess': "image file is empty"});
  }
  else{
    const pro = new product({
      Image: req.file.filename,
      Name: req.body.Name,
      Category: req.body.Category,
      Gender: req.body.Gender,
      Cost: req.body.Cost,
      Sale: req.body.Sale,
      Amount: req.body.Amount,
      Describe: req.body.Describe,
      Product_Group: req.body.Product_Group
    });
    product.create(pro, function(err){
      if(err) return console.log(err);
      else{
        console.log('insert is success');
      }
    })
    res.redirect('/product-management');
  }
})

let object_id;
router.get('/product-edit-:id', function(req,res, next){
  var id = req.params.id;
  object_id = new ObjectId(id);
  product.findOne({_id: object_id}).exec((err, pro)=>{
    if(err) return console.log(err);
    res.render('product-edit', {title: 'Product Edit', 'product': pro});
  });
});

router.post('/product-edit', upload, function(req, res, next){
  req.checkBody('Name', 'name').notEmpty();
  req.checkBody('Category', 'category').notEmpty();
  req.checkBody('Gender', 'gender').notEmpty();
  req.checkBody('Cost', 'cost').isNumeric();
  req.checkBody('Sale', 'sale').isNumeric(); 
  req.checkBody('Amount', 'amount').isNumeric();
  req.checkBody('Describe', 'describe').notEmpty();
  const temp = req.validationErrors();
  if(temp){
    let strErr;
    for(let i=0;i<temp.length;i++){
      strErr = strErr + ", " + temp[i].msg;
    }
    strErr = strErr + " invalid.";
    res.render('product-edit', {title: 'Product Edit', 'mess': strErr});
  }
  else{
    let strImg = req.body.strName;
    if(req.file != null){
      strImg = req.file.filename;
    }
    var product_edit = {
      Image: strImg,
      Name: req.body.Name,
      Category: req.body.Category,
      Gender: req.body.Gender,
      Cost: req.body.Cost,
      Discount: req.body.Discount,
      Amount: req.body.Amount,
      Describe: req.body.Describe,
      Product_Group: req.body.Product_Group
    };
    product.updateOne({"_id": object_id},{$set: product_edit}, function(err, res){
      if(err){
        console.log(err);
      }
      else{
        console.log("product is Updated ");
      }
    });
    res.redirect('/product-management');
  }
});

router.post('/product-delete-:id', function(req, res, next){
  let id = req.params.id;
  object_id = new ObjectId(id);
  product.deleteOne({"_id": object_id}, function(err, res){
    if(err){
      console.log(err);
    }
    else{
      console.log("product is deleted");
    }
  });
  res.redirect('/product-management');
})

module.exports = router;
