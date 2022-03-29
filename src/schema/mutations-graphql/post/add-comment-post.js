const {GraphQLID, GraphQLString,} = require("graphql");
const {MongooseModels, GraphQlModels, ParamsModels} = require('../../models')
// const {NotificationService} = require('../../../services')
const {pubSub} = require('../../subscriptions-graphql');


const addCommentPost = {
    type: GraphQlModels.Post,
    args: {
        ownerId: {type: GraphQLID},
        postId: {type: GraphQLID},
        userId: {type: GraphQLID},
        content: {type: GraphQLString}
    },

    async resolve(parent, args) {
        const postsData = await MongooseModels.Post.findOne({userId: args.ownerId})
        const userData = await MongooseModels.User.findById(args.userId)
        const newComment = ParamsModels.Comment(userData,args)
        const updatePost = postsData.posts.find(post => post.id === args.postId)
        updatePost.comments.push(newComment)
        await postsData.markModified('posts')
        await postsData.save()
        await pubSub.publish('newComment', {newComment: newComment})
        // await NotificationService.addNotification(args.ownerId, args.userId, newLike, 'addLikePost')
        return postsData
    }
}

module.exports = addCommentPost;
