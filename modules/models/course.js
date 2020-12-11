const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const CourseSchema = new Schema({
    userID:{type:Schema.Types.ObjectId},
    title: { type: String, required: true },
    categories:{type: String, required: true},
    type: { type: String, required: true },//free/vip/cash
    detail: { type: String, required: true },
    abstract: { type: String, required: true },
    price: { type: String, required: true },
    priceSupport: { type: String, required: true },
    image: { type: String, },
    level:{type: String,},
    titleTag:{type: String,},
    keyTag:{type: String,},
    timeCourse:{type: String,default:'00:00:00'},//زمان دوره
    sizeCourse:{type: String},
    viewCount:{type: String,default:0},//بازدید
    commentCount:{type: String,default:0},
    status:{type: Boolean,default:false},
    date:{type: String,default:'00:00:00'},
    time:{type: String,default:'00:00:00'},
},{toJSON:{virtuals:true}});
CourseSchema.virtual('Episode',{
    ref:'Episode',
    localField:'_id',
    foreignField:'courseID',

});
CourseSchema.virtual('user',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',
});
CourseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Course', CourseSchema);
