const {GraphQLObjectType} = require("graphql");

const editProfile = require('./user/editProfile');
const editStatus = require('./user/editStatus');
const addPost = require('./post/add-post');
const addLikePost = require('./like/add-like-post');
const addDislikePost = require('./dislike/add-dislike-post');
const addMessage = require('./message/add-message');
const addVideo = require('./video/add-video');
const addSound = require('./sound/add-sound');


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
    }
})

module.exports = Mutation;
