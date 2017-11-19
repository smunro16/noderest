var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db=mongoose.connect('mongodb://smunro16:<pwd>@cluster0-shard-00-00-gzjjw.mongodb.net:27017,cluster0-shard-00-01-gzjjw.mongodb.net:27017,cluster0-shard-00-02-gzjjw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

var Book=require('./models/bookModels.js');

var app = express();
var port = process.env.PORT||3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var bookRouter = express.Router();


bookRouter.route('/Books')
    .post(function(req, res){
        var book = new Book(req.body);
        book.save();
        res.status(201).send(book);
    })
    .get(function(req, res){

        var query = {};

        if (req.query.genre){
            query.genre=req.query.genre;
        }

        Book.find(query, function(err, books){
            if(err)
                res.status(500).send(err);
            else
                res.json(books);
        });
        // res.json(responseJson);
    });

bookRouter.route('/Books/:bookId')
    .get(function(req, res){
        Book.findById(req.params.bookId, function(err, book){
            if(err)
                res.status(500).send(err);
            else
                res.json(book);
        });
        // res.json(responseJson);
    });

app.use('/api', bookRouter);


app.get('/', function(req, res){
    res.send('welcome to myApp!!!');
});

app.get('/scott', function(req, res){
    res.send('welcome to myApp!!! scott');
});

app.listen(port, function(){
    console.log('Gulp is running on port ' + port)
});