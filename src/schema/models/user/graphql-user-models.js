const {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require("graphql");
const GraphQlImages = require('../image/graphql-image-models');
const MongooseImages = require("../image/mongoose-image-models");

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        isOnline: {type: GraphQLBoolean},
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        name: {type: GraphQLString},
        lastName: {type: GraphQLString},
        status: {type: GraphQLString},
        age: {type: GraphQLString},
        isActivated: {type: GraphQLBoolean},
        activationLink: {type: GraphQLString},
        images: {
            type: GraphQlImages,
            resolve(parent, args) {
                return  MongooseImages.findOne({userId: parent.id})
            }
        },
    })
});

module.exports = UserType;
