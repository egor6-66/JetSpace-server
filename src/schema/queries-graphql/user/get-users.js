const {GraphQLID} = require("graphql");
const {GraphQlModels, MongooseModels} = require('../../models')


const getUser = {
    type: GraphQlModels.User,
    args: {userId: {type: GraphQLID}},
    async resolve(parent, args) {
        let likeCounter = 0
        let dislikeCounter = 0
        const userData = await MongooseModels.User.findById(args.userId)
        const postsData = await MongooseModels.Post.findOne({userId: args.userId})
        if(postsData){
            for await (let post of postsData.posts) {
                if (post.likes.length) likeCounter = likeCounter + post.likes.length
                if (post.dislikes.length) dislikeCounter = dislikeCounter + post.dislikes.length
            }
            userData.likeCounter = likeCounter
            userData.dislikeCounter = dislikeCounter
        }
        return userData
    }
};

module.exports = getUser;
