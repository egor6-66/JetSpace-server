// const {GraphQLID, GraphQLList} = require("graphql");
// const MongooseAllLikes = require('../../models/like/mongoose-like-model');
//
//
// const getAllLikes = {
//     // type: new GraphQLList(AllLikesType),
//     args: {id: {type: GraphQLID}},
//     async resolve(parent, args) {
//         const allLikes = await MongooseAllLikes.findOne({userId: args.id})
//         return allLikes.likes
//     }
// };
// module.exports = getAllLikes;
