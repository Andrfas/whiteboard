/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
        Post.create({
            title: req.param('title'),
            text: req.param('text')
        }, function(err, post) {
            res.json({
                id:post.id
            })
        })
    }
};

