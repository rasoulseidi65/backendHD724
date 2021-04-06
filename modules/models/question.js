const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    linkFile: { type: String, required: true },
    count: { type: String, required: true },
    answer:{ type: String, default:'ندارد' },
    typeQuestion:{ type: String },
    text:{ type: String,},

})
module.exports = mongoose.model('Question', QuestionSchema);
