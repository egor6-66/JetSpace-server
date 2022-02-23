// const {
//     GraphQLID,
//     GraphQLString,
// } = require("graphql");
// const {v4: uuidv4} = require("uuid");
// const GraphQlMessage = require('../../models/message/graphql-message-models');
// const MongooseMessage = require('../../models/message/mongoose-message-models');
// const MongoosePost = require("../../models/post/mongoose-post-models");
//
// const messageParams = (dateNow, args) => {
//     return {
//         id: uuidv4(),
//         userName
//         content: args.content,
//     }
// }
//
// const addMessage = {
//     type: GraphQlMessage,
//     args: {
//
//         userName: {type: GraphQLString},
//         userLastName: {type: GraphQLString},
//         content: {type: GraphQLString},
//     },
//     async resolve(parent, args) {
//         const postsData = await MongoosePost.findOne({id: args.userId})
//         if (postsData) {
//             postsData.posts.unshift(postParams(dateNow, args))
//             await postsData.save()
//             return postsData
//         } else {
//             return MongoosePost.create({
//                 id: args.userId,
//                 userName: args.userName,
//                 userLastName: args.userLastName,
//                 userAvatar: args.userAvatar,
//                 posts: [postParams(dateNow, args)],
//             })
//         }
//     }
// }
//
// module.exports = addMessage;
