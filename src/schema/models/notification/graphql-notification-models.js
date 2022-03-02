const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString, GraphQLList,
} = require("graphql");


const NotificationType = new GraphQLObjectType({
    name: 'Notification',
    fields: () => ({
        parentId: {type: GraphQLID},
        id: {type: GraphQLID},
        date: {type: GraphQLString},
        title:{type: GraphQLString},
        content: {type: GraphQLString},
        userId: {type: GraphQLID},
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

const notificationParams = () =>{

}

module.exports = NotificationsType;
