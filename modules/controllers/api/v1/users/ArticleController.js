const Controller = require(`${config.path.controller}/Controller`);
// const ArticleTransform = require(`${config.path.transform}/v1/ArticleTransform`);
module.exports = new class ArticleController extends Controller {

    index(req , res) {
        this.model.Article.find({}).sort({title:-1}).exec((err , article) => {
            if(err) throw err;
            if(article) {
                return res.json ({
                    data: article,
                    success: true
                });
            }
            res.json({
                data : 'هیچ مقاله ای وجود ندارد',
                success : false
            })
        });
    }

    single(req, res) {
        req.checkParams('id' , 'ای دی وارد شده صحیح نیست').isMongoId();
        if(this.showValidationErrors(req, res))
            return;
        this.model.Article.findById(req.params.id , (err , article) => {
            if(article) {
                return res.json({
                    data : article,
                    success : true
                })
            }
            res.json({
                data : 'یافت نشد',
                success : false
            })
        })
    }
    newest(req , res) {
        this.model.Article.find({}).sort({date:-1}).limit(4).exec((err , article) => {
            if(err) throw err;
            if(article) {
                return res.json ({
                    data: article,
                    success: true
                });
            }
            res.json({
                data : 'هیچ مقاله ای وجود ندارد',
                success : false
            })
        });
    }

}
