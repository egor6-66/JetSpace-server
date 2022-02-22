const {
    GraphQLObjectType,
    GraphQLString, GraphQLID, GraphQLList,
} = require("graphql");


const PathType = new GraphQLObjectType({
    name: 'Path',
    fields: () => ({
        path: {type: GraphQLString}
    })
})

const ImageType = new GraphQLObjectType({
    name: 'Image',
    fields: () => ({
        userId: {type: GraphQLID},
        userName: {type: GraphQLString},
        userLastName: {type: GraphQLString},
        images: {type: new GraphQLList(PathType)},
    })
});

module.exports = ImageType;
