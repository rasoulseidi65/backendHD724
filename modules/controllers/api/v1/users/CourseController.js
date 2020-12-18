const Controller = require(`${config.path.controller}/Controller`);

module.exports = new class CourseController extends Controller {
      
            store(req, res, next) {
        try {
        console.log(req.body);
            let newCourse = new this.model.Course({
                userID:req.body.course.userID,
                title:req.body.course.title ,
                categories:req.body.course.categories ,
                type:req.body.course.type  ,
                detail:req.body.course.detail  ,
                abstract:req.body.course.abstract  ,
                price:req.body.course.price ,
                priceSupport:req.body.course.priceSupport ,
                image:req.body.course.image  ,
                level:req.body.course.level ,
                titleTag:req.body.course.titleTag ,
                keyTag:req.body.course.keyTag ,
                timeCourse:req.body.course.timeCourse ,//زمان دوره
                sizeCourse:req.body.course.sizeCourse ,
            })
            newCourse.save(err => {
                if(err) {
                   return res.json({
                                data: 'خطا',
                                message:err,
                                success: false
                            }); 
                }
                else{
                    let countRecord=req.body.episode.length;
                for(var i=0;i<1 ;i++)
                {
                    let newEpisode = new this.model.Episode({
                        courseID: newCourse['_doc']._id,
                        title: req.body.episode[0].title,
                        type: req.body.episode[0].type,
                        body: req.body.episode[0].body,
                        time: req.body.episode[0].time,
                        number:req.body.episode[0].Number,
                        videoUrl: req.body.episode[0].videoUrl,
                    }).save(err => {
                if(err) {
                   return res.json({
                                data: 'خطا',
                                message:err,
                                success: false
                            }); 
                }
                        return res.json({
                            data: 'دوره جدید با موفقیت ثبت شد',
                            success: true
                        });
                    });
                }

                }
               
            })



        } catch (err) {
            next(err);
        }
    }




     index(req, res, next) {
        try {
                    this.model.Course.find({}).exec((err , result) => {

          
            if (result) {
                return res.json({
                    data: result,
                    success: true
                })

            } else {
                return res.json({
                    data: result,
                    success: false
                })
            }
                    })

        } catch (err) {
            next(err);
        }
    }

     single(req, res, next) {

            this.model.Course.find({}).populate('Episode CustomerUser Comment').exec((err,result)=>{
                if(err) throw err;
                if (result) {
                    return res.json({
                        data: result,
                        success: true
                    })

                } else {
                    return res.json({
                        data: 'وجود ندارد',
                        success: false
                    })
                }
            });



    }
     courseUser(req, res, next) {
      
    this.model.Course.find({userID:req.body.userID}).exec((err, result) => {
                if (err) throw err;
            if (result) {
                return res.json({
                    data: result,
                    success: true
                });
            }
           return res.json({
                data: 'هیچ پاسخی وجود ندارد',
                success: false
            })
        });

      
    }
    async newCourse(req, res, next) {
        try {

            let result = await this.model.Course.find({}).limit(8).sort({date: -1}).populate('Episode Teacher');
            if (result.length > 0) {
                return res.json({
                    data: result,
                    success: true
                })

            } else {
                return res.json({
                    data: 'وجود ندارد',
                    success: false
                })
            }

        } catch (err) {
            next(err);
        }
    }

    async viewMaxCourse(req, res, next) {
        try {

            let result = await this.model.Course.find({}).limit(8).sort({viewCount: -1}).populate('Episode Teacher');
            if (result.length > 0) {
                return res.json({
                    data: result,
                    success: true
                })

            } else {
                return res.json({
                    data: 'وجود ندارد',
                    success: false
                })
            }

        } catch (err) {
            next(err);
        }
    }

    // slug(title) {
    //     return title.replace(/([^0-9a-zآ-ی]|-)+/g, '_');
    // }
}

