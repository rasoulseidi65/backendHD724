const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SliderSchema = new Schema({
    title: { type: String, required: true },
    caption: { type: String, required: true },
    imageurl: { type: String, required: true }
})
module.exports = mongoose.model('Slider', SliderSchema);