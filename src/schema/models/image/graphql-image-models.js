const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLID,
} = require("graphql");


const ImageType = new GraphQLObjectType({
    name: 'Image',
    fields: () => ({
        parentId: {type: GraphQLID},
        id: {type: GraphQLID},
        path: {type: GraphQLString},
        date: {type: GraphQLString},
    })
})

const ImagesType = new GraphQLObjectType({
    name: 'Images',
    fields: () => ({
        id: {type: GraphQLID},
        userId: {type: GraphQLID},
        images: {type: new GraphQLList(ImageType)},
    })
});

module.exports = ImagesType;
