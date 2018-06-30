//loading express module
const express= require('express');
//initializing express Router to handdle the routes
const router= express.Router();

//controller
const controller=require("../controllers/student.controller");


/**
 * 
 * GET : /student/getallcourses
 * 
*/
router.get('/getallcourses', controller.getAllCoursesTrigger);


/**
 * 
 * GET : /student/getallgroups
 * 
*/
router.get('/getallgroups', controller.getAllGroupsTrigger);


/**
 * 
 * POST : /student/addcompletedactivity
 * 
*/
router.post('/addcompletedactivity', controller.addCompletedActivityIdToStudentTrigger);


/**
 * 
 * GET : /student/getcompletedactivities
 * 
*/
router.get('/getcompletedactivities', controller.getCompletedActivitiesTrigger);



//exporting the router to be able to use it in the app.js or any other file
module.exports = router;