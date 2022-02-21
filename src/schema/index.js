const {GraphQLSchema} = require("graphql");
const Query = require('./queries-graphql');
const Mutation = require('./mutations-graphql')


module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
