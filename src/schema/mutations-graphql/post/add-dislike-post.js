const {GraphQLID,} = require("graphql");
const {MongooseModels, GraphQlModels, ParamsModels} = require('../../models')
const {NotificationService} = require('../../../services')
const {pubSub} = require('../../subscriptions-graphql');


const addDislikePost = {
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
        const newDislike = ParamsModels.Dislike(userData, args)
        const updatePost = postsData.posts.find(post => post.id === args.postId)
        const isDislike = updatePost.dislikes.find(dislike => dislike.userId === args.userId)
        updatePost.likes.length && updatePost.likes.forEach((like, index) => {
            if (like.userId === args.userId) {
                updatePost.likes.splice(index, 1)
                ownerData.likeCounter = +ownerData.likeCounter - 1
            }
        })
        if (!isDislike) {
            updatePost.dislikes.unshift(newDislike)
            ownerData.dislikeCounter = +ownerData.dislikeCounter + 1
            await pubSub.publish('newDislike', {newDislike: newDislike})
        }
        postsData.markModified('posts')
        await postsData.save()
        await ownerData.save()
        // await NotificationService.addNotification(args.ownerId, args.userId, newLike, 'addLikePost')
        return postsData
    }
}

module.exports = addDislikePost;
