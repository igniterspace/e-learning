const Person= require('../models/person.model');
const Teacher= require('../models/teacher.model');

module.exports.addCourseTrigger = (req,res)=>{
    const courseId = req.body.courseId;
    const teacherId = req.body.teacherId;
            
    Teacher.addCourse(courseId , teacherId , res , (err, course)=>{
        if(err){
            console.log(err);
            //if not inserted
            res.json({state:false,message:"Adding course failed"});
         }
         if(course){
            //if inserted
            res.json({ state:true,message:"Course purchased successfully"});
         }
    });
    
}


module.exports.getAllCoursesTrigger = (req ,res )=>{
    //getting the id of the teacher from the GET Params
    const teacherId=req.query.teacherId;

    Teacher.getAllCourses(teacherId ,(err , courses)=>{
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
    const teacherId=req.query.teacherId;

    Teacher.getAllGroups(teacherId ,(err , groups)=>{
        if(err){
            res.json( { state:false,message:"getting teachers groups failed" } );
        }
        if(groups){
            res.json( { groups } );
        }
       
    });

}