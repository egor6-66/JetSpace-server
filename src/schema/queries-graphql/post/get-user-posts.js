const {GraphQLID} = require("graphql");
const {MongooseModels, GraphQlModels} = require('../../models')

const getUserPosts = {
    type: GraphQlModels.Post,
    args: {userId: {type: GraphQLID}},
    async resolve(parent, args) {
        const postsData = await MongooseModels.Post.findOne({userId: args.userId})
        if (postsData) {
            for await (let post of postsData.posts) {
                if (post.comments.length) {
                    for await (let comment of post.comments) {
                        const userData = await MongooseModels.User.findById(comment.userId)
                        comment.userName = userData.name
                        comment.userLastName = userData.lastName
                        comment.userAvatar = userData.avatar
                    }
                }
            }
            await postsData.markModified('posts')
            await postsData.save()
            return MongooseModels.Post.findOne({userId: args.userId})
        }


    }
};

module.exports = getUserPosts;
