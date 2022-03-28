const {GraphQLID, GraphQLList} = require("graphql");
const {FollowersDTO} = require('../../../dtos')
const {GraphQlModels, MongooseModels} = require('../../models')
const {v4: uuidv4} = require("uuid");


const getAllSubscriptions = {
    type: new GraphQLList(GraphQlModels.Followers),
    args: {id: {type: GraphQLID}},
    async resolve(parent, args) {
        const userData = await MongooseModels.User.findById(args.id)
        if(userData.subscriptions.length){
            let subscriptions = []
            for await (let subscription of userData.subscriptions){
                const user = await MongooseModels.User.findById(subscription.userId)
                subscriptions.unshift(FollowersDTO(subscription, user))
            }
            return subscriptions
        }
    }
};
module.exports = getAllSubscriptions;
