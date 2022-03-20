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
        for await (let dialog of response.messages){
           const userData = await MongooseModels.User.findById(dialog.userId)
            delete dialog.messages
            allDialogs.dialogs.push(MessageDTO(dialog, userData))
        }
        return allDialogs
    }
};


module.exports = getAllDialogs;
