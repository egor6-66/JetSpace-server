const {GraphQLObjectType} = require("graphql");

const editProfile = require('./user/edit-profile');
const editStatus = require('./user/edit-status');
const editAvatar = require('./user/edit-avatar');
const removePhoto = require('./user/remove-photo');
const addPost = require('./post/add-post');
const removePost = require('./post/remove-post');
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
        editAvatar,
        removePhoto,
        addPost,
        removePost,
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
