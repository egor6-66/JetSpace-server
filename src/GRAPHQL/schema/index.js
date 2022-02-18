// const {buildSchema} = require('graphql');
//
// const schema = buildSchema(`
//
//     type User {
//         isOnline: Boolean
//         id: ID
//         email: String
//         password: String
//         avatar: String
//         name: String
//         lastName: String
//         status: String
//         age: Int
//         isActivated: Boolean
//         activationLink: String
//     }
//
//     input UserInput {
//         isOnline: Boolean
//         id: ID
//         password: String
//         avatar: String
//         name: String
//         lastName: String
//         status: String
//         age: Int
//     }
//
//      type Query {
//         getAllUsers: [User]
//         getUser(id: ID): User
//     }
//
//     type Mutation {
//         editUser(input: UserInput): User
//         editUserAvatar(input: UserInput): User
//         editUserStatus(input: UserInput): User
//     }
// `)
//
// module.exports = schema;
//
// const {GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLSchema,} = require('graphql');
// const {UserType} = require('../types')
// const Users = require("../../models/user-model");

// const UserType = new GraphQLObjectType({
//     name: 'User',
//     fields: () => ({
//         isOnline: {type: GraphQLBoolean},
//         id: {type: GraphQLID},
//         email: {type: GraphQLString},
//         password: {type: GraphQLString},
//         // avatar: {type: GraphQLBoolean},
//         name: {type: GraphQLString},
//         lastName: {type: GraphQLString},
//         status: {type: GraphQLString},
//         age: {type: GraphQLString},
//         isActivated: {type: GraphQLBoolean},
//         activationLink: {type: GraphQLString},
//     })
// })
//
// const Query = new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//         getUser: {
//             type: UserType,
//             args: {id: {type: GraphQLID}},
//             resolve(parent, args) {
//                 return Users.findById(args.id)
//             }
//         }
//     }
// })

// module.exports = new GraphQLSchema({
//     query: Query,
// })