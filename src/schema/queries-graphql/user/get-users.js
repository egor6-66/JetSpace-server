const {GraphQLID} = require("graphql");
const MongooseUser = require("../../models/user/mongoose-user-model");
const GraphQlUser = require("../../models/user/graphql-user-model");


const getUser = {
    type: GraphQlUser,
    args: {userId: {type: GraphQLID}},
    async resolve(parent, args) {
        const userData = await MongooseUser.findById(args.userId)
        return userData
    }
};

module.exports = getUser;
