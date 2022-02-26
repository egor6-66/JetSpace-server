const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLBoolean,
    GraphQLID,
    GraphQLString,
} = require("graphql");
const GraphQlNotification = require('../notification/graphql-notification-models');


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        name: {type: GraphQLString},
        lastName: {type: GraphQLString},
        status: {type: GraphQLString},
        age: {type: GraphQLString},
        avatar: {type: GraphQLString},
        isOnline: {type: GraphQLBoolean},
        isActivated: {type: GraphQLBoolean},
        activationLink: {type: GraphQLString},
    })
});

module.exports = UserType;
