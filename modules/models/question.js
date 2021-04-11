const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
    categoryQuestionID:{type:mongoose.Schema.ObjectId,ref:'CategoryQuestions'},
    title: { type: String, required: true },
    price: { type: String, required: true },
    linkFile: { type: String, required: true },
    count: { type: String, required: true },
    answer:{ type: String, default:'ندارد' },
    typeQuestion:{ type: String },
    section:{ type: String },
    text:{ type: String,},

},{toJSON:{virtuals:true}});
QuestionSchema.virtual('CategoryQuestions',{
    ref:'CategoryQuestions',
    localField:'categoryQuestionID',
    foreignField:'id',
});
module.exports = mongoose.model('Question', QuestionSchema);
