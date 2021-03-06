const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID,} = require("graphql");


const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: () => ({
        id: {type: GraphQLID},
        userId: {type: GraphQLID},
        recipientId: {type: GraphQLID},
        date: {type: GraphQLString},
        type: {type: GraphQLString},
        content: {type: GraphQLString},
    })
})

const MessagesType = new GraphQLObjectType({
    name: 'Messages',
    fields: () => ({
        userId: {type: GraphQLID},
        messageLocation: {type: GraphQLString},
        newMessages: {type: new GraphQLList(GraphQLString)},
        userName: {type: GraphQLString},
        userAvatar: {type: GraphQLString},
        userLastName: {type: GraphQLString},
        messages: {type: new GraphQLList(MessageType)},
    })
});

module.exports = MessagesType;
