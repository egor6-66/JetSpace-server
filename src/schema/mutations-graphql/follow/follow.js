const {GraphQLID,} = require("graphql");
const {MongooseModels, GraphQlModels, ParamsModels} = require('../../models')
const moment = require("moment");
const {v4: uuidv4} = require("uuid");
const {pubSub} = require("../../subscriptions-graphql");

const follow = {
    type: GraphQlModels.User,
    args: {
        myId: {type: GraphQLID},
        userId: {type: GraphQLID},
    },

    async resolve(parent, args) {
        const myData = await MongooseModels.User.findById(args.myId)
        const userData = await MongooseModels.User.findById(args.userId)
        const dateNew = moment().unix()
        if(!userData.subscribers.includes(args.myId)){
            myData.subscriptions.unshift({userId: args.userId, dateSub: dateNew})
            userData.subscribers.unshift({userId: args.myId, dateSub: dateNew})
            const newNotification = ParamsModels.Notification(args, 'follow', {content: myData.id, contentDate: dateNew})
            myData.notifications.unshift(newNotification)
            await pubSub.publish('newNotification', {newNotification: newNotification})
            await myData.save()
            await userData.save()
            return userData
        }
    }
}

module.exports = follow;
