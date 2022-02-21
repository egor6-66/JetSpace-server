const {GraphQLObjectType} = require("graphql");

const getAllUsers = require('./get-all-users');
const getUser = require('./get-users');


const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getAllUsers,
        getUser,
    }
})

module.exports = Query;
