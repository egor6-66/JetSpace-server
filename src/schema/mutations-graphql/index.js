const {GraphQLObjectType, GraphQLString, GraphQLID} = require("graphql");
const MongooseUsers = require("../models/user/mongoose-user-models");
const GraphQlUsers = require("../models/user/graphql-user-models");


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        editStatus: {
            type: GraphQlUsers,
            args: {
                id: {type: GraphQLID},
                status: {type: GraphQLString},
            },
            resolve(parent, args) {
                return MongooseUsers.findByIdAndUpdate(args.id, {
                    $set: {
                        status: args.status,
                    }
                }, {new: true});
            }
        }
    }
})

module.exports = Mutation;
