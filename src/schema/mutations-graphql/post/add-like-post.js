const {
    GraphQLID,
} = require("graphql");
const {v4: uuidv4} = require('uuid');
const {pubSub} = require('../../subscriptions-graphql');
const NotificationService = require('../../../services/notification-service');
const GraphQlPost = require('../../models/post/graphql-post-models');
const MongoosePost = require('../../models/post/mongoose-post-models');
const MongooseUser = require('../../models/user/mongoose-user-models');
const MongooseAllLikes = require('../../models/like/mongoose-all-likes');
const moment = require("moment");


const likeParams = (userData, args) => {
    return {
        id: uuidv4(),
        date: moment().locale('ru').format('llll'),
        postId: args.postId,
        userId: userData._id,
        userName: userData.name,
        userLastName: userData.lastName,
        userAvatar: userData.avatar,
    }
}

const allLikesParams = (newLike, post) => {
    return {
        like: {
            id: newLike.id,
            date: newLike.date,
            userName: newLike.userName,
            userLastName: newLike.userLastName,
            userAvatar: newLike.userAvatar,
        },
        post: {
            date: post.date,
            content: post.content
        }
    }
}

const addLikePost = {
    type: GraphQlPost,
    args: {
        ownerId: {type: GraphQLID},
        postId: {type: GraphQLID},
        userId: {type: GraphQLID},
    },

    async resolve(parent, args) {
        const postsData = await MongoosePost.findOne({userId: args.ownerId})
        const userData = await MongooseUser.findById(args.userId)
        const allLikesData = await MongooseAllLikes.findOne({userId: args.ownerId})
        postsData.posts.filter(async (post) => {
            if (post.id === args.postId) {
                const newLike = likeParams(userData, args)
                post.likes.unshift(newLike)
                await pubSub.publish('newLike', {newLike: newLike})
                await NotificationService.addNotification(args.ownerId, args.userId, newLike, 'addLikePost')

                if (allLikesData) {
                    console.log('eee')
                    allLikesData.likes.unshift(allLikesParams(newLike, post))
                    await allLikesData.save()
                } else {
                    await MongooseAllLikes.create({
                        userId: args.ownerId,
                        likes: [allLikesParams(newLike, post)]
                    })
                }
            }
        })
        postsData.markModified(`posts`);
        await postsData.save()
        return postsData
    }
}

module.exports = addLikePost;
