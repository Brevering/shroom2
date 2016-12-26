const mongoose = require('mongoose');

module.exports.init = function () {
    let newsSchema = mongoose.Schema({
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            mexlength: 60
        },
        body: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            mexlength: 5000
        },
        category: {
            _id: mongoose.Schema.Types.ObjectId,
            name: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 20
            }
        },
        author: {
            _id: mongoose.Schema.Types.ObjectId,
            username: {
                type: String,
                required: true,
                trim: true,
                minlength: 2,
                maxlength: 30
            }
        }
    });

    let NewsModel = mongoose.model('News', newsSchema);
}