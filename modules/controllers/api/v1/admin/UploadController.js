const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class UploadController extends Controller {
    uploadImage(req, res) {
        if(req.file) {
            res.json({
                message : 'تصویر با موفقیت آپلود شد',
                imagePath : 'http://api.hd724.com/' + req.file.path.replace(/\\/g , '/'),
                data :req.file,
                success : true,
            })
        } else {
            res.json({
                message : 'تصویر آپلود نشد',
                success : false
            })
        }
    }

    uploadVideo(req, res) {
        if(req.file) {
            res.json({
                message : 'ویدیو با موفقیت آپلود شد',
                videoPath : 'http://api.hd724.com/' + req.file.path.replace(/\\/g , '/'),
                data :req.file,
                success : true,
            })
        } else {
            res.json({
                message : 'ویدیو آپلود نشد',
                success : false
            })
        }
    }
}
