const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CategoryQuestionsController extends Controller {
    index(req, res) {
        this.model.CategoryQuestions.find({}).exec((err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
            res.json({
                data: 'چنین دسته ای وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CategoryQuestions.findById(req.params.id, (err, result) => {
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
        req.checkBody('title', ' نام دسته نمیتواند خالی بماند').notEmpty();
        this.escapeAndTrim(req, 'title');
        if (this.showValidationErrors(req, res))
            return;
        let newCategory = new this.model.CategoryQuestions({
            title: req.body.title,
            image:req.body.image
        })
        newCategory.save(err => {
            if (err) throw err;
            return res.json({
                data: 'دسته با موفقیت ثبت شد',
                success: true
            })
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CategoryQuestions.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            image:req.body.image
        }, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: ' دسته با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین دسته ای وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CategoryQuestions.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: 'دسته با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین دسته وجود ندارد',
                success: false
            });
        });
    }
}
