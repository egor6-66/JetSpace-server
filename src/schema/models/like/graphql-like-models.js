const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = require("graphql");


const LikeType = new GraphQLObjectType({
    name: 'Like',
    fields: () => ({
        id: {type: GraphQLID},
        userId: {type: GraphQLID},
        name: {type: GraphQLString},
        lastName: {type: GraphQLString},
    })
})

module.exports = LikeType;

