const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const multer = require('multer');
const path = require('path');
const Product = require('../models/product');
const ObjectId = require('mongodb').ObjectID;
const router = express.Router();

const uri = "mongodb+srv://BaoDang:baodang@cluster0-ek6kq.mongodb.net/test?retryWrites=true&w=majority";

const storage = multer.diskStorage({
  destination: './public/images',
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({storage: storage}).single('Image');

router.get('/product-management', function(req, res, next) {
  MongoClient.connect(uri, {useNewUrlParser: true}, function(err, dbRef){
    if(err) return console.log(err);
    else{
      const productCollection = dbRef.db('pttkshoppingdb').collection('Product');
      let Async_Await = async()=>{
        let all_product = await productCollection.find({}).toArray();
        res.render('product-management', {title: 'Product Management', 'all_product': all_product});
      }
      Async_Await();
    }
  })
});

router.get('/product-add', function(req, res, next){
  res.render('product-add', {title: 'Product Add'});
});

router.post('/product-add', upload, function(req, res, next){
  req.checkBody('Name', 'name').notEmpty();
  req.checkBody('Category', 'category').notEmpty();
  req.checkBody('Gender', 'gender').notEmpty();
  req.checkBody('Cost', 'cost').notEmpty();
  req.checkBody('Sale', 'sale').notEmpty(); 
  req.checkBody('Amount', 'amount').notEmpty();
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
  else{
    MongoClient.connect(uri, {useNewUrlParser: true}, function(err, dbRef){
      if(err) return console.log(err);
      else{
        const product = new Product({
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
        const productCollection = dbRef.db('pttkshoppingdb').collection('Product');
        productCollection.insertOne(product, function(err, pro){
          dbRef.close();
          if(err) return console.log(err);
          else{
            console.log('insert is success');
          }
        })
        res.redirect('/product-management');
      }
    })
  }
})

let object_id;
router.get('/product-edit-:id', function(req,res, next){
  var id = req.params.id;
  object_id = new ObjectId(id);
  MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, dbRef) {
    if(err){
      console.log(err);
    }
    else{
      const collectionProduct = dbRef.db("pttkshoppingdb").collection("Product");
      let Async_Await = async()=>{
        let product = await collectionProduct.findOne({_id: object_id});
        dbRef.close();
        res.render('product-edit', {title: 'Product Edit', 'product': product});
      }
      Async_Await();
    }
  });
});

router.post('/product-edit', upload, function(req, res, next){
  const img = req.body.Image;
  req.checkBody('Name', 'name').notEmpty();
  req.checkBody('Category', 'category').notEmpty();
  req.checkBody('Gender', 'gender').notEmpty();
  req.checkBody('Cost', 'cost').notEmpty();
  req.checkBody('Sale', 'sale').notEmpty(); 
  req.checkBody('Amount', 'amount').notEmpty();
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
    MongoClient.connect(uri,{ useNewUrlParser: true }, function(err, dbRef) {
      if(err){
        console.log(err);
      }
      else{
        const collectionProduct = dbRef.db("pttkshoppingdb").collection("Product");
        var product_edit = {
          Image: img,
          Name: req.body.Name,
          Category: req.body.Category,
          Gender: req.body.Gender,
          Cost: req.body.Cost,
          Discount: req.body.Discount,
          Amount: req.body.Amount,
          Describe: req.body.Describe,
          Product_Group: req.body.Product_Group
        };
        collectionProduct.updateOne({"_id": object_id},{$set: product_edit}, function(err, res){
          if(err){
            console.log(err);
          }
          else{
            dbRef.close();
            console.log("product is Updated ");
          }
        });
        res.redirect('/product-management');
      }
    });
  }
});

module.exports = router;
