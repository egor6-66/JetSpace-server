const {
    GraphQLID,
    GraphQLString,
} = require("graphql");
const {v4: uuidv4} = require('uuid');
const moment = require('moment')
const {pubSub} = require("../../subscriptions-graphql");
const GraphQlPost = require('../../models/post/graphql-post-models');
const MongoosePost = require('../../models/post/mongoose-post-models');


const postParams = (parentId, dateNow, args) => {
    return {
        parentId: parentId,
        id: uuidv4(),
        date: dateNow,
        content: args.content,
        likes: []
    }
}

const addPost = {
    type: GraphQlPost,
    args: {
        userId: {type: GraphQLID},
        content: {type: GraphQLString},
    },
    async resolve(parent, args) {
        const dateNow = moment().locale('ru').format('llll')
        const postsData = await MongoosePost.findOne({userId: args.userId})
        if (postsData) {
            postsData.posts.unshift(postParams(postsData._id,dateNow, args))
            await postsData.save()
            await pubSub.publish('newPost', {newPost: postsData.posts[0]})
            return postsData
        } else {
            const newPosts = await MongoosePost.create({userId: args.userId})
            newPosts.posts.unshift(postParams(newPosts._id, dateNow, args))
            await newPosts.save()
            await pubSub.publish('newPost', {newPost: newPosts.posts[0]})
            return newPosts
        }
    }
}

module.exports = addPost;
