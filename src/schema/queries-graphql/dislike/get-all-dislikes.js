const {GraphQLID, GraphQLList} = require("graphql");
const {LikeDTO} = require('../../../dtos')
const {GraphQlModels, MongooseModels} = require('../../models')
const {v4: uuidv4} = require("uuid");


const getAllDislikes = {
    type: new GraphQLList(GraphQlModels.AllDislikes),
    args: {id: {type: GraphQLID}},
    async resolve(parent, args) {
        const postsData = await MongooseModels.Post.findOne({userId: args.id})
        const allDislikes = []
        if(postsData){
            for await (let post of postsData.posts){
                if (post.dislikes.length){
                    for await (let dislike of post.dislikes){
                        const userData = await MongooseModels.User.findById(dislike.userId)
                        allDislikes.unshift( LikeDTO(dislike, userData, post))
                    }

                }
            }
        }
        return  allDislikes.sort((a, b) => a.date - b.date).reverse()
    }
};
module.exports = getAllDislikes;
