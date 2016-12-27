"use strict";

let mongoose = require("mongoose");

let newsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    imgLink: {
        type: String,
        trim: true,
        set: value => {
            if (value.length === 0) {
                return "/static/images/bojokogybi1.png";
            }
            return value;
        }
    },
    meta: {
        likes: Number,
        dislikes: Number,
        tags: [{
            _id: mongoose.Schema.Types.ObjectId,
            name: String
        }]
    },
    comments: [{}]
});
newsSchema.set("collection", "News");
newsSchema.set("timestamps", true);

mongoose.model("News", newsSchema);
let newsModel = mongoose.model("News");

module.exports = newsModel;

