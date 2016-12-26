let News = require("mongoose").model("News");

function GetAllNews(req, res) {
    News.find({}, function (err, news) {
        if (err) {
            throw err;
        }
        if (!news.length) {
            res.status(401).send({ err: 'No news.' });
        } else {
            res.status(200).json(news);
        }
    });
}

module.exports = {
    GetAllNews
}