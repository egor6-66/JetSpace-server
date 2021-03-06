const {GraphQLObjectType} = require("graphql");

const getAllUsers = require('./user/get-all-users');
const getUser = require('./user/get-users');
const getAllUserImg = require('./image/get-all-user-img');
const getAllLikes = require('./like/get-all-likes');
const getAllDislikes = require('./dislike/get-all-dislikes')
const getUserPosts = require('./post/get-user-posts');
const getNotifications = require('./notification/get-notification');
const getNotificationsSub = require('./notification/get-notification-sub');
const getMessages = require('./message/get-messages');
const getAllDialogs = require('./message/get-all-dialogs');
const getAllUserSounds = require('./sound/get-all-user-sounds');
const getAllUserVideos = require('./video/get-all-user-videos');
const getAllSubscribers = require('./followers/get-allsubscribers');
const getAllSubscriptions = require('./followers/get-allsubscriptions');

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getAllUsers,
        getUser,
        getAllUserImg,
        getAllDialogs,
        getAllLikes,
        getAllDislikes,
        getMessages,
        getUserPosts,
        getNotifications,
        getNotificationsSub,
        getAllUserSounds,
        getAllUserVideos,
        getAllSubscribers,
        getAllSubscriptions,
    }
})

module.exports = Query;
