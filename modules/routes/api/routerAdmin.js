const express = require('express');
const router = express.Router();
const adminRouter = express.Router();

// middlewares
const apiAuthAdminUser = require('./middleware/apiAuthAdminUser');
const apiAdmin = require('./middleware/apiAdmin');
const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadVideo } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');

//admin controller
const { api: ControllerApi } = config.path.controllers;

const AdminArticleController = require(`${ControllerApi}/v1/admin/ArticleController`);
const AdminCityController = require(`${ControllerApi}/v1/admin/CityController`);
const AdminCountryController = require(`${ControllerApi}/v1/admin/CountryController`);
const AdminProvinceController = require(`${ControllerApi}/v1/admin/ProvinceController`);
const AdminProductsController = require(`${ControllerApi}/v1/admin/ProductsController`);
const AdminSliderController = require(`${ControllerApi}/v1/admin/SliderController`);
const AdminAuthUserController = require(`${ControllerApi}/v1/admin/AuthUserController`);
const AdminAddAdminController = require(`${ControllerApi}/v1/admin/AddAdminController`);
const AdminUserController = require(`${ControllerApi}/v1/admin/UserController`);
const AdminCustomeruserController = require(`${ControllerApi}/v1/admin/CustomeruserController`);
const AdminAnswerController = require(`${ControllerApi}/v1/admin/AnswerController`);
const AdminCommentController = require(`${ControllerApi}/v1/admin/CommentController`);
const AdminCartcustomController = require(`${ControllerApi}/v1/admin/CartcustomController`);
const AdminUploadController = require(`${ControllerApi}/v1/admin/UploadController`);
const CourseController = require(`${ControllerApi}/v1/admin/CourseController`);
const EposideController = require(`${ControllerApi}/v1/admin/EposideController`);


//admin router*********************************************
//article
adminRouter.post('/article', AdminArticleController.store.bind(AdminArticleController));
adminRouter.get('/article', AdminArticleController.index.bind(AdminArticleController));
adminRouter.put('/article', AdminArticleController.update.bind(AdminArticleController));
adminRouter.delete('/article/:id', AdminArticleController.destroy.bind(AdminArticleController));

//upload image
adminRouter.post('/image', uploadImage.single('image'), AdminUploadController.uploadImage.bind(AdminUploadController));

adminRouter.post('/video', uploadVideo.single('video'), AdminUploadController.uploadVideo.bind(AdminUploadController));

//course

adminRouter.post('/course',CourseController.store.bind(CourseController));
adminRouter.get('/index',CourseController.index.bind(CourseController));
adminRouter.post('/single',CourseController.single.bind(CourseController));

//episode
adminRouter.post('/episode',EposideController.store.bind(EposideController));


//City
adminRouter.get('/City', apiAuthAdminUser,AdminCityController.index.bind(AdminCityController));
adminRouter.get('/City/:id', AdminCityController.single.bind(AdminCityController));
adminRouter.post('/City', AdminCityController.store.bind(AdminCityController));
adminRouter.put('/City/:id', AdminCityController.update.bind(AdminCityController));
adminRouter.delete('/City/:id', AdminCityController.destroy.bind(AdminCityController));


//country
adminRouter.get('/country', AdminCountryController.index.bind(AdminCountryController));
adminRouter.get('/country/:id', AdminCountryController.single.bind(AdminCountryController));
adminRouter.post('/country', AdminCountryController.store.bind(AdminCountryController));
adminRouter.put('/country/:id', AdminCountryController.update.bind(AdminCountryController));
adminRouter.delete('/country/:id', AdminCountryController.destroy.bind(AdminCountryController));

//province
adminRouter.get('/province', AdminProvinceController.index.bind(AdminProvinceController));
adminRouter.get('/province/:id', AdminProvinceController.single.bind(AdminProvinceController));
adminRouter.post('/province', AdminProvinceController.store.bind(AdminProvinceController));
adminRouter.put('/province/:id', AdminProvinceController.update.bind(AdminProvinceController));
adminRouter.delete('/province/:id', AdminProvinceController.destroy.bind(AdminProvinceController));

//products
adminRouter.get('/products', apiAuthAdminUser,AdminProductsController.index.bind(AdminProductsController));
adminRouter.get('/products/:id', AdminProductsController.single.bind(AdminProductsController));
adminRouter.delete('/products/:id', AdminProductsController.destroy.bind(AdminProductsController));

//slider
adminRouter.get('/slider', AdminSliderController.index.bind(AdminSliderController));
adminRouter.get('/slider/:id', AdminSliderController.single.bind(AdminSliderController));
adminRouter.post('/slider', AdminSliderController.store.bind(AdminSliderController));
adminRouter.put('/slider/:id', AdminSliderController.update.bind(AdminSliderController));
adminRouter.delete('/slider/:id', AdminSliderController.destroy.bind(AdminSliderController));

//add admin
adminRouter.post('/addadmin' , AdminAddAdminController.store.bind(AdminAddAdminController));
adminRouter.put('/addadmin/:id' , AdminAddAdminController.update.bind(AdminAddAdminController));

//admin user
adminRouter.get('/adminuser',AdminUserController.index.bind(AdminUserController));
adminRouter.get('/adminuser/:id', AdminUserController.single.bind(AdminUserController));
adminRouter.post('/adminuser', AdminUserController.store.bind(AdminUserController));
adminRouter.put('/adminuser/:id', AdminUserController.update.bind(AdminUserController));
adminRouter.delete('/adminuser/:id', AdminUserController.destroy.bind(AdminUserController));


//customer user
adminRouter.get('/customeruser/:id', AdminCustomeruserController.single.bind(AdminCustomeruserController));

//answer
adminRouter.get('/answer', apiAuthAdminUser,AdminAnswerController.index.bind(AdminAnswerController));
adminRouter.get('/answer/:id', AdminAnswerController.single.bind(AdminAnswerController));

//comment
adminRouter.get('/comment', AdminCommentController.index.bind(AdminCommentController));
adminRouter.get('/comment/:id', AdminCommentController.single.bind(AdminCommentController));
adminRouter.put('/comment/:id', AdminCommentController.update.bind(AdminCommentController));
adminRouter.delete('/comment/:id', AdminCommentController.destroy.bind(AdminCommentController));

//cartcustom
adminRouter.get('/cartcustom', apiAuthAdminUser,AdminCartcustomController.index.bind(AdminCartcustomController));
adminRouter.get('/cartcustom/:id', AdminCartcustomController.single.bind(AdminCartcustomController));

adminRouter.post('/login', AdminAuthUserController.login.bind(AdminAuthUserController));
adminRouter.post('/register', AdminAuthUserController.register.bind(AdminAuthUserController));

router.use('', adminRouter);
module.exports = router;
