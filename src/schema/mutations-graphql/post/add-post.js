const {
    GraphQLID,
    GraphQLString,
} = require("graphql");
const {v4: uuidv4} = require('uuid');
const {pubSub} = require("../../subscriptions-graphql");
const GraphQlPost = require('../../models/post/graphql-post-models');
const MongoosePost = require('../../models/post/mongoose-post-models');


const postParams = (dateNow, args) => {
    return {
        id: uuidv4(),
        date: dateNow.toLocaleDateString(),
        time: dateNow.toLocaleTimeString().slice(0, -3),
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
        const dateNow = new Date();
        const postsData = await MongoosePost.findOne({userId: args.userId})
        if (postsData) {
            postsData.posts.unshift(postParams(dateNow, args))
            await postsData.save()
            await pubSub.publish('newPost', {newPost: postsData.posts[0]})
            return postsData
        } else {
            const newPosts = await MongoosePost.create({
                userId: args.userId,
                posts: [postParams(dateNow, args)],
            })
            await pubSub.publish('newPost', {
                newPost: newPosts.posts[0]
            })
            return newPosts
        }
    }
}

module.exports = addPost;
