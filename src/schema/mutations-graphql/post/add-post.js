const {GraphQLID, GraphQLString,} = require("graphql");
const {MongooseModels, GraphQlModels, ParamsModels,} = require('../../models')
const {pubSub} = require("../../subscriptions-graphql");


const addPost = {
    type: GraphQlModels.Post,
    args: {
        userId: {type: GraphQLID},
        content: {type: GraphQLString},
    },
    async resolve(parent, args) {
        const response = await MongooseModels.Post.findOne({userId: args.userId})
        const newPost = ParamsModels.Post(args)

        if (response) {
            response.posts.unshift(newPost)
            await response.save()
        } else {
            await MongooseModels.Post.create({
                userId: args.userId,
                posts: [newPost]
            })
        }
        await pubSub.publish('newPost', {newPost: newPost})
        return response
    }
}

module.exports = addPost;
