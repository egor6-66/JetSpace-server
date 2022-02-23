const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = require("graphql");

const LikeType = new GraphQLObjectType({
    name: 'Like',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        lastName: {type: GraphQLString},
    })
})


const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {type: GraphQLID},
        date: {type: GraphQLString},
        time: {type: GraphQLString},
        content: {type: GraphQLString},
        likes: {type: new GraphQLList(LikeType)}
    })
})

const PostsType = new GraphQLObjectType({
    name: 'Posts',
    fields: () => ({
        id: {type: GraphQLID},
        userName: {type: GraphQLString},
        userLastName: {type: GraphQLString},
        userAvatar: {type: GraphQLString},
        posts: {type: new GraphQLList(PostType)},
    })
});

module.exports = PostsType;
