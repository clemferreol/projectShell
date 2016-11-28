var express    = require('express'),
    bodyParser = require('body-parser'),
    expressJWT = require('express-jwt'),
    Post       = require('../../models/post'),
    User       = require('../../models/user'),
    router     = express.Router();

router
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(expressJWT({secret: 'notSoSecret'}))
    .route('/post')
        .get(function (req, res) {
          console.log(req.query.page);
            var selectedPosts;
            Post.find({}, {comments: false})
            .sort({'created': -1})
            .skip((req.query.page - 1) * 4)
            .limit(4)
            .then(function(posts) {
                res.status(200).json(posts);
            })
        })
        .post(function (req, res) {
            var post = req.body;
            post.userId = req.user.id;

            Post.insert(post, function (err, post) {
                if (err) throw new Error(err);
                res.status(200).json(post);
            });
        });

router
    .param('id', function (req, res, next) {
        req.dbQuery = { id: parseInt(req.params.id, 10) };
        next();
    })
    .route('/post/:id')
        .get(function (req, res) {
            console.log(req.dbQuery);
            Post.findOne(req.dbQuery)
            .then(function(data) {
              console.log(data);
              res.status(200).json(data);
            });
        })
        .put(function (req, res) {
            var post = req.body;
            delete post.$promise;
            delete post.$resolved;
            Post.update(req.dbQuery, post).then(function (err, data) {
                res.status(200).json(data[0]);
            });
        })
        .delete(function (req, res) {
            Post.delete(req.dbQuery, function (err, data) {
                if (err) throw new Error(err);
                res.status(200).json(null);
            });
        });

module.exports = router;
