const {GraphQLID, GraphQLString,} = require("graphql");
const {MongooseModels, GraphQlModels, ParamsModels} = require('../../models')
const {MessageDTO} = require('../../../dtos')
const {pubSub} = require('../../subscriptions-graphql');


const addMessage = {
    type: GraphQlModels.Message,
    args: {
        myId: {type: GraphQLID},
        userId: {type: GraphQLID},
        type: {type: GraphQLString},
        content: {type: GraphQLString},
    },

    async resolve(parent, args) {
        const userData = await MongooseModels.User.findById(args.userId)
        const myMessages = await MongooseModels.Message.findOne({userId: args.myId})
        const userMessages = await MongooseModels.Message.findOne({userId: args.userId})
        const newMessage = ParamsModels.Message(args)

        if (userMessages) {
            const found = userMessages.messages.find(message => message.userId === args.myId)
            found ? found.messages.push(newMessage) : userMessages.messages.unshift({userId: args.myId, messages: [newMessage]})
            await userMessages.markModified('messages');
            await userMessages.save()
            if(userData.id === args.userId && userMessages.messageLocation !== args.myId) {
                userMessages.newMessages.push(args.myId)
                const newNotification = ParamsModels.Notification({ownerId: args.userId, userId: args.myId}, 'new-message', newMessage)
                userData.notifications.unshift(newNotification)
                await pubSub.publish('newNotification', {newNotification: newNotification})
                await userData.save()
                await userMessages.save()
            }
        } else {
            await MongooseModels.Message.create({
                userId: args.userId,
                messages: [{userId: args.myId, messages: [newMessage]}]
            })
        }
        if (myMessages) {
            const found = myMessages.messages.find(message => message.userId === args.userId)
            found ? found.messages.push(newMessage) : myMessages.messages.unshift({userId: args.userId, messages: [newMessage]})
            await myMessages.markModified('messages');
            await myMessages.save()
            await pubSub.publish('newMessage', {newMessage: newMessage})
        } else {
            const messages = await MongooseModels.Message.create({
                userId: args.myId,
                messages: [{userId: args.userId, messages: [newMessage]}]
            })
            await pubSub.publish('newMessage', {newMessage: newMessage})
            return messages
        }

        const messages = myMessages.messages.find(message => message.userId === args.userId)
        return MessageDTO(messages, userData)
    }
}

module.exports = addMessage;
