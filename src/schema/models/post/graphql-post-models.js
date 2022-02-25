const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = require("graphql");
const GraphQlLike = require('../like/graphql-like-models');


const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {type: GraphQLID},
        date: {type: GraphQLString},
        time: {type: GraphQLString},
        content: {type: GraphQLString},
        likes: {type: new GraphQLList(GraphQlLike),
        }
    })
})

const PostsType = new GraphQLObjectType({
    name: 'Posts',
    fields: () => ({
        id: {type: GraphQLID},
        posts: {type: new GraphQLList(PostType)}
    })
})

module.exports = PostsType;