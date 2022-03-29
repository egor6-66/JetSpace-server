const {GraphQLID, GraphQLList} = require("graphql");
const {FollowersDTO} = require('../../../dtos')
const {GraphQlModels, MongooseModels} = require('../../models')
const {v4: uuidv4} = require("uuid");


const getAllSubscribers = {
    type: new GraphQLList(GraphQlModels.Followers),
    args: {id: {type: GraphQLID}},
    async resolve(parent, args) {
        const userData = await MongooseModels.User.findById(args.id)
        if(userData.subscribers.length){
            let subscribers = []
            for await (let subscriber of userData.subscribers){
                const user = await MongooseModels.User.findById(subscriber.userId)
                subscribers.unshift(FollowersDTO(subscriber, user))
            }
            return subscribers
        }
    }
};
module.exports = getAllSubscribers;
