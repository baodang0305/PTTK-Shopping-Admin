const ObjectId = require('mongodb').ObjectID;
const productModel = require('../models/product');

exports.load_product_management_page = async(req, res) => {
  let all_product =  await productModel.find();
  res.render('product-management', {title: 'Product Management', 'user': req.user, 'all_product': all_product});
}

exports.load_product_add_page = function(req, res){
  if(req.isAuthenticated()){
    res.render('product-add', {title: 'Product Add', 'user': req.user});
  }
  else{
    res.redirect('/admin/login');
  }
}

exports.product_add = async(req, res)=>{
  if(req.isAuthenticated()){
    req.checkBody('Name', 'name').notEmpty();
    req.checkBody('Category', 'category').notEmpty();
    req.checkBody('Gender', 'gender').notEmpty();
    req.checkBody('Cost', 'cost').isNumeric();
    req.checkBody('Sale', 'sale').isNumeric(); 
    req.checkBody('Amount', 'amount').isNumeric();
    req.checkBody('Describe', 'describe').notEmpty();
    const errors = req.validationErrors();
    if(errors){
      let strError="";
      for(let i=0;i<errors.length-1;i++){
        strError = strError + errors[i].msg + ", ";
      }
      strError = strError + errors[errors.length - 1].msg + " invalid.";
      res.render('product-add', {title: 'Product Add', 'user': req.user, 'strError': strError});
    }
    else if(req.file == null){
      res.render('product-add', {title: 'Product Add', 'user': req.user, 'strError': "image file is empty"});
    }
    else{
      const pro = new productModel({
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
      await productModel.create(pro, function(err){
        if(err) return console.log(err);
        else{
          console.log('insert is success');
        }
      })
      res.redirect('/product/management');
    }
  }
  else{
    res.redirect('/admin/login');
  }
}

exports.load_product_detail_page = async(req,res)=>{
  if(req.isAuthenticated()){
    var id = req.params.id;
    object_id = new ObjectId(id);
    let product = await productModel.findOne({_id: object_id});
    res.render('product-edit', {title: 'Product Edit', 'user': req.user, 'product': product});
  }
  else{
    res.redirect('/admin/login');
  }
}

exports.product_edit = async(req, res)=>{
  if(req.isAuthenticated()){
    req.checkBody('Name', 'name').notEmpty();
    req.checkBody('Category', 'category').notEmpty();
    req.checkBody('Gender', 'gender').notEmpty();
    req.checkBody('Cost', 'cost').isNumeric();
    req.checkBody('Sale', 'sale').isNumeric(); 
    req.checkBody('Amount', 'amount').isNumeric();
    req.checkBody('Describe', 'describe').notEmpty();
    const errors = req.validationErrors();
    if(errors){
      let strError="";
      for(let i=0;i<errors.length-1;i++){
        strError = strError + errors[i].msg + ", ";
      }
      strError = strError + errors[errors.length - 1].msg + " invalid.";
      res.render('product-edit', {title: 'Product Edit', 'user': req.user, 'strError': strError});
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
        Sale: req.body.Sale,
        Amount: req.body.Amount,
        Describe: req.body.Describe,
        Product_Group: req.body.Product_Group
      };
      await productModel.updateOne({"_id": object_id},{$set: product_edit}, function(err, res){
        if(err){
          console.log(err);
        }
        else{
          console.log("product is Updated ");
        }
      });
      res.redirect('/product/management');
    }
  }
  else{
    res.redirect('/admin/login');
  }
}

exports.product_delete = async(req, res)=>{
  if(req.isAuthenticated()){
    let id = req.params.id;
    object_id = new ObjectId(id);
    await productModel.deleteOne({"_id": object_id}, function(err, res){
      if(err){
        console.log(err);
      }
      else{
        console.log("product is deleted");
      }
    });
    res.redirect('/product/management');
  }
  else{
    res.redirect('/admin/login');
  }
}

