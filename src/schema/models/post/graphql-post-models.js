const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID,} = require("graphql");
const MongooseLike = require('../like/mongoose-like-model');
const MongooseDislike = require('../dislike/mongoose-dislike-model');
const GraphQlLike = require('../like/graphql-like-models');
const GraphQlDislike = require('../dislike/graphql-dislike-models');


const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {type: GraphQLID},
        userId: {type: GraphQLID},
        date: {type: GraphQLString},
        content: {type: GraphQLString},
        likes: {
            type: new GraphQLList(GraphQlLike),
            async resolve(parent, args) {
                const response = await MongooseLike.findOne({userId: parent.userId})
                if(response)   return response.likes.filter(like => like.postId === parent.id)
            }
        },
        dislikes: {
            type: new GraphQLList(GraphQlDislike),
            async resolve(parent, args) {
                const response = await MongooseDislike.findOne({userId: parent.userId})
                if(response) return  response.dislikes.filter(dislike => dislike.postId === parent.id)
            }
        },
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
