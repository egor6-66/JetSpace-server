// const {
//     GraphQLObjectType,
//     GraphQLString,
//     GraphQLID,
//     GraphQLList,
// } = require("graphql");
//
//
// const MessageType = new GraphQLObjectType({
//     name: 'Message',
//     fields: () => ({
//         id: {type: GraphQLID},
//         userName: {type: GraphQLString},
//         content: {type: GraphQLString},
//     })
// })
//
// const MessagesType = new GraphQLObjectType({
//     name: 'Messages',
//     fields: () => ({
//         id: {type: GraphQLID},
//         messages: {type: new GraphQLList(MessageType)},
//     })
// });
//
// module.exports = MessagesType;
