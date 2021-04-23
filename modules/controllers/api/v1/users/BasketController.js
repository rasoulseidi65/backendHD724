const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class BasketController extends Controller {

    index(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Basket.find({userID:req.params.id,success:'موفق'}).populate('user Question course Payment ').exec((err, cartcustom) => {
            if (err) throw err;
            if (cartcustom!=null) {
                return res.json({
                    data: cartcustom,
                    success: true
                });
            }
            res.json({
                data: 'هیچ  وجود ندارد',
                success: false
            })
        });
    }



}
