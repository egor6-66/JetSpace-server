const {GraphQLList} = require("graphql");
const GraphQlUsers = require("../../models/user/graphql-user-models");
const MongooseUsers = require("../../models/user/mongoose-user-models");


const geyAllUsers = {
    type: new GraphQLList(GraphQlUsers),
    resolve(parent, args) {
        return MongooseUsers.find({})
    }
};

module.exports = geyAllUsers;
