//loading express module
const express= require('express');
//initializing express Router to handdle the routes
const router= express.Router();
//importing the course controller
const controller = require('../controllers/course.controller');


/**
 * 
 * POST : /course/add
 * 
*/
router.post('/add',controller.addNewCourseTrigger);


/**
 * 
 * GET : /course/all
 * 
*/
router.get('/all', controller.getAllCoursesTrigger);


/**
 * 
 * GET : /course/:courseId
 * 
*/
router.get('/one', controller.getCourseByIdTrigger);




//exporting the router to be able to use it in the app.js or any other file
module.exports = router;