const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MajorSchema = new Schema({
    gradeID:{  type:mongoose.Schema.ObjectId , ref : 'Grade'},
    title: { type: String, required: true },
    image:{ type: String, required: true },


},{toJSON:{virtuals:true}});
MajorSchema.virtual('Grade',{
    ref:'Grade',
    localField:'gradeID',
    foreignField:'_id',
});
module.exports = mongoose.model('Major', MajorSchema);
