const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString, GraphQLList,
} = require("graphql");


const NotificationSubType = new GraphQLObjectType({
    name: 'NotificationSub',
    fields: () => ({
        id: {type: GraphQLID},
        ownerId: {type: GraphQLString},
        userId: {type: GraphQLString},
        postId: {type: GraphQLString},
        action: {type: GraphQLString},
        content: {type: GraphQLString},
        contentDate: {type: GraphQLString},
    })
})


const NotificationsSubType = new GraphQLObjectType({
    name: 'NotificationsSub',
    fields: () => ({
        id: {type: GraphQLID},
        notifications: {type: new GraphQLList(NotificationSubType)}
    })
})


module.exports = NotificationsSubType;
