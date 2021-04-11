const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategoryQuestionsSchema = new Schema({
    title: { type: String, required: true },
    image:{ type: String, required: true },

})
module.exports = mongoose.model('CategoryQuestions', CategoryQuestionsSchema);
