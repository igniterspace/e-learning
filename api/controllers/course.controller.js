//loading the user scema model module
const Course= require('../models/course.model');


module.exports.addNewCourseTrigger = (req,res)=>{
    //creating a new course object using the defined scemea
    const newCourse=new Course({
        title : req.body.title,
        price : req.body.price,
        level : req.body.level,
        description : req.body.description,
        descriptionShort:req.body.descriptionShort,
        mainImageUrl : req.body.mainImageUrl,
        activities : req.body.activities
    });
    
    //passing the newCourse object and a callback funtion to the addCourse()
    Course.addCourse(newCourse,function(err,course){
        if(err){
            console.log(err);
            //if not inserted
            res.json({state:false,message:"Add Course failed"});
        }
        if(course){
            //if inserted
            res.json({ state:true,message:"Add Course successful"});
        }
    }); 
};

module.exports.getAllCoursesTrigger = (req,res)=>{
    //calling the getAllCourses() function and passing the callback funtion
    Course.getAllCourses((err,courses)=>{
        if(err){
            //if not succesful
            res.json({state:false,message:"Getting all courses failed"});
        }
        if(courses){
            //if successful - sending the courses as the response
            res.json(courses);
        }
    }); 
};

module.exports.getCourseByIdTrigger = (req,res) => {
    //getting the couse id sent in the request
    const courseId =req.query.courseId;

    Course.getCourseById(courseId , (err,course)=>{
        if(err){
            //if not succesful
            res.json({ state:false , message:"Getting course failed"});
        }
        if(course){
            //if successful - sending the course as the response
            res.json(course);
        }
    })
}