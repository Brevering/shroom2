let mongoose = require("mongoose");

const typeOfArticles = ["Text", "Audio", "Video", "Image"];

const youtubeLinksRegex = new RegExp("(?:https?://)?(?:www\.)?youtu(?:be\.com/watch\?(?:.*?&(?:amp;)?)?v=|\.be/)([\w\-]+)(?:&(?:amp;)?[\w\?=]*)?");
const imageLinkRegex = new RegExp("[a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif)");

let newsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false,
        enum: typeOfArticles,
        default: "Text"
    },
    youtubeLink: {
        type: String,
        required: false,
        match: youtubeLinksRegex
    },
    imgLink: {
        type: String,
        required: false,
        match: imageLinkRegex
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false
    }
});
newsSchema.set("collection", "News");
newsSchema.set("timestamps", true);

mongoose.model("News", newsSchema);
let newsModel = mongoose.model("News");

module.exports = newsModel;

