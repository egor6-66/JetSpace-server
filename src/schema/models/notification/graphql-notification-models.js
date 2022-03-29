const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString, GraphQLList,
} = require("graphql");


const NotificationType = new GraphQLObjectType({
    name: 'Notification',
    fields: () => ({
        id: {type: GraphQLID},
        date: {type: GraphQLString},
        ownerId: {type: GraphQLID},
        userId: {type: GraphQLID},
        action: {type: GraphQLString},
        content: {type: GraphQLString},
        contentDate: {type: GraphQLString},
        userName: {type: GraphQLString},
        userLastName: {type: GraphQLString},
        userAvatar: {type: GraphQLString},
    })
});

const NotificationsType = new GraphQLObjectType({
    name: 'Notifications',
    fields: () => ({
        id: {type: GraphQLID},
        notifications: {type: new GraphQLList(NotificationType)}
    })
})


module.exports = NotificationsType;
