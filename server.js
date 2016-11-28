var express  = require('express'),
    mongoose = require('mongoose'),
    jwt      = require('jsonwebtoken'),
    login    = require('./routes/login'),
    users    = require('./routes/api/user'),
    posts    = require('./routes/api/post'),
    app      = express();


mongoose.connect('mongodb://' + 'localhost'+ ':' + '27017' +'/myBlog');

app
    .use(express.static('./public'))
    .use('/', login)
    .use('/api', users)
    .use('/api', posts)
    .listen(3000);
