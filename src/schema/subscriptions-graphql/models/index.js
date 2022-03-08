const Post = require('./post');
const Like = require('./like');
const Dislike = require('./dislike');
const Notification = require('./notification');
const Message = require('./message');

const SubModel = {
    Post,
    Like,
    Dislike,
    Notification,
    Message,
}

module.exports = SubModel;
