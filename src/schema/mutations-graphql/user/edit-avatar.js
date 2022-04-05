const {
    GraphQLID,
    GraphQLString
} = require("graphql");
const {GraphQlModels, MongooseModels} = require('../../models')


const editAvatar = {
    type: GraphQlModels.User,
    args: {
        id: {type: GraphQLID},
        avatar: {type: GraphQLString},
    },
    resolve(parent, args) {
        return MongooseModels.User.findByIdAndUpdate(args.id, {
            $set: {
                avatar: args.avatar,
            }
        }, {new: true});
    }
}

module.exports = editAvatar;
