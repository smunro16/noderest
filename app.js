var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db=mongoose.connect('mongodb://smunro16:<pwd>@cluster0-shard-00-00-gzjjw.mongodb.net:27017,cluster0-shard-00-01-gzjjw.mongodb.net:27017,cluster0-shard-00-02-gzjjw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

var Book=require('./models/bookModels.js');

var app = express();
var port = process.env.PORT||3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter=require('./Routes/bookRoutes')(Book)
app.use('/api/books', bookRouter);
// app.use('/api/authors', authorRouter);


app.get('/', function(req, res){
    res.send('welcome to myApp!!!');
});

app.listen(port, function(){
    console.log('Gulp is running on port ' + port)
});