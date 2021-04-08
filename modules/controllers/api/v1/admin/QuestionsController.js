const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryQuestionsController extends Controller {
    index(req, res) {
        this.model.Question.find({}).exec((err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
            res.json({
                data: 'چنین سوالی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Question.findById(req.params.id, (err, result) => {
            if (result) {
                return res.json({
                    data: result,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }

    store(req, res) {
        if (this.showValidationErrors(req, res))
            return;
        let newCategory = new this.model.Question({
            title: req.body.title,
            price: req.body.price,
            linkFile: req.body.linkFile,
            count:req.body.count,
            answer:req.body.answer,
            typeQuestion:req.body.typeQuestion,
            text:req.body.text,
            section:req.body.section
        })
        newCategory.save(err => {
            if (err) throw err;
            res.json('نمونه سوال  جدید با موفقیت ثبت شد');
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Question.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            price: req.body.price,
            linkFile: req.body.linkFile,
            count:req.body.count,
            answer:req.body.answer,
            typeQuestion:req.body.typeQuestion,
            text:req.body.text,
            section:req.body.section
        }, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: ' نمونه سوال با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین نمونه سواالی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Question.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: 'نمونه سوال با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین نمونه سوالی وجود ندارد',
                success: false
            });
        });
    }
}
