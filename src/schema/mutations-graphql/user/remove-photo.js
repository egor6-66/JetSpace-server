const {
    GraphQLID,
    GraphQLString
} = require("graphql");
const s3 = require('../../../instances/aws')
const {GraphQlModels, MongooseModels} = require('../../models')


const removePhoto = {
    type: GraphQlModels.Image,
    args: {
        id: {type: GraphQLID},
        photoId: {type: GraphQLID},
    },
   async resolve(parent, args) {
       const imagesData = await MongooseModels.Image.findOne({userId: args.id})
       const params = {
           Bucket: process.env.S3_BUCKET_NAME,
           Key: `/users/${args.id}/avatars/${args.photoId}`
       }
       await s3.deleteObject(params, async function (err, data) {
           err && console.log(err)
           data && console.log(data)
       })
       imagesData.images.forEach((image, index) => {
           image.id === args.photoId && imagesData.images.splice(index, 1)
       })
       imagesData.save()
       return imagesData
    }
}

module.exports = removePhoto;
