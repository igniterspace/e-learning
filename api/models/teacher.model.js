//to use mongo db
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

//the abstract parent
const Person = require("./person.model");
const Course = require("./course.model");
const Group = require("./group.model");

//defining the 'teacher' schema
const teacherSchema= new Schema({
    //array of course id's
    courses : [{ type: Schema.Types.ObjectId , ref : 'Course' } ],
    //array of group id's
    groups :[{ type: Schema.Types.ObjectId , ref : 'Group' } ]
});

//Inheriting attributes from the Person Scema using discriminator
const Teacher = Person.discriminator('Teacher', teacherSchema);

module.exports = mongoose.model('Teacher');


// ====== ====== ====== ====== METHODS ====== ====== ====== ======

/**
 * addCourse() method will add a specific course to a specific teacher
 * @param courseId : the id of the course the teacher purchased/selected
 * @param teacherId : the id of the teach who you want to add the course to
 * @param res : resferance to the response object
 * @param callback : the callback funtion
 */
module.exports.addCourse = ( courseId , teacherId , res , callback )=>{
    //converting string course id to an objectId
    var courseObjectId = new ObjectId(courseId);

    Teacher.findById(teacherId , (err , teacher )=>{
        if(err) throw err;
        if(teacher){
            //to check if caourse is already purchsed by the teacher
            const isCourseAlready = teacher.courses.some((course)=> course.equals(courseId));
            if(!isCourseAlready){
                Teacher.findByIdAndUpdate(teacherId,
                    { "$push": { "courses": courseObjectId } },
                    callback
                );
            }else{
                res.json({ state:false,message:"You already have purchased this course!"});
            }
           
        }
 
    });

    
}

/**
 * addGroup() method will add a specific group to a specific teacher
 * @param groupId : the id of the group that you want to add to the teacher
 * @param teacherId : the id of the teacher who will get the group added
 * @param callback : the callback funtion
 */
module.exports.addGroup = ( groupId , teacherId , callback )=>{
    //converting string course id to an objectId
    var groupObjectId = new ObjectId(groupId);
    Teacher.findByIdAndUpdate(teacherId,
        { "$push": { "groups": groupObjectId } },
        callback
    );
}

/**
 * getAllCourses() method will grt all the courses of a specific teacher
 * @param teacherId : the id of the teacher which you want to get all the course the he/she has
 * @param callback : the callback funtion
 */
module.exports.getAllCourses = (teacherId , callback )=>{
    //getting the teacher object
    Teacher.findById(teacherId , (err , teacher )=>{
        if (err) {
            throw err;
        }
        if(teacher){
            //getting the array of course ids from the teacher schema object
            const courseIdArray = teacher.courses ; //ids = array.map(function (obj){ return ObjectId(obj._id)});
            //query to select all objects with the ids
            const query = { "_id": { "$in": courseIdArray }};
            Course.find(query , callback );
        }
    });
}

/**
 * getAllGroups() method will get all the groups of a specific teacher
 * @param teacherId : the id of the teacher which you want to get all the group the he/she has
 * @param callback : the callback funtion
 */

module.exports.getAllGroups = (teacherId , callback )=>{
    //getting the teacher object
    Teacher.findById(teacherId , (err , teacher )=>{
        if (err) {
            throw err;
        }
        if(teacher){
            //getting the array of course ids from the teacher schema object
            const groupsIdArray = teacher.groups ; 
            //query to select all objects with the ids
            const query = { "_id": { "$in": groupsIdArray }};
            Group.find(query , callback );
        }
    });
}




