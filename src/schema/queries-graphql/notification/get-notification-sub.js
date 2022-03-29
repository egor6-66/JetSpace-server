const {GraphQLID} = require("graphql");
const {MongooseModels, GraphQlModels} = require('../../models')
const {v4: uuidv4} = require("uuid");


const getNotificationsSub = {
    type: GraphQlModels.NotificationSub,
    args: {myId: {type: GraphQLID}},
    async resolve(parent, args) {
        const userData = await MongooseModels.User.findById(args.myId)
        return  {
            id: userData.id,
            notifications: userData.notifications
        }
    }
};

module.exports = getNotificationsSub;
