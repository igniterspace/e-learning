//to use mongo db
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

//defining the 'course' schema
const courseSchema= new Schema({
    title : {type:String ,required :true},
    price : {type:Number ,required :true},
    level : {type:String ,required :true},
    description : {type:String ,required :true},
    descriptionShort:{type:String ,required :true},
    mainImageUrl : {type:String ,required :true},

    activities : [{
        title : {type:String ,required :true},
        type: {type:String ,required :true}, //one,two or three
        comicPicUrls : [{type:String}] ,
        projectGoals : {
            texts : [{type:String}]  , 
            imageUrls : [{type:String}] ,
            videoUrls : [{type:String}] 
        },
        materialsRequired :{
            texts : [{type:String}]  , 
            imageUrls : [{type:String}] ,
            videoUrls : [{type:String}] 
        },
        buildingGoals :{
            texts : [{type:String}]  , 
            imageUrls : [{type:String}] ,
            videoUrls : [{type:String}] 
        }
    }]
});

//exporting the schema model to be able to use it in other files
const Course = module.exports= mongoose.model("Course" , courseSchema);

/**
 * addCourse() method will add a new course to the database
 * @param newCourse : The new course json object
 * @param callback : The callback function
 */
module.exports.addCourse = ( newCourse , callback ) => {
    //save course to database
    newCourse.save(callback);
}

/**
 * getAllCourses() method will return all the courses in the database
 * @param callback : The callback function
 */
module.exports.getAllCourses =  (callback) => {
    //getting all the courses in the database
    Course.find({}, function(err, courses) {
        //creating a array will all the courses from the database
        let coursesArray = [];
        courses.forEach(function(course) {
            coursesArray.push(course);
        });
        callback(null,coursesArray);
    });
}


/**
 * getCourseById() method will get a single course with a specific id from the db
 * @param courseId : the id of the course that you want to get
 * @param callback : The callback function
 */
module.exports.getCourseById = (courseId,callback)=>{
    const query={_id:courseId};
    Course.findOne(query,callback);
}

