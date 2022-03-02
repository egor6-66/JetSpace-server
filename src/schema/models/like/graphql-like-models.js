const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = require("graphql");


const LikeType = new GraphQLObjectType({
    name: 'Like',
    fields: () => ({
        id: {type: GraphQLID},
        date: {type: GraphQLString},
        postId: {type: GraphQLID},
        userId: {type: GraphQLID},
        userName: {type: GraphQLString},
        userLastName: {type: GraphQLString},
        userAvatar: {type: GraphQLString},
    })
})

module.exports = LikeType;
