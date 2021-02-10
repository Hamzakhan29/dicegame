var express = require("express");
var app = express(); // create our app w/ express
var mongoose = require("mongoose"); // mongoose for mongodb
var morgan = require("morgan"); // log requests to the console (express4)
var bodyParser = require("body-parser"); // pull information from HTML POST (express4)
var methodOverride = require("method-override"); // simulate DELETE and PUT (express4)
var cors = require("cors");
var url = require("url");
var crypto = require("crypto");
var request = require("request");
//for aws video rekognition
// var Aws = require("aws-sdk");
var http=require("http");

// var fs = require("fs");
mongoose.connect(                                  
    "mongodb://127.0.0.1:27017/dicegame", {          // LOCAL MONGO CODE
    useNewUrlParser: true,
    useUnifiedTopology: true    }
  );

// mongoose.connect(                                  
//       "mongodb://ItplAdmin:itpladmin123#@3.6.58.122:27017/NGOnewsDB", {          // LIVE MONGO CODE
//         useNewUrlParser: true 
//       }
//     );


  app.use(morgan("dev")); // log every request to the console
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(
  bodyParser.json({
    type: "application/vnd.api+json"
  })
); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT","GET","POST","OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//connection to mongodb
var connection = mongoose.connection;
connection.on("connected", function() {
  console.log("connected to db");
});

var users = mongoose.model('users',{
    Name : String,
    Password :String ,
    Nick : String,
    Role : String,
})


var games = mongoose.model('games',{
    Name : String,
    Score :Number ,
    Nick : String,
    Time : Number,
})



app.get("/api/getgames", function (req, res) {
   
        games.find({
        // _id : url_parts.query.id,        
      },function (err, userData) {
        console.log(userData.length)

        if (err){ res.send(err);}
        else if(userData.length > 0){
        res.json({data :userData,status :'found'});
        }
        
       
        
      });
  
    })


    app.get("/api/getgames", function (req, res) {
   
      games.find({
      // _id : url_parts.query.id,        
    },function (err, userData) {
      console.log(userData.length)

      if (err){ res.send(err);}
      else if(userData.length > 0){
      res.json({data :userData,status :'found'});
      }
      
     
      
    });

  })


app.get("/api/getuser", function (req, res) {
    var url_parts = url.parse(req.url, true);
    console.log("roleName:"+ url_parts.query.id);
        users.find({
        _id : url_parts.query.id,        
      },function (err, userData) {
        //console.log(userData.length)

        if (err){ res.send(err);}
        else if(userData.length > 0){
        res.json({data :userData,status :'found'});
        }
        
       
        
      });
  
    })

    
app.post("/api/addgame", function (req, res) {
    console.log('444',req)
    
                games.create({
                  Name : req.body.name,
                  Nick :req.body.nick ,
                  Score : req.body.score,
                  Time : req.body.time
              },
              function (err, userData) {
                if (err) res.send(err);
                if(userData){
                  if(!err){
                      res.json({data :userData,status :'added'})
          
                  }
          }
            // get and return all the Offers after you create another
      
       
          })
         
        })
        
     

app.post("/api/adduser", function (req, res) {
    console.log('444',req)
    users.find({
        Name : req.body.name,
        Nick :req.body.nick ,
        Password : req.body.password,        
      },function (err, userData) {
        console.log(userData.length)

        if (err){ res.send(err);}
        else if(userData.length > 0){
        res.json({data :userData,status :'found'});
        }
        
            else{
   console.log(req.body)
                users.create({
                  Name : req.body.name,
                  Nick :req.body.nick ,
                  Password : req.body.password,
                  Role : req.body.role
              },
              function (err, userData) {
                if (err) res.send(err);
                if(userData){
                  if(!err){
                      res.json({data :userData,status :'added'})
          
                  }
          }
            // get and return all the Offers after you create another
      
       
          }
         );
        }
        
      });
  
    }
)








app.listen(3600, t =>{
    console.log("App listening on port 3600");
})