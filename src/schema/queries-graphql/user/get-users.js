const {GraphQLID} = require("graphql");
const MongooseUsers = require("../../models/user/mongoose-user-models");
const GraphQlUsers = require("../../models/user/graphql-user-models");


const getUser = {
    type: GraphQlUsers,
    args: {id: {type: GraphQLID}},
    resolve(parent, args) {
        return MongooseUsers.findById(args.id)
    }
};

module.exports = getUser;
