const {
    GraphQLID,
} = require("graphql");
const {NotificationService} = require('../../../services')
const {MongooseModels, GraphQlModels, ParamsModels} = require("../../models");
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
        const postsData = await MongooseModels.Post.findOne({userId: args.ownerId})
        const dislikesData = await MongooseModels.Dislike.findOne({userId: args.ownerId})
        const likesData = await MongooseModels.Like.findOne({userId: args.ownerId})
        const newDislike = ParamsModels.Dislike(userData, args)

        if(likesData){
            const isLikeIndex = likesData.likes.findIndex(
                like => like.postId === args.postId && like.userId === args.userId)

            isLikeIndex !== -1 && likesData.likes.splice(isLikeIndex, 1)
            likesData.save()
        }
        if (dislikesData) {
            const isDislikeIndex = dislikesData.dislikes.findIndex(
                dislike => dislike.postId === args.postId && dislike.userId === args.userId)

            if(isDislikeIndex === -1){
                dislikesData.dislikes.unshift(newDislike)
                await dislikesData.save()
                await pubSub.publish('newDislike', {newDislike: newDislike})
            }
        } else {
            await MongooseModels.Dislike.create({
                userId: args.ownerId,
                dislikes: [newDislike],
            })
            await pubSub.publish('newDislike', {newDislike: newDislike})
        }

        // await NotificationService.addNotification(args.ownerId, args.userId, newLike, 'addLikePost')
        return postsData.posts.map(post => post.id === args.postId)
    }
}

module.exports = addDislikePost;
