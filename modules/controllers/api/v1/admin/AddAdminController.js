const Controller = require(`${config.path.controller}/Controller`)
module.exports = new class AddAdminController extends Controller {
    store(req, res) {
        req.checkBody('email', ' ایمیل نمیتواند خالی بماند').notEmpty();
        req.checkBody('password', 'پسورد نمیتواند خالی بماند').notEmpty();

        this.escapeAndTrim(req, ' email password ');
        if (this.showValidationErrors(req, res))
            return;
        let newUser = new this.model.AdminUser({
            email: req.body.email,
            password: req.body.password,
            

        })
        newUser.save(err => {
            if (err) throw err;
            res.json('ادمین با موفقیت ثبت شد');
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.AdminUser.findByIdAndUpdate(req.params.id,
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
           
            },
            (err, user) => {
                res.json('ویرایش ادمین با موفقیت انجام شد');
            });
    }



}