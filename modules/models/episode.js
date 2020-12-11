const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const episodeSchema = Schema({
    courseID : { type : Schema.Types.ObjectId , ref : 'Course'},
    title : { type : String , required : true },
    type : { type : String , required : true },//آزاد-ویژه-رایگان
    body : { type : String },
    time : { type : String , default : '00:00:00' },//مدت زمان قسمت
    number : { type : Number , required : true },//شماره جلسه
    videoUrl : { type : String , required : true },
    downloadCount : { type : Number , default : 0 },
    viewCount : { type : Number , default : 0 },
    commentCount : { type : Number , default : 0 },
} , { timestamps : true });

episodeSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Episode' , episodeSchema);
