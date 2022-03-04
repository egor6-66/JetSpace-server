const {GraphQLID} = require("graphql");
const MongooseUser = require("../../models/user/mongoose-user-models");
const MongooseAllLikes = require('../../models/like/mongoose-like-model');
const GraphQlUser = require("../../models/user/graphql-user-models");


const getUser = {
    type: GraphQlUser,
    args: {userId: {type: GraphQLID}},
    async resolve(parent, args) {
        const userData = await MongooseUser.findById(args.userId)
        const likesData = await MongooseAllLikes.findOne({userId: args.userId})
        if(likesData )userData.likeCounter = likesData.likes.length
        return userData
    }
};

module.exports = getUser;
