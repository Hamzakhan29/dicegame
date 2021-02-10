var express = require("express");
var app = express(); // create our app w/ express
var mongoose = require("mongoose");


var users = mongoose.model('susers',{
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

