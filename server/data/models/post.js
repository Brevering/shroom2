let mongoose = require("mongoose");

const typeOfArticles = ["text", "audio", "video", "image"];

// const youtubeLinksRegex = new RegExp("(?:https?://)?(?:www\.)?youtu(?:be\.com/watch\?(?:.*?&(?:amp;)?)?v=|\.be/)([\w\-]+)(?:&(?:amp;)?[\w\?=]*)?"); // regex for embeded link is needed
const imageLinkRegex = new RegExp("[a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif)");

let postSchema = mongoose.Schema({
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
        required: true,
        enum: typeOfArticles,
        default: "text"
    },
    videoLink: {
        type: String,
        required: false,
        // match: youtubeLinksRegex
    },
     audioLink: {
        type: String,
        required: false,
        // match: youtubeLinksRegex
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
        required: true
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false
    }
});

postSchema.set("timestamps", true);

postSchema.statics.seedData = function () {
    let posts = [
    {
        type: 'text',
        title: 'Some Lorem ipsum text',
        body: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
        from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
        looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites
        of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
        1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book
        is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem
        ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
        videoLink: '',
        imgLink: '',
        audioLink: '',
        category: 'Category1',
        author: 'stamat123',
        isDeleted: false
    },
    {
        type: 'image',
        title: 'Mist',
        body: ``,
        videoLink: '',
        imgLink: 'https://sqch7a.bn1.livefilestore.com/y2mQhke0z4fwS4BxUZt4w_OoDdcabx4BYzyuFREy9bR4xTf5NwThEAY90CZZ4cuo58gycqIcuPcjA9ERhA0WFt240pkNZz0eCOgWB4KjNs0AwXadZtbt0KkNhlASknEZdWZ/left.jpg?psid=1',
        audioLink: '',
        category: 'Category3',
        author: 'stamat123',
        isDeleted: false
    },
    {
        type: 'audio',
        title: 'Testing sound from SoundCloud',
        body: ``,
        videoLink: '',
        imgLink: '',
        audioLink: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/267651269&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true',
        category: 'Category15',
        author: 'polly',
        isDeleted: false
    },
    {
        type: 'video',
        title: 'Testing video from Youtube',
        body: ``,
        videoLink: 'https://www.youtube.com/embed/v4ASLMfrCRw',
        imgLink: '',
        audioLink: '',
        category: 'Category4',
        author: 'polly',
        isDeleted: false
    },
    {
        type: 'text',
        title: 'Another attempt for text',
        body: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature
        from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
        looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites
        of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
        1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book
        is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem
        ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
        videoLink: '',
        imgLink: '',
        audioLink: '',
        category: 'Category24',
        author: 'pesho',
        isDeleted: false
    },
    {
        type: 'video',
        title: 'Testing video from Vimeo',
        body: ``,
        videoLink: 'https://player.vimeo.com/video/196103067',
        imgLink: '',
        audioLink: '',
        category: 'Category4',
        author: 'pesho',
        isDeleted: false
    },
    {
        type: 'image',
        title: `Last image for testing`,
        videoLink: '',
        imgLink: 'https://v44yjg.bn1.livefilestore.com/y2mJbDGWaiXVUYIuQFClcZTgPi3LoHhz73v7d10gKP5YyCittOTtCvyK0p0qWujnxiS7-I7ZDpBS3qEnxU4SJ1CmoEelyD7a8ZHrPTUqXuNtg01larXGCS-I1TX2G8v8UtU/island_tatt.jpg?psid=1',
        audioLink: '',
        category: 'Category2',
        author: 'gosho',
        isDeleted: false
    }
];

    this.insertMany(posts, function(error, docs) {
        if (error) {
            console.log(error);
        } else {
            console.log(`${docs.length} objects seeded to database`);
        }
    });

};

mongoose.model("Post", postSchema);
let PostModel = mongoose.model("Post");
//PostModel.seedData();

module.exports = PostModel;

