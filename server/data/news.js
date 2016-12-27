const News = require('mongoose').model('News');

module.exports = {
    create: function (news, callback) {
        News.create(news, callback);
    }
}