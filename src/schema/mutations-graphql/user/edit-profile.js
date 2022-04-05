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
        instagram: {type: GraphQLString},
        facebook: {type: GraphQLString},
        twitter: {type: GraphQLString},
        spotify: {type: GraphQLString},
        telegram: {type: GraphQLString},
        github: {type: GraphQLString},
        soundCloud: {type: GraphQLString},
        youTube: {type: GraphQLString},
    },
    resolve(parent, args) {
        return MongooseModels.User.findByIdAndUpdate(args.id, {
            $set: {
                name: args.name,
                lastName: args.lastName,
                headerAvatar: args.headerAvatar,
                theme: args.theme,
                instagram: args.instagram,
                facebook: args.facebook,
                twitter: args.twitter,
                spotify: args.spotify,
                telegram: args.telegram,
                github: args.github,
                soundCloud: args.soundCloud,
                youTube: args.youTube,
            }
        }, {new: true});
    }
}

module.exports = editProfile;
