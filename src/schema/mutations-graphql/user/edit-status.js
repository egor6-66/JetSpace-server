const {
    GraphQLID,
    GraphQLString
} = require("graphql");
const {GraphQlModels, MongooseModels} = require('../../models')


const editStatus = {
    type: GraphQlModels.User,
        args: {
        id: {type: GraphQLID},
        status: {type: GraphQLString},
    },
    resolve(parent, args) {
        return MongooseModels.User.findByIdAndUpdate(args.id, {
            $set: {
                status: args.status,
            }
        }, {new: true});
    }
}

module.exports = editStatus;
