const categoryModel = require('../models/category');
const ObjectId = require('mongodb').ObjectId;

exports.load_category_management_page = async(req, res)=>{
    let all_category = await categoryModel.find();
    res.render('category-management', {title: 'Category Management', 'user': req.user, 'all_category': all_category});
}

exports.load_category_add_page = function(req, res){
    if(req.isAuthenticated()){
        res.render('category-add', {title: "Category Add", 'user': req.user});
    }
    else{
        res.redirect('/admin/login');
    }

}

exports.category_add = async(req, res)=>{
    if(req.isAuthenticated()){
        req.checkBody('Name', 'name').notEmpty();
        req.checkBody('Id', 'Id').notEmpty();
        const errors = req.validationErrors();
        if(errors){
            let strError="";
            for(let i=0;i<errors.length-1;i++){
            strError = strError + errors[i].msg + ", ";
            }
            strError = strError + errors[errors.length - 1].msg + " invalid.";
            res.render('category-add', {title: 'Category Add', 'user': req.user, 'strError': strError});
        }
        else{
            const category = new categoryModel({
                Name: req.body.Name,
                Id: req.body.Id,
                
            });
            await categoryModel.create(category, function(err){
                if(err) {
                    console.log(err);
                    return;
                }
                else{
                    console.log("category is created");
                    res.redirect('/category/management');
                }
            })
        }
    }
    else{
        res.redirect('/admin/login');
    }
}
let object_id;
exports.load_category_detail = async(req, res)=>{
    if(req.isAuthenticated()){
        let id = req.params.id;
        object_id = new ObjectId(id);
        let category = await categoryModel.findOne({_id: object_id});
        if(!category){
            console.log("Don't find category");
        }
        else{
            res.render('category-edit', {title: 'Category Detail', 'user': req.user, 'category': category});
        }
    }
    else{
        res.redirect('/admin/login');
    }
}

exports.category_edit = async(req, res)=>{
    if(req.isAuthenticated()){
        req.checkBody('Name', 'name').notEmpty();
        req.checkBody('Id', 'id').notEmpty();
        const errors = req.validationErrors();
        if(errors){
            let strError="";
            for(let i=0;i<errors.length-1;i++){
            strError = strError + errors[i].msg + ", ";
            }
            strError = strError + errors[errors.length - 1].msg + " invalid.";
            res.render('category-edit', {title: 'Category Edit', 'user': req.user, 'strError': strError});
        }
        else{
            const category = {
                Name: req.body.Name,
                Id: req.body.Id
            }
            await categoryModel.updateOne({_id: object_id},{$set: category}, function(err){
                if(err) {
                    console.log(err);
                    return;
                }
            })
            res.redirect('/category/management');
        }
    }
    else{
        res.redirect('/admin/login');
    }
}

exports.category_delete = async(req, res)=>{
    if(req.isAuthenticated()){
        let id = req.params.id;
        let objectid = new ObjectId(id);
        categoryModel.deleteOne({_id: objectid}, function(err){
            if(err) {
                console.log(err);
                return;
            }
        });
        res.redirect('/category/management');
    }
    else{
        res.redirect('/admin/login');
    }
}