const express = require('express');
const passport = require('passport');
const adminController = require('../controller/admin');
const router = express.Router();

router.get('/login', adminController.load_login_page);

router.post('/login', passport.authenticate('local-login', {
    failureRedirect: '/admin/login', 
    successRedirect: '/',
    failureFlash: true
}));

router.get('/logout', adminController.logout);

router.get('/register', adminController.load_register_page);

router.post('/register', adminController.register);

module.exports = router;