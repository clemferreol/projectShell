var mongoose = require('mongoose');
var faker = require ('faker');
var User = require('../models/user');
var Post = require('../models/post');
//var Comment = require ('../models/comment');


mongoose.connect('mongodb://localhost/blogmean', function(err){
    if (err) { throw err;}
});

var userArray = [];
var postArray = [];

//CreateUser


for(var j = 0; j< 5; j++) {
    var user = new User ({
        username: faker.internet.userName(),
        password: faker.internet.password(),
        profileImageUrl: faker.image.imageUrl(),
        updated: faker.date.recent(),
        saved: faker.date.recent()
    });
    userArray.push(user);

//Envois user Bdd
    user.save(function (err) {
        if (err) { throw err; }
        console.log('User ajout? avec succ?s !');
    });
}

//On pioche dans le tableau un objectId de user aléatoire;

var pickRandomUser = function () {
    var pickUser = userArray[Math.floor(Math.random() * 4)];
    return pickUser;

};

//On génère les Post en prenant aléatoirement les ObjectId dans le tableau qu'on associera à un name : string sans nos views

for(var i = 0; i < 21;i++){
    var post = new Post({
        id: 0,
        title : faker.lorem.sentence(),
        imageUrl : faker.image.imageUrl(),
        content : faker.lorem.sentence(),
        created : faker.date.recent(),
        comments: [],
        user : pickRandomUser()._id

    });
   // console.log(post);
    postArray.push(post);

    //Save Post en bdd
console.log(post);
    post.save(function (err) {
        if (err) { throw err; }
        console.log('post add with success');
    });
}
console.log(post);

//fonction de Random

var randomComment = function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};
