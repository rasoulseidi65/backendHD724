const Controller = require(`${config.path.controller}/Controller`);
const AnswerTransform = require(`${config.path.transform}/v1/AnswerTransform`);

module.exports = new class AnswerController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1;
    //     this.model.Answer.paginate({active:true} , { page , limit : 10,sort:{createdAt:'desc'},select:'firstname lastname nationalcode mobile address phone email nationalcard birthcertificate'}).then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new AnswerTransform().withPaginate().transformCollection(result),
    //                     success : true
    //                 });
    //             }
    //
    //             res.json({
    //                 message : 'پاسخی وجود ندارد',
    //                 success : false
    //             })
    //         })
    //         .catch(err => console.log(err));
    // }
  
    index(req, res) {
        this.model.Answer.find({}).sort({ replay: -1 }).exec((err, answer) => {
            if (err) throw err;
            if (answer) {
                return res.json({
                    data: answer,
                    success: true
                });
            }
            res.json({
                data: 'هیچ پاسخی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Answer.findById(req.params.id, (err, answer) => {
            if (answer) {
                
                return res.json({
                    data: answer,
                    success: true
                })
           
        }
            res.json({
                data: 'پاسخی یافت نشد',
                success: false
            })
        })
    }

 
  }
