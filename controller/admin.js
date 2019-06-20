const adminModel = require('../models/admin');
const bcrypt = require('bcrypt');

exports.load_login_page = function(req, res) {
    let loginMessages = req.flash('loginMessages');
    res.render('login', {title: 'Login', layout: "", 'err': loginMessages.length > 0, 'loginMessages': loginMessages});
  }
  
  exports.logout = function(req, res){
      req.logout();
      res.redirect('/');
  }
  
  exports.load_register_page = function(req, res) {
    res.render('register', { title: 'Register', layout: ""});
  }

exports.register = async(req, res, next)=>{
    req.checkBody('Username', 'username').notEmpty();
    req.checkBody('Name', "name").notEmpty();
    req.checkBody('Password', 'password').isLength({min: 5, max: 20});
    req.checkBody('ConfirmPassword', 'confirm password').isLength({min: 5, max: 20});
    req.checkBody('Email', 'email').isEmail();
    const errors = req.validationErrors();
    if(errors){
        let strErr="";
        for(let i=0;i<errors.length-1; i++){
            strErr = strErr + errors[i].msg + ", ";
        }
        strErr = strErr + errors[errors.length-1].msg + " invalid!";
        res.render('register', {title: 'Register', 'registerMessages': strErr, layout: ""});
    }
    else{
        await adminModel.findOne({Username: req.body.Username}).exec((err, cus)=>{
            if(err)  return console.log(err);
            else if(cus){
                res.render('register', {title: 'Register', layout: "", 'registerMessages': "Username is already exist"});
            }
            else{
                if(req.body.Password == req.body.ConfirmPassword){
                    req.body.Password = bcrypt.hashSync(req.body.Password, 10);
                    const newCus = new adminModel(req.body);
                    adminModel.create(newCus, function(err, res){
                        if(err) return console.log(err);
                        console.log("insert is success");
                    });
                    req.login(newCus, function(err){
                        if(err){
                            return next(err);
                        }
                        return res.redirect('/');
                    })
                }
                else{
                    res.render('register', {title: 'Register', 'registerMessages': "Password and ConfirmPassword is not equal", layout: ""});
                }
            }
        });
        
    }
}