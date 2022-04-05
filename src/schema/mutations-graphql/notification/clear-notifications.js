const {GraphQLID} = require("graphql");
const {MongooseModels, GraphQlModels} = require('../../models')


const clearNotifications = {
    type: GraphQlModels.Notification,
    args: {
        myId: {type: GraphQLID},
    },
    async resolve(parent, args) {
        const userData = await MongooseModels.User.findById(args.myId)
        userData.notifications = []
        userData.save()
        return {
            id: userData.id,
            notifications: userData.notifications
        }
    }
}

module.exports = clearNotifications;
