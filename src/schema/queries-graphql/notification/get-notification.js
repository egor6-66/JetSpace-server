const {GraphQLID} = require("graphql");
const {MongooseModels, GraphQlModels} = require('../../models')
const {NotificationsDTO} = require("../../../dtos");


const getNotifications = {
    type: GraphQlModels.Notification,
    args: {myId: {type: GraphQLID}},
    async resolve(parent, args) {
        const userData = await MongooseModels.User.findById(args.myId)
        const notifications = []
        for await (let notification of userData.notifications){
            const userData = await MongooseModels.User.findById(notification.userId)
            notifications.push(NotificationsDTO(notification, userData))
        }
        return {
            id: userData.id,
            notifications: notifications
        }
    }
};

module.exports = getNotifications;
