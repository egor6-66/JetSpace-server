const {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require("graphql");
const PostType = require('../types/post-type');
const Posts = require('../../models/post-model')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        isOnline: {type: GraphQLBoolean},
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        // avatar: {type: GraphQLBoolean},
        name: {type: GraphQLString},
        lastName: {type: GraphQLString},
        status: {type: GraphQLString},
        age: {type: GraphQLString},
        isActivated: {type: GraphQLBoolean},
        activationLink: {type: GraphQLString},
        // posts: {
        //     type: new GraphQLList(PostType),
        //     resolve(parent, args){
        //         return Posts.findById(parent.id)
        //     }
        //
        // }
    })
});

module.exports = UserType;