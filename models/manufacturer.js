const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const manufacturerSchema = new Schema({
    Name: String,
    Address: String,
    Email: String,
    Phonenumber: String
}, {collection: 'Manufacturer'});

const manufacturer = mongoose.model('manufacturer', manufacturerSchema);
module.exports = manufacturer;