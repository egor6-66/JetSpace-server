const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = require("graphql");


const allDislikesType = new GraphQLObjectType({
    name: 'AllDislikes',
    fields: () => ({
        id: {type: GraphQLString},
        date: {type: GraphQLString},
        postId: {type: GraphQLString},
        userId: {type: GraphQLString},
        userName: {type: GraphQLString},
        userLastName: {type: GraphQLString},
        userAvatar: {type: GraphQLString},
        content: {type: GraphQLString},
        contentDate: {type: GraphQLString},
    })
})

module.exports = allDislikesType;
