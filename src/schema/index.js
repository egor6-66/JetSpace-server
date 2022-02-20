const {GraphQLSchema} = require("graphql");
const Query = require('./queries-graphql');



module.exports = new GraphQLSchema({
    query: Query,
})