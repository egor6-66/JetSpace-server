const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID,} = require("graphql");
const GraphQlLike = require('../like/graphql-like-models');
const GraphQlDislike = require('../dislike/graphql-dislike-models');


const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {type: GraphQLID},
        userId: {type: GraphQLID},
        date: {type: GraphQLString},
        content: {type: GraphQLString},
        likes: {type: new GraphQLList(GraphQlLike)},
        dislikes: {type: new GraphQLList(GraphQlDislike)},
    })
})

const PostsType = new GraphQLObjectType({
    name: 'Posts',
    fields: () => ({
        userId: {type: GraphQLID},
        posts: {type: new GraphQLList(PostType)}
    })
})


module.exports = PostsType;
