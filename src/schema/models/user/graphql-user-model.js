const {GraphQLObjectType, GraphQLBoolean, GraphQLID, GraphQLString, GraphQLList,} = require("graphql");


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        name: {type: GraphQLString},
        lastName: {type: GraphQLString},
        status: {type: GraphQLString},
        age: {type: GraphQLString},
        avatar: {type: GraphQLString},
        headerAvatar: {type: GraphQLString},
        likeCounter: {type: GraphQLString},
        dislikeCounter: {type: GraphQLString},
        subscriptions: {type:new GraphQLList(GraphQLString)},
        subscribers: {type:new GraphQLList(GraphQLString)},
        theme: {type: GraphQLString},
        instagram: {type: GraphQLString},
        facebook: {type: GraphQLString},
        twitter: {type: GraphQLString},
        spotify: {type: GraphQLString},
        telegram: {type: GraphQLString},
        github: {type: GraphQLString},
        soundCloud: {type: GraphQLString},
        youTube: {type: GraphQLString},
        isOnline: {type: GraphQLBoolean},
        isActivated: {type: GraphQLBoolean},
        activationLink: {type: GraphQLString},
    })
});

module.exports = UserType;
