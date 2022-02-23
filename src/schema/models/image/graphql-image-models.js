const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLID,
} = require("graphql");


const ImageType = new GraphQLObjectType({
    name: 'Image',
    fields: () => ({
        id: {type: GraphQLString},
        path: {type: GraphQLString},
    })
})

const ImagesType = new GraphQLObjectType({
    name: 'Images',
    fields: () => ({
        id: {type: GraphQLID},
        userName: {type: GraphQLString},
        userLastName: {type: GraphQLString},
        images: {type: new GraphQLList(ImageType)},
    })
});

module.exports = ImagesType;
