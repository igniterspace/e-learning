//imports to communicate with mongo db
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const Person=require('./person.model');
const Course=require('./course.model');
const Student=require('./student.model');

//defining the 'group' schema
const groupSchema= new Schema({
    groupName : {type:String ,required :true},
    courses : [ { type: Schema.Types.ObjectId , ref : 'Course'  } ] ,  //array of course object id's
    students :[ { type: Schema.Types.ObjectId , ref : 'Student' } ]   // array of student object id's
});

//exporting the schema model to be able to use it in other files
const Group = module.exports= mongoose.model("Group" , groupSchema);


// ====== ====== ====== ====== METHODS ====== ====== ====== ======

/**
 * createGroup() method will create a new group 
 * @param newGroup : the json object of the new group
 * @param callback : The callback function
 */
module.exports.createGroup = ( newGroup , callback ) => {
    //save group to database
    newGroup.save(callback);

}

/**
 * getGroupById() method get group with a specific group id
 * @param groupId : the id of the group you want to get 
 * @param callback : The callback function
 */
module.exports.getGroupById =(groupId , callback ) => {
    const query={_id:groupId};
    //executing the query with the Ids  and also passing in the callback
    Group.findOne(query,callback); 
}


/**
 * addStudent() method will add a specific student to a specific group
 * @param studentId : the id of the student who you want to add to the group
 * @param groupId : the id of the group to which you want to add the student 
 * @param callback : The callback function
 */
module.exports.addStudent = ( studentId , groupId , callback ) =>{
    //converting string student id to an objectId
    const studentObjectId = new ObjectId(studentId);
    Group.findByIdAndUpdate(groupId, { "$push": { "students": studentObjectId } },(err, group )=>{
        if(err){
            throw err;
        }
        if(group){
            //this method will automatically asign all the courses in the group to the newly added student
            Student.assignCoursesInGroupToStudent(studentId,groupId);
            //converting string group id to an objectId
            const groupObjectId = new ObjectId(groupId);
            Student.findByIdAndUpdate( studentId ,{ "$push": { "groups": groupObjectId }} , callback);
        }     
    });
}

/**
 * getStudents() method will get all the students in a specific group
 * @param groupId : the id of the group you want to get tje students from 
 * @param callback : The callback function
 */
module.exports.getAllStudents=(groupId , callback)=>{
     //getting the Group object
     Group.getGroupById(groupId , (err , group )=>{
        if (err) {
            throw err;
        }
        if(group){
            //getting the array of student ids from the group schema object
            const studentIdArray = group.students ; 
            //query to select all objects with the ids
            const query = { "_id": { "$in": studentIdArray }};
            Student.find(query , callback );
        }
    });


}

/**
 * addCourse() method will add a course to the group
 * @param courseId : the id of the course you want to add to the group
 * @param groupId : the id of the group you want to add the course to
 * @param res : the response object referance
 * @param callback : The callback function
 */
module.exports.addCourse = (courseId , groupId ,res , callback) =>{

    Group.getGroupById(groupId ,(err,group)=>{
        if (err) throw err;
        if(group){
            //to check if course is already in the group
            const isCourseAlready = group.courses.some((course)=> course.equals(courseId));
            if(!isCourseAlready){  
                //converting string course id to an objectId
                var courseObjectId = new ObjectId(courseId);
                //to assignig the newly added course to all the students in that specific group
                Group.assignNewCourseToGroupStudents(groupId , courseObjectId);
                //updating the group.courses array
                Group.findByIdAndUpdate(groupId,
                    { "$push": { "courses": courseObjectId } },
                    callback
                );
            }else{
                res.json({state:false,message:"Select course is already in the group!"});
            }
        }

    });

       
}


/**
 * getStudents() method will get all the students in a specific group
 * @param groupId : the id of the group which you want to get the courses from
 * @param callback : the callback function
 */
module.exports.getAllCourses=(groupId , callback)=>{
    //getting the Group object
    Group.getGroupById(groupId , (err , group )=>{
       if (err) {
           throw err;
       }
       if(group){
           //getting the array of student ids from the group schema object
           const courseIdArray = group.courses ; 
           //query to select all objects with the ids
           const query = { "_id": { "$in": courseIdArray }};
           Course.find(query , callback );
       }
   });
}
/**
 * assignNewCourseToGroupStudents() will assign the newly added course to all the students in that specific group
 * @param groupId : id of the group whith the students who you want to assign the new course
 * @param courseId : id of the course you want to assign to the students
 */
module.exports.assignNewCourseToGroupStudents=(groupId , courseId)=>{
    Group.getGroupById(groupId,(err,group)=>{
        if (err) {
            throw err;
        }
        if(group){
            //getting all the student ids in the group
            const arrayOfStudentIds=group.students;
            arrayOfStudentIds.forEach(studentId => {
                //query
                const query = { "_id": studentId };
                Student.findOneAndUpdate(query ,{ "$push": { "courses": { "courseId" : courseId }  }} , (err, student)=>{
                    if (err) console.log(err);
                    if (student) console.log("Student Update Successful");
                } );
            });
        }
    });
}