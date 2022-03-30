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
        const ownerData = await MongooseModels.User.findById(args.ownerId)
        const postsData = await MongooseModels.Post.findOne({userId: args.ownerId})
        const newDislike = ParamsModels.Dislike(args)
        const updatePost = postsData.posts.find(post => post.id === args.postId)
        const isDislike = updatePost.dislikes.find(dislike => dislike.userId === args.userId)
        updatePost.likes.length && updatePost.likes.forEach((like, index) => {
            if (like.userId === args.userId) {
                updatePost.likes.splice(index, 1)
            }
        })
        if (!isDislike) {
            updatePost.dislikes.unshift(newDislike)
            if(ownerData.id !== args.userId){
                const newNotification = ParamsModels.Notification(args, 'add-dislike-post', updatePost)
                ownerData.notifications.unshift(newNotification)
                await pubSub.publish('newNotification', {newNotification: newNotification})
            }
            await pubSub.publish('newDislike', {newDislike: newDislike})
        }
        postsData.markModified('posts')
        await postsData.save()
        await ownerData.save()
        return postsData
    }
}

module.exports = addDislikePost;
