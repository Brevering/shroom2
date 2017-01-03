let encryption = require('../utilities/encryption');
let jwt = require('jwt-simple');
let users = require('../data/users');
let User = require('mongoose').model('User');
let config = require('../config/database');
let passport = require('passport');

function postRegister(req, res) {
    let newUserData = req.body;

    newUserData.salt = encryption.generateSalt();
    newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
    users.create(newUserData, function (err, user) {
        if (err) {
            return res.status(409).json({ success: false, msg: { code: err.code, message: err.message } });
        } else {
            return postAuthenticate(req, res);
        }
    });
}

function postAuthenticate(req, res) {

    console.log("Requested username for authentication -> " + req.body.username);
    console.log("Password -> " + req.body.password);

    User.findOne({ username: req.body.username },
        function (err, user) {

            if (err) {
                throw err;
            }

            if (!user) {
                res.status(401).send({ err: 'Authentication failed. User not found.' });
            } else {
                // check if password matches
                if (user.authenticate(req.body.password, user)) {
                    // if user is found and password is right create a token
                    let token = jwt.encode(user, config.secret);
                    // return the information including token as JSON
                    return res.json({ success: true, user: user, token: 'JWT ' + token });
                } else {
                    res.status(401).send({ err: 'Authentication failed. Wrong password.' });
                }
            }
        });
}
function getAll(req, res) {
    User.find({}, function (err, users) {
        if (err) {
            throw err;
        }

        if (!users.length) {
            res.status(401).send({ err: 'No users.' });
        } else {
            res.status(200).json(users);
        }
    });
}

function addToUserLikes(req, res) {
    let username = req.body.username;
    let post = req.body.post;

    // User.findOne({ username: username }, function (err, user) {
    //     if (err) {
    //         throw err;
    //     }
    //     user.likes.push(post)
    //     user.save(function (err, updatedUser) {
    //         if (err) {
    //             res.status(401).send({ err: 'Post not added to user likes' });
    //         } else {
    //             res.status(200).json({ data: updatedUser });
    //         }
    //     });
    // });

    User.update(
        { username: username },
        { $push: { likes: post } },
        function (err, updatedUser) {
            if (err) {
                res.status(401).send({ err: err });
            } else {
                res.status(200).json({ data: updatedUser });
            }
        });
}

function removeFromUserLikes(req, res) {
    let username = req.body.username;
    let post = req.body.post;
    // console.log(post._id);

    User.update(
        { username: username },
        { $pull: { likes: { _id: post._id } } },
        function (err, updatedUser) {
            if (err) {
                res.status(401).send({ err: err });
            } else {
                res.status(200).json({ data: updatedUser });
            }
        });
}

function ifLiked(req, res) {
    let username = req.query.user;
    let postId = req.query.postid;

    User.count({ likes: { $elemMatch: { _id: postId } } }, function (err, count) {
        if (err) {
            res.status(401).send({ err: err });
        } else {
            res.status(200).json({ data: count });
        }
    });

}

function addToUserPosts(req, res) {
    let username = req.body.username;
    let post = req.body.post;

    User.update(
        { username: username },
        { $push: { posts: post } },
        function (err, updatedUser) {
            if (err) {
                res.status(401).send({ err: err });
            } else {
                res.status(200).json({ data: updatedUser });
            }
        });
}

function removeFromUserPosts(req, res) {
    let username = req.body.username;
    let post = req.body.post;

    User.update(
        { username: username, "posts._id": post._id },
        { $set: { "posts.$.isDeleted": true } },
        function (err, updatedUser) {
            if (err) {
                res.status(401).send({ err: err });
            } else {
                res.status(200).json({ data: updatedUser });
            }
        });
}

function getUserInformation(req, res) {
    User.find({ username: req.params.username }, function (err, user) {
        if (!user.length) {
            throw Error('There is not such username');
        } else {
            console.log(user);
            res.status(200).json(user);
        }
    });
}


function updateUserProfile(req, res) {
    User.find({ username: req.params.username }, function (err, user) {
        if (!user.length)
            throw Error('There is not such username');
        else {
            user[0].firstName = req.body.firstName;
            user[0].lastName = req.body.lastName;
            user[0].save().then(res.send(user[0]));
        }
    });
};

function getLikes(req, res) {
    let username = req.query.user;

    User.findOne({ username: username, $where: "this.isDeleted === false" }, { likes: 1 }, function (err, userWithLikes) {
        if (err) {
            res.status(401).send({ err: err });
        } else {
            res.status(200).json({ data: userWithLikes });
        }
    });

}

function getPosts(req, res) {
    let username = req.query.user;

    User.aggregate(
        [
            { $match: { username: username } },
            {
                $project: {
                    posts: {
                        // $elemMatch: { $eq: ["$$post.isDeleted", false] }
                        $filter: { input: "$posts", as: "post", cond: { $eq: ["$$post.isDeleted", false] } }
                    }
                }
            }
        ],
        function (err, userWithPosts) {
            if (err) {
                res.status(401).send({ err: err });
            } else {
                res.status(200).json({ data: userWithPosts });
            }
        }
    );
}

function getCounts(req, res) {
    let username = req.query.user;

    User.aggregate(
        [
            { $match: { username: username } },
            {
                $project: {
                    likesCount: { $size: { $filter: { input: "$likes", as: "like", cond: { $eq: ["$$like.isDeleted", false] } } } },
                    postsCount: { $size: { $filter: { input: "$posts", as: "post", cond: { $eq: ["$$post.isDeleted", false] } } } },
                }
            }
        ],
        function (err, counts) {
            if (err) {
                res.status(401).send({ err: err });
            } else {
                res.status(200).json({ data: counts });
            }
        }
    );
}

module.exports = {
    postRegister,
    postAuthenticate,
    getAll,
    getUserInformation,
    updateUserProfile,

    addToUserLikes,
    removeFromUserLikes,
    ifLiked,
    addToUserPosts,
    removeFromUserPosts,
    getCounts,
    getLikes,
    getPosts
};
