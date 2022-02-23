const {
    GraphQLID,
    GraphQLString
} = require("graphql");
const GraphQlUsers = require("../../models/user/graphql-user-models");
const MongooseUsers = require("../../models/user/mongoose-user-models");


const editStatus = {
    type: GraphQlUsers,
        args: {
        id: {type: GraphQLID},
        status: {type: GraphQLString},
    },
    resolve(parent, args) {
        return MongooseUsers.findByIdAndUpdate(args.id, {
            $set: {
                status: args.status,
            }
        }, {new: true});
    }
}

module.exports = editStatus;
