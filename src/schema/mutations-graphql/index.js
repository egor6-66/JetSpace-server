const {GraphQLObjectType} = require("graphql");

const editProfile = require('./user/editProfile');
const editStatus = require('./user/editStatus');
const addPost = require('./post/add-post');
const addCommentPost = require('./post/add-comment-post');
const addLikePost = require('./post/add-like-post');
const addDislikePost = require('./post/add-dislike-post');
const addMessage = require('./message/add-message');
const setMessageLocation = require('./message/set-message-location');
const userTyping = require('./message/user-typing');
const addVideo = require('./video/add-video');
const addSound = require('./sound/add-sound');
const removeSound = require('./sound/remove-sound');
const follow = require('./follow/follow');
const unfollow = require('./follow/unfollow');
const clearNotifications = require('./notification/clear-notifications');


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        editProfile,
        editStatus,
        addPost,
        addCommentPost,
        addLikePost,
        addDislikePost,
        addMessage,
        setMessageLocation,
        userTyping,
        addVideo,
        addSound,
        removeSound,
        follow,
        unfollow,
        clearNotifications,
    }
})

module.exports = Mutation;
