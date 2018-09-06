//loading express module
const express= require('express');
//initializing express
// const app= express();


const multer = require('multer');
const ejs = require('ejs');


//set storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null,file.fieldname +  '-' + Date.now() + path.extname(file.originalname));
    }
  
});

//init upload
const upload = multer({
    storage: storage,
    limits:{fileSize:10000000000},
    fileFilter: function(req, file , cb){
        checkFileType(file, cb);
    }
}).single('myImage');

//check file type
function checkFileType(file, cb){
    //allowed ext
    const filetypes =/jpeg|jpg|png|gif/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    }else{
        cb('Error: Images Only!');
    }
}
//init app
const app = express();

//EJS
app.set('view engine', 'ejs');

//Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {
   upload(req, res, (err) => {
        if(err){
           res.render('index', {
               msg: err
           });
        }else{
            if(req.file == undefined){
                res.render('index' , {
                    msg: 'Error: No Files Selected!'
                });
            }else{
                // console.log('file:', req.file.filename);
                    res.render('index', {
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`
            });
        }
    }
   });
});


// ===================== TO AVOID CORS ERROR ====================================
const cors=require('cors');
app.use(cors());

// ========================= USER AUTHENTICATION ================================

const passport=require('passport');
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);


// ========================= BODY PARSER ==================================
//loading the body parser module
const bodyparser= require('body-parser');
//making the request body in the JSON format
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

// ========================= MONGO DB ==================================

const databaseConnection = require("./database/db.common");
//checking if connection is successful
(databaseConnection)?console.log("Db Connection Successful!"):console.log("Db Connection Failed!");

// ========================= PATH ==================================

//loading files system module
const path= require('path');
//defining the path to the static html files
// app.use(express.static(path.join(__dirname,"public")));

app.use(express.static('./public'));
// ======================= ROUTE HANDLING ===========================

//setting the person routes
const personRoute =  require('./api/routes/person.route');
app.use('/person', personRoute);

//setting the student routes
const studentRoute =  require('./api/routes/student.route');
app.use('/student', studentRoute);

//setting the teacher routes
const teacherRoute =  require('./api/routes/teacher.route');
app.use('/teacher', teacherRoute);

//setting the course routes
const courseRoute =  require('./api/routes/course.route');
app.use('/course', courseRoute);

//setting the group routes
const groupRoute =  require('./api/routes/group.route');
app.use('/group', groupRoute);

//if not index.html file is available in the public folder 
app.get('/',(req,res)=>{
    res.send("NOTE : This will be replaced by the static html in the public folder");
});

// =========================== PORT ===============================

//defining the PORT and making the server listen to that port
const PORT= process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Listening to port " + PORT);
    
});

