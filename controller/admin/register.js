var express = require('express');
var router = express.Router();
const admin = require('../../models/admin');
const bcrypt = require('bcrypt');

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register', layout: ""});
});

router.post('/register', function(req, res, next){
    req.checkBody('Username', 'username').notEmpty();
    req.checkBody('Name', "name").notEmpty();
    req.checkBody('Password', 'password').isLength({min: 5, max: 20});
    req.checkBody('ConfirmPassword', 'confirm password').isLength({min: 5, max: 20});
    req.checkBody('Email', 'email').isEmail();
    const errors = req.validationErrors();
    if(errors){
        let strErr;
        for(let i=0;i<errors.length; i++){
            if(errors[i].msg != undefined){
                strErr = strErr + ", " + errors[i].msg;
            }
        }
        strErr = strErr + " invalid!";
        res.render('register', {title: 'Register', 'mess': strErr, layout: ""});
    }
    else{
        admin.findOne({Username: req.body.Username}).exec((err, cus)=>{
            if(err)  return console.log(err);
            else if(cus){
                res.render('register', {title: 'Register', layout: "", 'mess': "Username is already exist"});
            }
            else{
                if(req.body.Password == req.body.ConfirmPassword){
                    req.body.Password = bcrypt.hashSync(req.body.Password, 10);
                    const newCus = new admin(req.body);
                    console.log(newCus);
                    admin.create(newCus, function(err, res){
                        if(err) return console.log(err);
                        console.log("insert is success");
                    });
                    req.login(newCus, function(err){
                        if(err){
                            return next(err);
                        }
                        return res.render('index' , {title: "Home", 'mess': req.user.Username}); 
                    })
                }
                else{
                    res.render('register', {title: 'Register', 'mess': "Password and ConfirmPassword is not equal", layout: ""});
                }
            }
        });
        
    }
});

module.exports = router;