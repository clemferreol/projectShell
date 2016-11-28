var express    = require('express'),
    bodyParser = require('body-parser'),
    expressJWT = require('express-jwt'),
    User      = require('../../models/user'),
    router     = express.Router();

router
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(bodyParser.json())
    .use(expressJWT({secret: 'notSoSecret'}))
    .route('/user')
        .get(function (req, res) {
             User.find({}, function (err, data) {
                if (err) throw new Error(err);
                res.json(data);
            });
        });

router
    .param('id', function (req, res, next) {
        req.dbQuery = { id: parseInt(req.params.id, 10) };
        next();
    })
    .route('/user/:id')
        .get(function (req, res) {
            User.findOne(req.dbQuery, function (err, data) {
                if (err) throw new Error(err);
                res.json(data);
            });
        });

module.exports = router;