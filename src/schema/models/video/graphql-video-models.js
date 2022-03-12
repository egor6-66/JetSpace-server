const {GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID,} = require("graphql");


const VideoType = new GraphQLObjectType({
    name: 'Video',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLID},
        path: {type: GraphQLString},
    })
})

const VideosType = new GraphQLObjectType({
    name: 'Videos',
    fields: () => ({
        id: {type: GraphQLID},
        userId: {type: GraphQLID},
        videos: {type: new GraphQLList(VideoType)},
    })
});

module.exports = VideosType;