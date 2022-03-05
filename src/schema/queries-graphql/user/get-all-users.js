const {GraphQLList} = require("graphql");
const GraphQlUsers = require("../../models/user/graphql-user-model");
const MongooseUsers = require("../../models/user/mongoose-user-model");


const geyAllUsers = {
    type: new GraphQLList(GraphQlUsers),
    resolve(parent, args) {
        return MongooseUsers.find({})
    }
};

module.exports = geyAllUsers;
