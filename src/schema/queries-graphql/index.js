const {GraphQLObjectType, GraphQLID, GraphQLList} = require("graphql");
const GraphQlUsers = require('../models/user/graphql-user-models');
const MongooseUsers = require("../models/user/mongoose-user-models");


const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getAllUsers: {
            type: new GraphQLList(GraphQlUsers),
            resolve(parent, args) {
                return MongooseUsers.find({})
            }
        },
        getUser: {
            type: GraphQlUsers,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return  MongooseUsers.findById(args.id)
            }
        },
        getUserImg: {
            type: GraphQlUsers,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return MongooseUsers.findById(args.id)
            }
        }
    }
})

module.exports = Query;
