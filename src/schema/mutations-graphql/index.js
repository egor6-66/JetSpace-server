const {GraphQLObjectType} = require("graphql");

const editProfile = require('./user/editProfile');
const editStatus = require('./user/editStatus');
const addPost = require('./post/add-post');
const addLikePost = require('./like/add-like-post');
const addDislikePost = require('./dislike/add-dislike-post');

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        editProfile,
        editStatus,
        addPost,
        addLikePost,
        addDislikePost,
    }
})

module.exports = Mutation;
