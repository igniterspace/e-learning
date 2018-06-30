const Student= require('../models/student.model');


module.exports.getAllCoursesTrigger = (req ,res )=>{
    //getting the id of the teacher from the GET Params
    const studentId=req.query.studentId;

    Student.getAllCourses(studentId ,(err , courses)=>{
        if(err){
            res.json( { state:false,message:"getting teachers courses failed" } );
        }
        if(courses){
            res.json( { courses } );
        }
       
    });

}

module.exports.getAllGroupsTrigger = (req ,res )=>{
    //getting the id of the teacher from the GET Params
    const studentId=req.query.studentId;

    Student.getAllGroups(studentId ,(err , groups)=>{
        if(err){
            res.json( { state:false,message:"getting student groups failed" } );
        }
        if(groups){
            res.json( { groups } );
        }
       
    });

}

module.exports.addCompletedActivityIdToStudentTrigger=(req ,res)=>{
    const courseId=req.body.courseId;
    const activityId=req.body.activityId;
    const studentId=req.body.studentId;

    Student.addCompletedActivityIdToStudent(courseId,activityId , studentId , (err, student)=>{
        if(err){
            res.json( { state:false,message:"Failed" } );
        }
        if(student){
            res.json( { state:true, message:"Success" } );
        }
    })
}

module.exports.getCompletedActivitiesTrigger=(req , res )=>{
    const studentId=req.query.studentId;
    const courseId=req.query.courseId;

    Student.getCompletedActivities(studentId , courseId ,(completedActivities)=>{
        if(completedActivities){
            res.json(completedActivities);
        }else{
            res.json( { state:false,message:"Failed" } );
        }
    });

}