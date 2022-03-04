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
        const postsData = await MongooseModels.Post.findOne({userId: args.ownerId})
        const likesData = await MongooseModels.Like.findOne({userId: args.ownerId})
        const newLike = ParamsModels.Like(userData, args)

        if (likesData) {
            const isLikeIndex = likesData.likes.findIndex(like => like.postId === args.postId && like.userId === args.userId)
            if(isLikeIndex === -1){
                likesData.likes.unshift(newLike)
                await likesData.save()
                await pubSub.publish('newLike', {newLike: newLike})
            }
        } else {
            await MongooseModels.Like.create({
                userId: args.ownerId,
                likes: [newLike],
            })
            await pubSub.publish('newLike', {newLike: newLike})
        }

        await NotificationService.addNotification(args.ownerId, args.userId, newLike, 'addLikePost')
        return postsData.posts.map(post => post.id === args.postId)
    }
}

module.exports = addLikePost;
