const {GraphQLObjectType} = require("graphql");

const getAllUsers = require('./get-all-users');
const getUser = require('./get-users');
const getAllUserImg = require('./get-all-user-img');

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getAllUsers,
        getUser,
        getAllUserImg,
    }
})

module.exports = Query;
