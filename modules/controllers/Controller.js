// Model
const AdminUser = require(`${config.path.model}/admin_user`);
const CustomerUser = require(`${config.path.model}/customer_user`);
const Comment = require(`${config.path.model}/comment`);
const Answer = require(`${config.path.model}/answer`);
const Teacher = require(`${config.path.model}/teacher`);
const Products = require(`${config.path.model}/products`);
const CartCustom = require(`${config.path.model}/cart_custom`);
const City = require(`${config.path.model}/city`);
const Country = require(`${config.path.model}/country`);
const Slider = require(`${config.path.model}/slider`);
const Province = require(`${config.path.model}/province`);
const Rating = require(`${config.path.model}/rating`);

const Payment = require(`${config.path.model}/payment`);
const Wallet = require(`${config.path.model}/wallet`);

const Article=require(`${config.path.model}/article`);
const Course=require(`${config.path.model}/course`);
const Episode=require(`${config.path.model}/episode`);
const CategoryQuestions=require(`${config.path.model}/categoryQuestions`);
const subCategoryQuestions=require(`${config.path.model}/subCategoryQuestions`);
const Question=require(`${config.path.model}/question`);
module.exports = class Controller {
    constructor() {
        this.model = { AdminUser,Course,Episode,Article, CustomerUser,
            Comment,Question, Answer, Teacher,  Products, CartCustom, City, Country,
            Slider, Province,Rating  ,Payment,Wallet,CategoryQuestions,subCategoryQuestions}
    }
    showValidationErrors(req, res, callback) {
        let errors = req.validationErrors();
        if (errors) {
            res.status(422).json({
                message: errors.map(error => {
                    return {
                        'field': error.param,
                        'message': error.msg
                    }
                }),
                success: false
            });
            return true;
        }
        return false
    }
    escapeAndTrim(req, items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();
        });
    }
}
