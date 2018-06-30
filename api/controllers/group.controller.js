//loading the user scema model module
const Group= require('../models/group.model');
//need when logging in a user
const jwt = require('jsonwebtoken')
//to use config data
const config=require("../../config/database");

const Teacher=require("../models/teacher.model");
const Person=require("../models/person.model");


module.exports.createGroupTrigger = (req,res)=>{
    //creating a new Group object using the defined scemea
    const newGroup=new Group({
        groupName : req.body.groupName ,
        courses : [] , 
        students : []
    });
    //passing the newGroup object and a callback funtion to the createGroup() method to add the group to the Database
    Group.createGroup(newGroup,(err,group) =>{
        if(err){
            //if not inserted
            res.json({state:false,message:"Create group failed"});
        }
        if(group){
            const groupId=group._id;
            const teacherId=req.body.teacherId;
            //adding group id to teachers groups array
            Teacher.addGroup(groupId , teacherId , (err , teacher)=>{
                if(err){
                    //if not inserted
                    res.json({state:false,message:"Create group failed"});
                }
                if(teacher){
                    //if inserted
                    res.json({ state:true,message:"Create group successful"});
                }
            });
        }
    }); 
}


module.exports.addStudentToGroupTrigger = (req,res)=>{
    const studentEmail = req.body.studentEmail;
    const groupId = req.body.groupId;

    //getting the student from the email adress
    Person.findByEmail(studentEmail , (err , person)=>{
        if(err){
            throw err;
        } 
        if(!person || person.persontype==="Teacher"){
            res.json({state:false,message:"Student email not found"});
        }
        if(person){

            //for validating if the student is already in the group
            const isAlreadyInGroup = person.groups.some((group)=> group.equals(groupId));
            
            //validating if the student is already in the group
            if(!isAlreadyInGroup){  
                Group.addStudent(person._id , groupId ,(err,student)=>{
                    if(err){
                        //if not inserted
                        res.json({state:false,message:"Adding student to the group failed"});
                    }
                    if(student){
                        //if inserted
                        res.json({ state:true,message:"Adding student to the group successful"});
                    }    
                });
            }else{
                res.json({ state:false,message:"Student is already in the group"});
            }
        }     
    });
 }


 module.exports.addCourseToGroupTrigger = (req,res)=>{

    const courseId = req.body.courseId;
    const groupId = req.body.groupId;

    Group.addCourse(courseId,groupId,res,(err,group)=>{
         if(err){
            console.log(err);
            //if not inserted
            res.json({state:false,message:"Adding course to the group failed"});
         }
         if(group){
            //if inserted
            res.json({ state:true,message:"Adding course to the group successful"});
         }
    });
 }

 module.exports.getGroupByIdTrigger=(req,res)=>{
     const groupId= req.query.groupId;

     Group.getGroupById(groupId , (err,group)=>{
         if(err){
            res.json({state:false,message:"Getting group by id failed"});
         }
         if(group){
            res.json({group});
         }
     });

 }

 module.exports.getAllStudentsTrigger =(req,res)=>{
    const groupId= req.query.groupId;
    Group.getAllStudents(groupId , (err,students)=>{
        if(err){
            res.json({state:false,message:"Getting students in group failed"});
        }
        if(students){
            res.json({students});
        }
    });
 }

 module.exports.getAllCoursesTrigger =(req,res)=>{
    const groupId= req.query.groupId;
    Group.getAllCourses(groupId , (err,courses)=>{
        if(err){
            res.json({state:false,message:"Getting courses in group failed"});
        }
        if(courses){
            res.json({courses});
        }
    });

 }