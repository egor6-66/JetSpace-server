const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean,} = require("graphql");


const DialogType = new GraphQLObjectType({
    name: 'Dialog',
    fields: () => ({
        newMessages: {type: GraphQLBoolean},
        userId: {type: GraphQLID},
        userName: {type: GraphQLString},
        userLastName: {type: GraphQLString},
        userAvatar: {type: GraphQLString},
    })
});


const DialogsType = new GraphQLObjectType({
    name: 'Dialogs',
    fields: () => ({
       id: {type: GraphQLID},
        dialogs: {type: new GraphQLList(DialogType)}
    })
});

module.exports = DialogsType;
