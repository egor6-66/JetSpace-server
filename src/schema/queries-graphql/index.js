const {GraphQLObjectType} = require("graphql");

const getAllUsers = require('./user/get-all-users');
const getUser = require('./user/get-users');
const getAllUserImg = require('./user/get-all-user-img');
const getAllLikes = require('./like/get-all-likes');
const getUserPosts = require('./post/get-user-posts');
const getNotifications = require('./notification/get-notification');
const getMessages = require('./message/get-messages');
const getAllDialogs = require('./message/get-all-dialogs')


const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getAllUsers,
        getUser,
        getAllUserImg,
        getAllDialogs,
        // getAllLikes,
        getMessages,
        getUserPosts,
        getNotifications,
    }
})

module.exports = Query;
