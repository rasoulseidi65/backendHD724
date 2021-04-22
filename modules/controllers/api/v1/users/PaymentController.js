const Controller = require(`${config.path.controller}/Controller`);
const request = require('request-promise');

module.exports = new class PaymentController extends Controller {
    payment(req, res) {

        let params = {
            MerchantID: 'c3d32f57-fd02-417d-9bfd-adf62d6a5302',
            Amount: 20000,
            CallbackURL: 'http://api.hd724.com/api/v1/users/payment/checker',
            Description: 'پرداخت هزینه خرید نمونه سوال',
        };
        let options = {
            method: 'POST',
            uri: 'https://www.zarinpal.com/pg/rest/WebGate/PaymentRequest.json',
            headers: {
                'cache-control': 'no-cache',
                'content-type': 'application/json'
            },
            body: params,
            json: true,
        };
        request(options)
            .then(data => {
                if (data.Status === 100) {
                    this.model.Payment({
                        userID: '676776',
                        resNumber: data.Authority,
                        price: '2000',
                        statePayment: 'ناموفق',
                        date: '666',
                        time: '777',
                        mobile: '09166996165'
                    }).save(err => {
                        if (err) {
                            throw err;
                        }
                        else {
                            let countProduct = req.body.product;
                            for (var i = 0; i < countProduct.length; i++) {
                                let x = countProduct[i]['product']

                                this.model.Basket({
                                    userID: req.body.user.userID,
                                    productID: x['cartList']._id,
                                    refID: data.Authority,
                                    price: x['cartList'].price,
                                    date: req.body.user.date,
                                    time: req.body.user.time,

                                }).save(err => {
                                    if (err) {
                                        throw err;
                                    }
                                });
                            }



                        }

                    });

                    return res.json({
                        data: `https://www.zarinpal.com/pg/StartPay/${data.Authority}`,
                        sucess: true
                    })
                    // return res.redirect(`https://www.zarinpal.com/pg/StartPay/${data.Authority}`)
                }
            })
            .catch(err => res.json(err.message));
    }

    checker(req, res, next) {
        console.log(req.query.price);
        try {
            this.model.Payment.find({ resNumber: req.query.Authority }).exec((err, result) => {
                let params = {
                    MerchantID: 'c3d32f57-fd02-417d-9bfd-adf62d6a5302',
                    Amount:20000,
                    Authority: req.query.Authority,
                };
                let options = {
                    method: 'POST',
                    uri: 'https://www.zarinpal.com/pg/rest/WebGate/PaymentVerification.json',
                    headers: {
                        'cache-control': 'no-cache',
                        'content-type': 'application/json'
                    },
                    body: params,
                    json: true,
                };
                request(options)
                    .then(data => {
                        console.log(data);
                        if (data.Status === 100) {
                            //console.log('تراکنش با موفقیت انجام شد');
                            this.model.Payment.find({ resNumber: req.query.Authority }).exec((err, resultPayment) => {
                                if (resultPayment.length > 0) {
                                    this.model.Payment.updateOne(
                                        { resNumber: req.query.Authority },
                                        { $set: { statusPayment: 'موفق', refID: data.RefID } }).exec((err, result) => {
                                        });

                                    this.model.Basket.find({refID: req.query.Authority}).exec((err, resultBasket) => {
                                        if (resultBasket.length > 0) {
                                            this.model.Basket.update(
                                                { refID: req.query.Authority},
                                                { $set: { sucess: 'موفق'}}).exec((err, result) => {
                                                });
                                            for (let i = 0; i < resultBasket.length; i++) {
                                                this.model.Inventory.findOneAndUpdate({ productID: resultBasket[i]['_doc'].productID },{count:resultBasket[i]['_doc'].count}).exec((err, result) => {
                                                    if (result) {                                                    
                                                       return res.redirect('http://www.hd724.com//#/home/call-back/true');
                                                    }
                                                })
                                            }
                                        }
                                    });
                                }
                            });


                        } else {
                            this.model.Basket.deleteMany({ refID: req.query.Authority }).exec((err, result) => {
                                if (result) {
                                    return res.redirect('http://www.hd724.com//#/home/call-back/false');
                                }
                            })


                        }

                    }).catch(err => {
                        next(err)
                    })

            })

        } catch (err) {
            next(err)
        }
        //this.sendsmsPaymentTracking(data.RefID,mobile);

    }
    sendsmsPaymentTracking = (TransationNum, mobile) => {
        var qs = require("querystring");
        var http = require("http");
        var options = {
            "method": "POST",
            "hostname": "rest.payamak-panel.com",
            "port": null,
            "path": "/api/SendSMS/SendSMS",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "7ce78606-0d0b-107d-286c-bbd4b4142760",
                "content-type": "application/x-www-form-urlencoded"
            }
        };

        var req = http.request(options, function (res) {
            var chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                var body = Buffer.concat(chunks);
                // console.log(body.toString());
            });
        });
        req.write(qs.stringify({
            username: '09211480573',
            password: 'cgbd4h',
            to: mobile,
            from: '5000400010602',
            text: ` کد پیگیری پرداخت شما در آزمون مدارس آموزش پرورش ناحیه یک : ${TransationNum} می باشد `,
            isflash: 'false'
        }));
        req.end();
        return TransationNum;
    }
   
    displayPayment(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Payment.find({ userID: req.params.id, statusPayment: "موفق" }, (err, result) => {
            if (result.length) {
                return res.json({
                    data: result,
                    success: true
                })
            }
            res.json({
                data: 'کاربر یافت نشد',
                success: false
            })
        })
    }

    /*  checkStatePayment(req,res) {
         this.model.Payment.findOne({mobile: req.body.mobile, nationalCode: req.body.nationalCode}, (err, Payment) => {
             if (err) throw err;
             if (Payment) {
                 return res.json({
                     data: 'یافت شد',
                     status:Payment._doc.statusPayment,
                     success: true
                 });
             }
         })
     }*/

    checkStatePayment(req, res) {
        this.model.Payment.findOne({ nationalCode: req.body.nationalCode, statusPayment: 'موفق' }, (err, Payment) => {
            if (err) throw err;
            if (Payment) {
                return res.json({
                    data: Payment,
                    success: true
                });
            }
            else {
                return res.json({
                    data: Payment,
                    success: false
                });
            }
        })
    }

    trackingPayment(req, res) {
        this.model.Payment.findOne({ resNumber: req.body.resNumber }, (err, Payment) => {
            if (err) throw err;
            if (Payment) {
                return res.json({
                    data: Payment,
                    success: true
                });
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }



}
