var express = require ('express'); //build the resp APIs , HTML, C?SS, client-side JS files
var path= require("path");
var bodyParser = require ('body-parser'); //parses the request and creates the req. body object
var mongo=require("mongoose");
require("dotenv").config();

//Connecting to MongoDB atlas database by environment variables using .env file

// creating connection to MONGODB by using mongoose
//if unable to connect we throw the error to the user
var db = mongo.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// setting the routing to be handled by Express
var app = express()
app.use(bodyParser());
//parse requests of content type - app/JSON
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));


//set the headers HTTP response that allows us to define the headers.
app.use(function (req, res, next){
    // define the website we wish to connect to
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//define the request methods we wish to allow in our code.
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//defines the request headers we wish to allow.
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//allows the website to include cookies in the request sent to the API
res.setHeader('Access-Control-Allow-Credentials',true);
next();
});

// Defining a schema on a Mongoose model
// that allows storage of arbitrary fields

//storing the name and 
// suggestion of the user which are both Strings
var Schema=mongo.Schema;
var UsersSchema=new Schema({
    name: {type:String},
    suggestion: {type:String},
},{ versionKey:false});

var model=mongo.model('Users', UsersSchema, 'users');

//handling CRUD operations
//routes
//Defining our API calls
//store, update, find and delete the user data from the database.



//POST: save user to db


app.post("/api/SaveUser", function(req, res){
    var mod = new model (req.body);
    mod.save(function(err, data){
        if(err){
res.send(err);
        }
        else{
            res.send({data:"Record had been saved.!!"});

        }
    });
})
//Update a user by the id in the request
app.post("/api/UpdateUser", function(req, res){
    var mod = new model (req.body);
    model.findByIdAndUpdate(req.body.id, {name:req.body.name, suggestion: req.body.suggestion},
       
        
        function(err, data){
        if(err){
res.send(err);
        }
        else{
            res.send({data:"Record had been updated.!!"});

        }
    });
})


// DELETE: delete book item with matching id
app.post("/api/deleteUser", function(req, res){
   
    model.remove({_id: req.body.id}, function(err, data){
        if(err){
res.send(err);
        }
        else{
            res.send({data:"Record had been deleted.!!"});

        }
    });
})

//GET: returns the user to display it

app.get("/api/getUser", function(req, res){
    
    model.find({}, function(err, data){
        if(err){
res.send(err);
        }
        else{
            res.send(data);

        }
    });
})

//create a server that browsers can connect to.
app.listen(8080, function(){
    console.log('App listening on port 8080!')
})