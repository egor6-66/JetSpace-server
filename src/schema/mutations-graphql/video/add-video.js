const {GraphQLID, GraphQLString,} = require("graphql");
const {MongooseModels, GraphQlModels, ParamsModels} = require('../../models')


const addVideo = {
    type: GraphQlModels.Video,
    args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        path: {type: GraphQLString},
    },

    async resolve(parent, args) {
        const videosData = await MongooseModels.Video.findOne({userId: args.id})
        const newVideo = ParamsModels.Video(args)

        if (videosData) {
            videosData.videos.unshift(newVideo)
            await videosData.save()

        } else {
           const response = await MongooseModels.Video.create({
                userId: args.id,
                videos: [newVideo],
            })
        }
        return videosData
    }
}

module.exports = addVideo;