const {GraphQLID,} = require("graphql");
const {MongooseModels, GraphQlModels} = require('../../models')
const moment = require("moment");
const {v4: uuidv4} = require("uuid");

const follow = {
    type: GraphQlModels.User,
    args: {
        myId: {type: GraphQLID},
        userId: {type: GraphQLID},
    },

    async resolve(parent, args) {
        const myData = await MongooseModels.User.findById(args.myId)
        const userData = await MongooseModels.User.findById(args.userId)
        if(!userData.subscribers.includes(args.myId)){
            myData.subscriptions.unshift({userId: args.userId, dateSub: moment().unix()})
            userData.subscribers.unshift({userId: args.myId, dateSub: moment().unix()})
            await myData.save()
            await userData.save()
            return userData
        }
    }
}

module.exports = follow;
