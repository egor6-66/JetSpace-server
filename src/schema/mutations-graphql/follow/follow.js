const {GraphQLID,} = require("graphql");
const {MongooseModels, GraphQlModels} = require('../../models')


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
            myData.subscriptions.unshift(args.userId)
            userData.subscribers.unshift(args.myId)
            await myData.save()
            await userData.save()
            return userData
        }
    }
}

module.exports = follow;
