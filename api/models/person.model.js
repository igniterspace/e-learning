//to use mongo db
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

//use to hash the passwords
const bcrypt = require('bcryptjs');
const Course = require('./course.model');


const personOptions = {
    "discriminatorKey": "persontype", // our discriminator key, could be anything
    "collection": "persons" // the name of our collection
};

//defining the 'Person' schema
const personSchema= new Schema({
    firstName : {type:String ,required :true},
    lastName : {type:String ,required :true},
    gender : {type:String ,required :true},
    email : {type:String ,required :true , unique :true},
    password : {type:String ,required :true},
}, personOptions );


//exporting the schema model to be able to use it in other files
const Person= module.exports=mongoose.model( "Person" , personSchema );


// ====== ====== ====== ====== METHODS ====== ====== ====== ======


/**
 * registerPerson() method will incrypt the password and save the Person to the database
 * @param newPerson : the json object of the new person
 * @param callback : The callback function
 */
module.exports.registerPerson = ( newPerson , callback ) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newPerson.password, salt, function(err, hash) {
            //updating the Person password to the hash value
            newPerson.password=hash;
            //checking for error
            if(err) throw err;
            //save Personto database
            newPerson.save(callback);
        });
    }); 
}
/**
 * findByEmail() will execute a query to find if a match email is in the database
 * @param email : the email of the person that you want to find
 * @param callback : The callback function
 */
module.exports.findByEmail = (email,callback)=> {
    //this query is to check if the current email matches any one of the emails in the db
    const query={email:email};
    //executing the query and also passing in the callback
    Person.findOne(query,callback);    
}
/**
 * passwordCheck() method will check if the password provided by the Person matches the hashed password in the database
 * @param plainPassword : password provided by user
 * @param hashPassword : the hassed password which is stored in the db
 * @param callback : The callback function
 */
module.exports.passwordCheck = (plainPassword,hashPassword,callback) => {
    bcrypt.compare(plainPassword,hashPassword,function(err,res){
        if(err) throw err;
        //passing the result (TRUE ot FALSE) to the callback function
        callback(null,res)    
    })
}

/**
 * findUserById() method will get Person with a id
 * @param id : id of the person to be found
 * @param callback : The callback function
 */
module.exports.findUserById = ( id, callback) => {
    const query={_id:id};
    //executing the query with the Ids  and also passing in the callback
    Person.findOne(query,callback); 
}



