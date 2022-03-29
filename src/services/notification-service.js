const {MongooseModels} = require('../schema/models')
const {pubSub} = require("../schema/subscriptions-graphql");
const {v4: uuidv4} = require("uuid");
const moment = require("moment");


class NotificationService {

    async addNotification(ownerId, userId, payload, action) {

        return
    }
}




module.exports = new NotificationService();

