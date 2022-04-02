const Post = require('./post');
const Like = require('./like');
const Dislike = require('./dislike');
const Notification = require('./notification');
const Message = require('./message');
const Comment = require('./comment');
const UserTyping = require('./user-typing');

const SubModel = {
    Post,
    Comment,
    Like,
    Dislike,
    Notification,
    Message,
    UserTyping,
}

module.exports = SubModel;
