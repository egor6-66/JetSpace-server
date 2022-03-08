const {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList,} = require("graphql");


const DialogType = new GraphQLObjectType({
    name: 'Dialog',
    fields: () => ({
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
