const {GraphQLObjectType} = require("graphql");

const editProfile = require('./user/editProfile');
const editStatus = require('./user/editStatus');

const addPost = require('./post/add-post');
const addLikePost = require('./post/add-like-post')

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //----------USER----------
        editProfile,
        editStatus,
        //----------POST----------
        addPost,
        addLikePost,
    }
})

module.exports = Mutation;
