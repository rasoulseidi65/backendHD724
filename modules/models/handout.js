const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  HandOutSchema = new Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    linkFile: { type: String, required: true },
    countPage: { type: String, required: true },
    author:{ type: String, },
    section:{ type: String },
    text:{ type: String,},

})
module.exports = mongoose.model('Handout', HandOutSchema);
