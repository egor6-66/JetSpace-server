const {GraphQLID} = require("graphql");
const GraphQlNotification = require('../../models/notification/graphql-notification-models');
const MongooseNotification = require('../../models/notification/mongoose-notification-models');

const getNotifications = {
    type: GraphQlNotification,
    args: {myId: {type: GraphQLID}},
    async resolve(parent, args) {
        const notificationsData = await MongooseNotification.findOne({userId: args.myId})
        return notificationsData
    }
};

module.exports = getNotifications;
