const {GraphQLID} = require("graphql");
const {MongooseModels, GraphQlModels} = require('../../models')


const removePost = {
    type: GraphQlModels.Post,
    args: {
        userId: {type: GraphQLID},
        postId: {type: GraphQLID},
    },
    async resolve(parent, args) {
        const postsData = await MongooseModels.Post.findOne({userId: args.userId})
        postsData.posts.forEach((post, index) => {
            post.id === args.postId && postsData.posts.splice(index, 1)
        })
        postsData.save()
        return postsData
    }
}

module.exports = removePost;
