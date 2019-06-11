const express = require('express');
const customer = require('../models/customer');
const router = express.Router();
router.get('/customer-management', function(req, res, next) {
    customer.find({}).exec((err, all_customer)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log(all_customer);
        res.render('customer-management', { title: 'Customer Management', 'all_customer': all_customer});
      }
    });
});

router.post('/customer-delete-:id', function(req, res, next){
  let id = req.params.id;
  object_id = new ObjectId(id);
  customer.deleteOne({"_id": object_id}, function(err, res){
    if(err){
      console.log(err);
    }
    else{
      console.log("customer is deleted");
    }
  });
  res.redirect('/customer-management');
})


module.exports = router;
