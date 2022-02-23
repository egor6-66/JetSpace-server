const {
    GraphQLID,
    GraphQLString,
} = require("graphql");
const {v4: uuidv4} = require('uuid');
const GraphQlPost = require('../../models/post/graphql-post-models');
const MongoosePost = require('../../models/post/mongoose-post-models');

const likeParams = (args) => {
    return {
        id: uuidv4(),
        userId: args.userId,
        userName: args.userName,
        userLastName: args.userLastName,
    }
}

const likePost = {
    type: GraphQlPost,
    args: {
        ownersId: {type: GraphQLID},
        userId: {type: GraphQLID},
        userName: {type: GraphQLString},
        userLastName: {type: GraphQLString},
        // userAvatar: {type: GraphQLString},
        postId: {type: GraphQLID},
    },
    async resolve(parent, args) {
        const postsData = await MongoosePost.findOne({id: args.ownersId})
        postsData.posts.filter(async (post) => {
            if (post.id === args.postId) {
                post.likes.unshift(likeParams(args))
            }
        })
        postsData.markModified(`posts`);
        await postsData.save()
        return postsData
    }
}

module.exports = likePost;
