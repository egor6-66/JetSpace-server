const {GraphQLID,} = require("graphql");
const {MongooseModels, GraphQlModels} = require('../../models')


const unfollow = {
    type: GraphQlModels.User,
    args: {
        myId: {type: GraphQLID},
        userId: {type: GraphQLID},
    },

    async resolve(parent, args) {
        console.log(args)
        const myData = await MongooseModels.User.findById(args.myId)
        const userData = await MongooseModels.User.findById(args.userId)

        const indexInMyData = myData.subscriptions.indexOf(args.userId)
        myData.subscriptions.splice(indexInMyData, 1)
        console.log(indexInMyData)
        const indexInUserData = userData.subscriptions.indexOf(args.myId)
        userData.subscribers.splice(indexInUserData, 1)

        await myData.save()
        await userData.save()
        return userData
    }
}

module.exports = unfollow;
