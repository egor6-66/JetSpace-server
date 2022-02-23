const {GraphQLObjectType} = require("graphql");

const getAllUsers = require('./user/get-all-users');
const getUser = require('./user/get-users');
const getAllUserImg = require('./user/get-all-user-img');
const getUserPosts = require('./post/get-user-posts')


const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getAllUsers,
        getUser,
        getAllUserImg,
        getUserPosts,
    }
})

module.exports = Query;
