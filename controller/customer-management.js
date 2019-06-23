const ObjectId = require('mongodb').ObjectId;
const customerModel = require('../models/customer');

exports.load_customer_management_page = async(req, res)=>{
  let all_customer = await customerModel.find({});
  res.render('customer-management', { title: 'Customer Management', 'user': req.user, 'all_customer': all_customer});
}

exports.customer_delete = async(req, res)=>{
  if(req.isAuthenticated()){
    let id = req.params.id;
    object_id = new ObjectId(id);
    await customerModel.deleteOne({"_id": object_id}, function(err, res){
      if(err){
        console.log(err);
      }
      else{
        console.log("customer is deleted");
      }
    });
    res.redirect('/customer/management');
  }
  else{
    res.redirect('/admin/login');
  }
}

