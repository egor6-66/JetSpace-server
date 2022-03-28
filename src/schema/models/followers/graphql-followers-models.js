const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = require("graphql");


const followersType = new GraphQLObjectType({
    name: 'Followers',
    fields: () => ({
        id: {type: GraphQLString},
        userId: {type: GraphQLString},
        userName: {type: GraphQLString},
        userLastName: {type: GraphQLString},
        userAvatar: {type: GraphQLString},
        dateSub: {type: GraphQLString},
    })
})

module.exports = followersType;
