const {GraphQLID, GraphQLList} = require("graphql");
const {LikeDTO} = require('../../../dtos')
const {GraphQlModels, MongooseModels} = require('../../models')
const {v4: uuidv4} = require("uuid");


const getAllLikes = {
    type: new GraphQLList(GraphQlModels.AllLikes),
    args: {id: {type: GraphQLID}},
    async resolve(parent, args) {
        const postsData = await MongooseModels.Post.findOne({userId: args.id})
        const allLikes = []
        if(postsData){
            for await (let post of postsData.posts){
                if (post.likes.length){
                    for await (let like of post.likes){
                        const userData = await MongooseModels.User.findById(like.userId)
                        allLikes.unshift( LikeDTO(like, userData, post))
                    }

                }
            }
        }
        return  allLikes.sort((a, b) => a.date - b.date).reverse()
    }
};
module.exports = getAllLikes;
