const {GraphQLID} = require("graphql");
const {MongooseModels, GraphQlModels} = require('../../models')
const {MessageDTO} = require('../../../dtos')

const getMessages = {
    type: GraphQlModels.Message,
    args: {
        myId: {type: GraphQLID},
        userId: {type: GraphQLID},
    },
    async resolve(parent, args) {
        const response = await MongooseModels.Message.findOne({userId: args.myId})
        const messagesData = response.messages.find(message => message.userId === args.userId)
        const userData = await MongooseModels.User.findById(messagesData.userId)
        return MessageDTO(messagesData, userData)
    }
};

module.exports = getMessages;