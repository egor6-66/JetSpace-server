const {
    GraphQLID,
    GraphQLString
} = require("graphql");
const {GraphQlModels, MongooseModels} = require('../../models')


const editProfile = {
    type: GraphQlModels.User,
    args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        lastName: {type: GraphQLString},
        headerAvatar: {type: GraphQLString},
        theme:  {type: GraphQLString},
    },
    resolve(parent, args) {
        return MongooseModels.User.findByIdAndUpdate(args.id, {
            $set: {
                name: args.name,
                lastName: args.lastName,
                headerAvatar: args.headerAvatar,
                theme: args.theme,
            }
        }, {new: true});
    }
}

module.exports = editProfile;
