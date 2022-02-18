const {GraphQLObjectType, GraphQLID, GraphQLList} = require("graphql");
const UserType = require('../types/user-type')
const Users = require("../../models/user-model");


const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getAllUsers: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return Users.find({})
            }
        },
        getUser: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Users.findById(args.id)
            }
        }
    }
})

module.exports = Query;
