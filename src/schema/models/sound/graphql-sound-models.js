const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID,} = require("graphql");


const SoundType = new GraphQLObjectType({
    name: 'Sound',
    fields: () => ({
        id: {type: GraphQLID},
        path: {type: GraphQLString},
        type: {type: GraphQLString},
    })
})

const SoundsType = new GraphQLObjectType({
    name: 'Sounds',
    fields: () => ({
        id: {type: GraphQLID},
        userId: {type: GraphQLID},
        soundTracks: {type: new GraphQLList(SoundType)},
        playLists: {type: new GraphQLList(SoundType)},
    })
});

module.exports = SoundsType;
