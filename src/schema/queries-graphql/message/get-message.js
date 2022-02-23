const {GraphQLID} = require("graphql");
const GraphQlMessage = require('../../models/message/graphql-message-models');
const MongooseMessage = require('../../models/message/mongoose-message-models');

const getMessage = {
    type: GraphQlMessage,
    args: {userId: {type: GraphQLID}},
    async resolve(parent, args) {
        const response = await MongooseMessage.findOne({id: args.userId})
        return response
    }
};

module.exports = getMessage;