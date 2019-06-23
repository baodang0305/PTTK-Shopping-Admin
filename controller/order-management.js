const orderModel = require('../models/order');
const ObjectId = require('mongodb').ObjectId;

exports.load_order_management_page = async(req, res)=>{
    let all_order = await orderModel.find();
    res.render('order-management', {title: 'Order Management', 'user': req.user, 'all_order': all_order});
}

let object_id;
exports.load_order_detail = async(req, res)=>{
    if(req.isAuthenticated()){
        let id = req.params.id;
        object_id = new ObjectId(id);
        let order = await orderModel.findOne({_id: object_id});
        if(!order){
            console.log("Don't find order");
        }
        else{
            res.render('order-edit', {title: 'Order Detail', 'user': req.user, 'order': order});
        }
    }
    else{
        res.redirect('/admin/login');
    }
}

exports.order_edit = async(req, res)=>{
    if(req.isAuthenticated()){
        let order = await orderModel.findOne({_id: object_id});
        if(!order){
            console.log("Don't find order");
        }
        else{
            await orderModel.updateOne({_id: object_id}, {$set: {DeliveryStatus: req.body.DeliveryStatus}});
            res.redirect('/order/management');
        }
    }
    else{
        res.redirect('/admin/login');
    }
}

exports.order_delete = async(req, res)=>{
    if(req.isAuthenticated()){
        let id = req.params.id;
        let objectid = new ObjectId(id);
        await orderModel.deleteOne({_id: objectid}, function(err){
            if(err) {
                console.log(err);
                return;
            }
        });
        res.redirect('/order/management');
    }
    else{
        res.redirect('/admin/login');
    }
}