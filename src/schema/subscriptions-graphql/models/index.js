const Post = require('./post');
const Like = require('./like');
const Dislike = require('./dislike');
const Notification = require('./notification');


const SubModel = {
    Post,
    Like,
    Dislike,
    Notification,
}

module.exports = SubModel;
