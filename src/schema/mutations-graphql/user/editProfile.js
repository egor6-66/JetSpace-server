const {
    GraphQLID,
    GraphQLString
} = require("graphql");
const GraphQlUsers = require("../../models/user/graphql-user-models");
const MongooseUsers = require("../../models/user/mongoose-user-models");


const editProfile = {
    type: GraphQlUsers,
    args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        lastName: {type: GraphQLString},
    },
    resolve(parent, args) {
        return MongooseUsers.findByIdAndUpdate(args.id, {
            $set: {
                name: args.name,
                lastName: args.lastName
            }
        }, {new: true});
    }
}

module.exports = editProfile;
