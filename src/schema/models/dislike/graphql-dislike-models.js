const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = require("graphql");


const DislikeType = new GraphQLObjectType({
    name: 'Dislike',
    fields: () => ({
        id: {type: GraphQLID},
        date: {type: GraphQLString},
        postId: {type: GraphQLID},
        userId: {type: GraphQLID},
    })
})

module.exports = DislikeType;
