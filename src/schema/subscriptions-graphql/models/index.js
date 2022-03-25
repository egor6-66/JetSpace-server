const Post = require('./post');
const Like = require('./like');
const Dislike = require('./dislike');
const Notification = require('./notification');
const Message = require('./message');
const Comment = require('./comment');


const SubModel = {
    Post,
    Comment,
    Like,
    Dislike,
    Notification,
    Message,
}

module.exports = SubModel;
