const {GraphQLID} = require("graphql");
const GraphQlImages = require('../models/image/graphql-image-models');
const MongooseImages = require('../models/image/mongoose-image-models');

const getAllUserImg = {
    type: GraphQlImages,
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        return MongooseImages.findOne({userId: args.id})
    }
};

module.exports = getAllUserImg;
