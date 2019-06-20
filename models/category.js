const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    Name: String,
    Id: String
}, {collection: 'Category'});

const category = mongoose.model('category', categorySchema);
module.exports = category;