const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class HandoutController extends Controller {
    index(req, res) {
        this.model.Handout.find({}).exec((err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
            res.json({
                data: 'چنین جزوه ای وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Handout.findById(req.params.id, (err, result) => {
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
        let newCategory = new this.model.Handout({
            title: req.body.title,
            price: req.body.price,
            linkFile: req.body.linkFile,
            countPage:req.body.countPage,
            author:req.body.author,
            section:req.body.section,
            text:req.body.text,
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
        this.model.Handout.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            price: req.body.price,
            linkFile: req.body.linkFile,
            countPage:req.body.countPage,
            author:req.body.author,
            section:req.body.section,
            text:req.body.text,
        }, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: ' جزوه با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین جزوه ای وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Handout.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: 'جزوه با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین جزوه وجود ندارد',
                success: false
            });
        });
    }
}
