const {GraphQLID,} = require("graphql");
const {MongooseModels, GraphQlModels, ParamsModels} = require('../../models')
const {NotificationService} = require('../../../services')
const {pubSub} = require('../../subscriptions-graphql');


const addLikePost = {
    type: GraphQlModels.Post,
    args: {
        ownerId: {type: GraphQLID},
        postId: {type: GraphQLID},
        userId: {type: GraphQLID},
    },

    async resolve(parent, args) {
        const userData = await MongooseModels.User.findById(args.userId)
        const ownerData = await MongooseModels.User.findById(args.ownerId)
        const postsData = await MongooseModels.Post.findOne({userId: args.ownerId})
        const newLike = ParamsModels.Like(args)
        const updatePost = postsData.posts.find(post => post.id === args.postId)
        const isLike = updatePost.likes.find(like => like.userId === args.userId)
        updatePost.dislikes.length && updatePost.dislikes.forEach((dislike, index) => {
            if (dislike.userId === args.userId) {
                updatePost.dislikes.splice(index, 1)
                ownerData.dislikeCounter = +ownerData.likeCounter - 1
            }
        })
        if (!isLike) {
            updatePost.likes.unshift(newLike)
            ownerData.likeCounter = +ownerData.likeCounter + 1
            await pubSub.publish('newLike', {newLike: newLike})
        }
        postsData.markModified('posts')
        await postsData.save()
        await ownerData.save()
        // await NotificationService.addNotification(args.ownerId, args.userId, newLike, 'addLikePost')
        return postsData
    }
}

module.exports = addLikePost;
