const {GraphQLList} = require("graphql");
const GraphQlUsers = require("../../models/user/graphql-user-model");
const MongooseUsers = require("../../models/user/mongoose-user-model");


const geyAllUsers = {
    type: new GraphQLList(GraphQlUsers),
   async resolve(parent, args) {
        const allUsers = await MongooseUsers.find({})
        console.log(allUsers)
        return MongooseUsers.find({})
    }
};

module.exports = geyAllUsers;
