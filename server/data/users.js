const User = require('mongoose').model('User');

module.exports = {
    create: function (user, callback) {
        User.create(user, callback);
    },
    update: function (user, callback) {
        let query = { 'username': user.username };

        User.findOneAndUpdate(query, user, {
            new: true,
            upsert: false
        }, callback);
    },
    delete: function (username, callback) {
        User.findOneAndRemove({ username: username }, callback);
    }
};
