const {GraphQLID,} = require("graphql");
const {MongooseModels, GraphQlModels, ParamsModels} = require('../../models')
const {pubSub} = require("../../subscriptions-graphql");
const moment = require("moment");


const unfollow = {
    type: GraphQlModels.User,
    args: {
        myId: {type: GraphQLID},
        userId: {type: GraphQLID},
    },

    async resolve(parent, args) {
        const myData = await MongooseModels.User.findById(args.myId)
        const userData = await MongooseModels.User.findById(args.userId)
        const dateNew = moment().unix()

        myData?.subscriptions?.forEach((item, index) => {
            if(item.userId === args.userId) {
                myData.subscriptions.splice(index, 1)
            }
        })
        userData?.subscribers?.forEach((item, index) => {
            if(item.userId === args.myId) {
                userData.subscribers.splice(index, 1)
            }
        })
        const newNotification = ParamsModels.Notification(args, 'follow', {content: myData.id, contentDate: dateNew})
        myData.notifications.unshift(newNotification)
        await pubSub.publish('newNotification', {newNotification: newNotification})
        await myData.save()
        await userData.save()
        return userData
    }
}

module.exports = unfollow;
