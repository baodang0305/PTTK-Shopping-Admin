const manufacturerModel = require('../models/manufacturer');
const ObjectId = require('mongodb').ObjectId;

exports.load_manufacturer_management_page = async(req, res)=>{
    let all_manufacturer = await manufacturerModel.find();
    res.render('manufacturer-management', {title: 'Manufacturer Management', 'user': req.user, 'all_manufacturer': all_manufacturer});
}

exports.load_manufacturer_add_page = function(req, res){
    res.render('manufacturer-add', {title: "Manufacturer Add", 'user': req.user});
}

exports.manufacturer_add = async(req, res)=>{
    req.checkBody('Name', 'name').notEmpty();
    req.checkBody('Address', 'Address').notEmpty();
    req.checkBody('Email', 'email').notEmpty();
    req.checkBody('Phonenumber', 'phone number').isNumeric().isLength({min: 9,max: 10});
    const errors = req.validationErrors();
    if(errors){
        let strError="";
        for(let i=0;i<errors.length-1;i++){
        strError = strError + errors[i].msg + ", ";
        }
        strError = strError + errors[errors.length - 1].msg + " invalid.";
        res.render('manufacturer-add', {title: 'Manufacturer Add', 'user': req.user, 'strError': strError});
    }
    else{
        const manufacturer = new manufacturerModel({
            Name: req.body.Name,
            Address: req.body.Address,
            Email: req.body.Email,
            Phonenumber: req.body.Phonenumber
        });
        await manufacturerModel.create(manufacturer, function(err){
            if(err) {
                console.log(err);
                return;
            }
            else{
                console.log("manufacturer is created");
                res.redirect('/manufacturer/management');
            }
        })
    }
}
let object_id;
exports.load_manufacturer_detail = async(req, res)=>{
    let id = req.params.id;
    object_id = new ObjectId(id);
    let manufacturer = await manufacturerModel.findOne({_id: object_id});
    if(!manufacturer){
        console.log("Don't find manufacturer");
    }
    else{
        res.render('manufacturer-edit', {title: 'Manufacturer Detail', 'user': req.user, 'manufacturer': manufacturer});
    }
}

exports.manufacturer_edit = async(req, res)=>{
    req.checkBody('Name', 'name').notEmpty();
    req.checkBody('Address', 'Address').notEmpty();
    req.checkBody('Email', 'email').notEmpty();
    req.checkBody('Phonenumber', 'phone number').isNumeric().isLength({min: 9,max: 10});
    const errors = req.validationErrors();
    if(errors){
        let strError="";
        for(let i=0;i<errors.length-1;i++){
        strError = strError + errors[i].msg + ", ";
        }
        strError = strError + errors[errors.length - 1].msg + " invalid.";
        res.render('manufacturer-edit', {title: 'Manufacturer Edit', 'user': req.user, 'strError': strError});
    }
    else{
        const manufacturer = {
            Name: req.body.Name,
            Address: req.body.Address,
            Email: req.body.Email,
            Phonenumber: req.body.Phonenumber
        }
        await manufacturerModel.updateOne({_id: object_id},{$set: manufacturer}, function(err){
            if(err) {
                console.log(err);
                return;
            }
        })
        res.redirect('/manufacturer/management');
    }
}

exports.manufacturer_delete = async(req, res)=>{
    let id = req.params.id;
    let objectid = new ObjectId(id);
    await manufacturerModel.deleteOne({_id: objectid}, function(err){
        if(err) {
            console.log(err);
            return;
        }
    });
    res.redirect('/manufacturer/management');
}