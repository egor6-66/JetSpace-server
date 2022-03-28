const {GraphQLID, GraphQLString,} = require("graphql");
const {MongooseModels, GraphQlModels} = require('../../models')


const removeSound = {
    type: GraphQlModels.Sound,
    args: {
        id: {type: GraphQLID},
        soundId: {type: GraphQLID},
        type: {type: GraphQLString},
    },

    async resolve(parent, args) {
        const soundsData = await MongooseModels.Sound.findOne({userId: args.id})
        soundsData[args.type].forEach((sound, index) => {
            if (sound.id === args.soundId) soundsData[args.type].splice(index, 1)
        })
        await soundsData.save()
        return soundsData
    }
}

module.exports = removeSound;