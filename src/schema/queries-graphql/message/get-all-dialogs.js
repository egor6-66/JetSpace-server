const {GraphQLID} = require("graphql");
const {MongooseModels, GraphQlModels} = require('../../models')
const {MessageDTO} = require("../../../dtos");


const getAllDialogs = {
    type: GraphQlModels.Dialogs,
    args: {
        id: {type: GraphQLID},
    },

    async resolve(parent, args) {
        const response = await MongooseModels.Message.findOne({userId: args.id})
        const allDialogs = {id: response.userId, dialogs: []}
        for await (let dialog of response.messages) {
            const userData = await MongooseModels.User.findById(dialog.userId)
            delete dialog.messages
            if (response.newMessages.length) {
                for (let newMessage of response.newMessages) {
                    allDialogs.dialogs.push(MessageDTO(dialog, userData, newMessage === userData.id))
                }
            } else {
                allDialogs.dialogs.push(MessageDTO(dialog, userData, false))
            }

        }
        return allDialogs
    }
};


module.exports = getAllDialogs;
