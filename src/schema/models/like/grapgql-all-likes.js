const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID, GraphQLList,
} = require("graphql");

const likeItem = new GraphQLObjectType({
    name: 'likeItem',
    fields: () => ({
        id: {type: GraphQLID},
        date: {type: GraphQLString},
        userName: {type: GraphQLString},
        userLastName: {type: GraphQLString},
        userAvatar: {type: GraphQLString},
    })
})
const postItem = new GraphQLObjectType({
    name: 'postItem',
    fields: () => ({
        date: {type: GraphQLString},
        content: {type: GraphQLString},
    })
})


const AllLikesType = new GraphQLObjectType({
    name: 'AllLikes',
    fields: () => ({
        like: {type: likeItem},
        post: {type: postItem}
    })
})

module.exports = AllLikesType;
