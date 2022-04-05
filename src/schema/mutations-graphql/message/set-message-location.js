const {GraphQLID, GraphQLString} = require("graphql");
const {MongooseModels, GraphQlModels} = require('../../models')


const setMessageLocation = {
    type: GraphQlModels.Message,
    args: {
        myId: {type: GraphQLID},
        location: {type: GraphQLString},
    },
    async resolve(parent, args) {
        const messages = await MongooseModels.Message.findOne({userId: args.myId})
        console.log(args)
        console.log(messages)
        if(messages.newMessages.length){
            messages.newMessages.forEach((message, index) => {
                message === args.location && messages.newMessages.splice(index, 1)
            })
        }
        messages.messageLocation = args.location
        messages.save()
    }
}

module.exports = setMessageLocation;
