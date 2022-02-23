const {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLID,
    GraphQLString,
} = require("graphql");


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        isOnline: {type: GraphQLBoolean},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        name: {type: GraphQLString},
        lastName: {type: GraphQLString},
        status: {type: GraphQLString},
        age: {type: GraphQLString},
        avatar: {type: GraphQLString},
        isActivated: {type: GraphQLBoolean},
        activationLink: {type: GraphQLString},
    })
});

module.exports = UserType;
