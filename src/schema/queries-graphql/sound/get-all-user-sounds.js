const {GraphQLID} = require("graphql");
const {GraphQlModels, MongooseModels} = require('../../models')


const getAllUserSounds = {
    type: GraphQlModels.Sound,
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        return MongooseModels.Sound.findOne({userId: args.id})
    }
};

module.exports = getAllUserSounds;
