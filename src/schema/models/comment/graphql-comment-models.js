const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = require("graphql");


const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        id: {type: GraphQLID},
        date: {type: GraphQLString},
        postId: {type: GraphQLID},
        userId: {type: GraphQLID},
        content: {type: GraphQLString},
        userName: {type: GraphQLString},
        userLastName: {type: GraphQLString},
        userAvatar: {type: GraphQLString},
    })
})

module.exports = CommentType;
