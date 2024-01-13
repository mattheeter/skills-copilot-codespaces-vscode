// Create web server

var express = require('express');
var router = express.Router();

var Comment = require('../models/comment');

// Get all comments
router.get('/', function(req, res) {
    Comment.find({}, function(err, comments) {
        res.json(comments);
    });
});

// Get one comment by id
router.get('/:id', function(req, res) {
    var id = req.params.id;
    Comment.findById(id, function(err, comment) {
        res.json(comment);
    });
});

// Create new comment
router.post('/', function(req, res) {
    var text = req.body.text;
    var author = req.body.author;
    var newComment = new Comment({text: text, author: author});
    newComment.save(function(err, comment) {
        res.json(comment);
    });
});

// Update comment
router.put('/:id', function(req, res) {
    var id = req.params.id;
    var text = req.body.text;
    var author = req.body.author;
    var updateComment = {text: text, author: author};
    Comment.findByIdAndUpdate(id, updateComment, function(err, comment) {
        res.json(comment);
    });
});

// Delete comment
router.delete('/:id', function(req, res) {
    var id = req.params.id;
    Comment.findByIdAndRemove(id, function(err, comment) {
        res.json(comment);
    });
});

module.exports = router;
