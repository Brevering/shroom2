let news = require("../data/news");
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
function createArticle(req, res) {
    let newsData = req.body;
    
    console.log(req.body);

    news.create(newsData, function (err, news) {
        if (err) {
            return res.status(409).json({ success: false, msg: { code: err.code, message: err.message } });
        } else {
            return res.json({success: true, news: news})
        }
    });
}

module.exports = {
    GetAllNews,
    createArticle
}