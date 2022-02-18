// const Users = require("../models/user-model");
//
//
// const root = {
//     getAllUsers: () => {
//         return Users.find({})
//     },
//
//     getUser: ({id}) => {
//         return Users.findById(id)
//     },
//
//
//     editUser: ({input}) => {
//         return Users.findByIdAndUpdate(input.id,
//             {
//                 $set: {
//                     name: input.name,
//                     lastName: input.lastName,
//                 }
//             },
//             {new: true})
//     },
//
//     editUserAvatar: ({input}) => {
//         console.log(input)
//     },
//
//     editUserStatus: ({input}) => {
//         return Users.findByIdAndUpdate(input.id,
//             {
//                 $set: {
//                     status: input.status
//                 }
//             },
//             {new: true})
//     }
// }
//
// module.exports = root;
const {GraphQLSchema} = require("graphql");
const Query = require('./queries')


module.exports = new GraphQLSchema({
    query: Query,
})