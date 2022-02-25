const {GraphQLObjectType} = require("graphql");

const editProfile = require('./user/editProfile');
const editStatus = require('./user/editStatus');

const addPost = require('./post/add-post');
const likePost = require('./post/like-post')

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //----------USER----------
        editProfile,
        editStatus,
        //----------POST----------
        addPost,
        likePost,
    }
})

module.exports = Mutation;
