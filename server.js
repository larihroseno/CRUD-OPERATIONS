var express = require ('express');
var path= require("path");
var bodyParser = require ('body-parser'); 
var mongo=require("mongoose");
require("dotenv").config();


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

var app = express()
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next){
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
res.setHeader('Access-Control-Allow-Credentials',true);
next();
});

var Schema=mongo.Schema;
var UsersSchema=new Schema({
    name: {type:String},
    suggestion: {type:String},
},{ versionKey:false});

var model=mongo.model('Users', UsersSchema, 'users');

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

app.post("/api/UpdateUser", function(req, res){
    var mod = new model (req.body);
    model.findByIdAndUpdate(req.body._id, {name:req.body.name, suggestion: req.body.suggestion},
        function(err, data){
        if(err){
res.send(err);
        }
        else{
            res.send({data:"Record had been updated.!!"});

        }
    });
})

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

app.listen(8080, function(){
    console.log('App listening on port 8080!')
})