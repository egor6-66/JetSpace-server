const {GraphQLID, GraphQLList} = require("graphql");
const AllLikesType = require("../../models/like/grapgql-all-likes");
const MongooseAllLikes = require('../../models/like/mongoose-all-likes');


const getAllLikes = {
    type: new GraphQLList(AllLikesType),
    args: {id: {type: GraphQLID}},
    async resolve(parent, args) {
        const allLikes = await MongooseAllLikes.findOne({userId: args.id})
        console.log('allLikes.likes',allLikes.likes)
        return allLikes.likes
    }
};
module.exports = getAllLikes;
