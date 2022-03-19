const {GraphQLID, GraphQLString,} = require("graphql");
const {MongooseModels, GraphQlModels, ParamsModels} = require('../../models')


const addSound = {
    type: GraphQlModels.Sound,
    args: {
        id: {type: GraphQLID},
        path: {type: GraphQLString},
        type: {type: GraphQLString},
    },

    async resolve(parent, args) {
        const soundsData = await MongooseModels.Sound.findOne({userId: args.id})
        const newSound = ParamsModels.Sound(args)

        if (soundsData) {
            soundsData[args.type].unshift(newSound)
            await soundsData.save()

        } else {
             await MongooseModels.Sound.create({
                userId: args.id,
                [args.type]: [newSound],
            })
        }
        return soundsData
    }
}

module.exports = addSound;