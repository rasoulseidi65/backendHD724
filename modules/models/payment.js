const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');


const PaymentSchema = new Schema({
    customer_id: {type:mongoose.Schema.ObjectId, required: true,ref:'Wallet' },//کد مشتری
    resNumber:{ type: String, required: true },//شناسه پرداخت
    price:{ type: Number, required: true },//پول شارژ
    statusPayment:{type: String, default: 'ناموفق'},//وضعیت تراکنش
    date: { type: String, required: true },//تاریخ
    time: { type: String, required: true }//ساعت
});

module.exports = mongoose.model(' Payment', PaymentSchema);
