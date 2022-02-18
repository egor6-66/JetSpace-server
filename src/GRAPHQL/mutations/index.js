const {GraphQLObjectType, GraphQLList, GraphQLID} = require("graphql");
const UserType = require("../types/user-type");
const Users = require("../../models/user-model");


const Mutation= new GraphQLObjectType({
    name: 'Mutation',
    fields: {

    }
})

module.exports = Query;