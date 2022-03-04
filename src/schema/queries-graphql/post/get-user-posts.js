const {GraphQLID} = require("graphql");
const {MongooseModels, GraphQlModels} = require('../../models')

const getUserPosts = {
    type: GraphQlModels.Post,
    args: {userId: {type: GraphQLID}},
    resolve(parent, args) {
        return MongooseModels.Post.findOne({userId: args.userId})

    }
};

module.exports = getUserPosts;
