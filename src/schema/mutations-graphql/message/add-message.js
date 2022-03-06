const {GraphQLID, GraphQLString,} = require("graphql");
const {MongooseModels, GraphQlModels, ParamsModels} = require('../../models')
const {MessageDTO} = require('../../../dtos')
const {pubSub} = require('../../subscriptions-graphql');


const addMessage = {
    type: GraphQlModels.Message,
    args: {
        myId: {type: GraphQLID},
        userId: {type: GraphQLID},
        content: {type: GraphQLString},
    },

    async resolve(parent, args) {
        const userData = await MongooseModels.User.findById(args.userId)
        const myMessages = await MongooseModels.Message.findOne({userId: args.myId})
        const userMessages = await MongooseModels.Message.findOne({userId: args.userId})
        const newMessage = ParamsModels.Message(args)

        if (myMessages) {
            myMessages.messages.map(message => {
                if (message.userId === args.userId) {
                    message.messages.push(newMessage)
                }
            })
            userMessages.messages.map(message => {
                if (message.userId === args.myId) {
                    message.messages.push(newMessage)
                }
            })
            await myMessages.markModified('messages');
            await userMessages.markModified('messages');
            await userMessages.save()
            await myMessages.save()
        } else {
            await MongooseModels.Message.create({
                userId: args.myId,
                messages: [{userId: args.userId, messages: [newMessage]}]
            })
            await MongooseModels.Message.create({
                userId: args.userId,
                messages: [{userId: args.myId, messages: [newMessage]}]
            })
        }
        const messages = myMessages.messages.find(message => message.userId === args.userId)
        return MessageDTO(messages, userData)
    }
}

module.exports = addMessage;
