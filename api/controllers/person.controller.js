//loading the models
const Student= require('../models/student.model');
const Teacher= require('../models/teacher.model');
const Person= require('../models/person.model');
//need when logging in a user
const jwt = require('jsonwebtoken')
//to use config data
const config=require("../../config/database");


module.exports.registerNewStudentTrigger = (req,res)=>{
    //creating a new Student object using the defined scemea
    const newStudent=new Student({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        gender:req.body.gender,
        email:req.body.email,
        password:req.body.password,
        courses:[],
        groups:[]
    });

    try {
        registerPersonCommon(newStudent,res);
    } catch (error) {
        console.log(error);
    }
  
};

module.exports.registerNewTeacherTrigger = (req,res)=>{
    //creating a new Teacher object using the defined scemea
    const newTeacher = new Teacher({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        gender:req.body.gender,
        email:req.body.email,
        password:req.body.password,
        courses:[],
        groups:[]
    });

    try {
        registerPersonCommon(newTeacher,res);
    } catch (error) {
    }
    
}


module.exports.loginPersonTrigger = (req,res)=>{
    //getting the person's username and password 
    const email= req.body.email;
    const password= req.body.password;

    //passing the email and a callback fuction to the findByEmail() function
    Person.findByEmail(email,function (err,person){
        if(err) throw err;
        if(!person){
            res.send({state:false,message:"No matching email found"});
            return false;
        }else{
           //check if passwords are matching
           Person.passwordCheck(password,person.password, function (err,match){
               if(err) throw err; 
               //checking if match is a success
                if(match){
                   //creating a JSON web toke (JWT)
                   const token = jwt.sign(person.toJSON(), config.secret , {expiresIn:86400} );
                   res.json({
                       state:true,
                       message:"Login Successful",
                       token:"JWT "+token,
                       person:{
                           "_id" : person._id,
                           "type" : person.persontype,
                           "firstName" : person.firstName,
                           "lastName" : person.lastName
                       }
                   });
               }
               //checking if match is fail
               if(!match){
                   res.send({state:false,message:"Inncorrect Password , Try Again!"});
               }
           });
        }
    });
}


module.exports.getPersonProfileTrigger = (req, res) => {
    res.json({
        person : req.user
    });
}



// ========= ========= ========= Common Methods ========= ========= =========

const registerPersonCommon =(newPersonModel , res)=>{
    Person.registerPerson(newPersonModel,function(err,person){
        if(err){
            console.log(err);
            //if not inserted
            res.json({state:false,message:"Person registration failed"});
        }
        if(person){
            //if inserted
            res.json({ state:true,message:"Person registration successful"});
        }
    }); 
} 
