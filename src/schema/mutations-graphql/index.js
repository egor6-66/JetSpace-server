const {GraphQLObjectType} = require("graphql");

const editProfile = require('./user/editProfile');
const editStatus = require('./user/editStatus');
const addPost = require('./post/add-post');
const addLikePost = require('./post/add-like-post');
const addDislikePost = require('./post/add-dislike-post');
const addMessage = require('./message/add-message');
const addVideo = require('./video/add-video');
const addSound = require('./sound/add-sound');
const follow = require('./follow/follow')
const unfollow = require('./follow/unfollow')

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        editProfile,
        editStatus,
        addPost,
        addLikePost,
        addDislikePost,
        addMessage,
        addVideo,
        addSound,
        follow,
        unfollow,
    }
})

module.exports = Mutation;
