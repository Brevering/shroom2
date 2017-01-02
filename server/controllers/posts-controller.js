let PostModel = require("mongoose").model("Post");

function get(req, res) {
    PostModel.find({ isDeleted: { $eq: false } }, function (err, posts) {
        if (err) {
            throw err;
        }
        if (!posts.length) {
            res.status(401).send({ err: 'No posts.' });
        } else {
            res.status(200).json({ data: posts });
        }
    });
}

function getById(req, res) {
    let id = req.params.id;

    PostModel.findById(id, function (err, post) {
        if (err) {
            throw err;
        }
        if (!post) {
            res.status(401).send({ err: 'No post.' });
        } else {
            res.status(200).json({ data: post });
        }
    });
}

function create(req, res) {
    let postData = req.body;

    //console.log(req.body);

    PostModel.create(postData, function (err, createdPost) {
        if (err) {
            return res.status(409).json({ success: false, msg: { code: err.code, message: err.message } });
        } else {
            return res.json({ success: true, data: createdPost });
        }
    });
}

function markAsDeleted(req, res) {
    let id = req.params.id;

    PostModel.findByIdAndUpdate(id, { $set: { isDeleted: true } }, function (err, updatedPost) {
        if (err) {
            return res.status(409).json({ success: false, msg: { code: err.code, message: err.message } });
        } else {
            // check for delete statuses(204 does not return result)
            return res.status(200).json({ success: true, data: updatedPost });
        }
    })
}

module.exports = {
    get,
    getById,
    create,
    markAsDeleted
}