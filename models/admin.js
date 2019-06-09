const mongoose = require('mongoose');
const Schame = mongoose.Schema;

const adminSchame = new Schame({
    Username: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model('Admin', adminSchame);
module.exports = Admin;

