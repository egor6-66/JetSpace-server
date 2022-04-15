const {GraphQLID, GraphQLBoolean} = require("graphql");
const {GraphQlModels, MongooseModels} = require('../../models')


const editOnline = {
    type: GraphQlModels.User,
    args: {
        id: {type: GraphQLID},
        isOnline: {type: GraphQLBoolean},
    },
   async resolve(parent, args) {
        const userData = await MongooseModels.User.findByIdAndUpdate(args.id, {
            $set: {
                isOnline: args.isOnline,
            }
        }, {new: true});
        return userData.id
    }
}

module.exports = editOnline;
