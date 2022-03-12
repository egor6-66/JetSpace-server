const {GraphQLID} = require("graphql");
const {GraphQlModels, MongooseModels} = require('../../models')


const getAllUserVideos = {
    type: GraphQlModels.Video,
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        return MongooseModels.Video.findOne({userId: args.id})
    }
};

module.exports = getAllUserVideos;
