const {GraphQLID, GraphQLString,} = require("graphql");
const {GraphQlModels, ParamsModels} = require('../../models')
const {pubSub} = require('../../subscriptions-graphql');


const userTyping = {
    type: GraphQlModels.Message,
    args: {
        myId: {type: GraphQLID},
        userId: {type: GraphQLID},
        userName: {type: GraphQLString},
    },

    async resolve(parent, args) {
        await pubSub.publish('userTypingSub', {
            userTypingSub: {
                userName: args.userName,
                myId: args.myId,
                userId: args.userId,
            }
        })
    }
}

module.exports = userTyping;
