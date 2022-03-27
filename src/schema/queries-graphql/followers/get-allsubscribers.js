const {GraphQLID, GraphQLList} = require("graphql");
const {FollowersDTO} = require('../../../dtos')
const {GraphQlModels, MongooseModels} = require('../../models')
const {v4: uuidv4} = require("uuid");


const getAllSubscribers = {
    type: new GraphQLList(GraphQlModels.Followers),
    args: {id: {type: GraphQLID}},
    async resolve(parent, args) {
        const userData = await MongooseModels.User.findById(args.id)
        console.log(userData)
        if(userData.subscribers.length){
            let subscribers = []
            for await (let userid of userData.subscribers){
                const user = await MongooseModels.User.findById(userid)
                subscribers.unshift(FollowersDTO({}, user))
            }
            return subscribers
        }
    }
};
module.exports = getAllSubscribers;
