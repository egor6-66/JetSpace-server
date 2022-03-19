const {MongooseModels, ParamsModels} = require('../schema/models');
const S3 = require('aws-sdk/clients/s3');
const {v4: uuidv4} = require("uuid");
const Jimp = require('jimp');


const s3 = new S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    endpoint: process.env.S3_ENDPOINT,
    s3ForcePathStyle: true,
    region: 'ru-1',
    apiVersion: 'latest'
});

const deleteBeforeAdd = async (filePath) => {
    const path = filePath.split('/').slice(-3).join('/')
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: path
    }

    await s3.deleteObject(params, async function (err, data) {
        err && console.log(err)
        data && console.log(data)
    })
}

const getFileKey = (key, myId, file, userId) => {
    if (`${key}` === 'headerAvatar') return `users/${myId}/${key}/${uuidv4()}`
    if (`${key}` === 'avatar') return `users/${myId}/${key}s/${file[key].name}`
    if (`${key}` === 'voice') return `users/${myId}/messages/${userId}/${key}s/${uuidv4()}`
}

class FileService {
    async uploadFile(file, myId, userId) {
        const key = Object.keys(file)
        const userData = await MongooseModels.User.findById(myId)
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: getFileKey(key, myId, file, userId),
            Body: file[key].data,
        }

        const response = await s3.upload(params, async function (err, data) {
            if (err) console.log(err)

            if (`${key}` === 'voice') return await data

            const imgUrl = `${process.env.S3_PREFIX_PATH}/${data.Key}`

            if (`${key}` === 'headerAvatar') {
                userData.headerAvatar && await deleteBeforeAdd(userData.headerAvatar)
                userData.headerAvatar = imgUrl
            }

            if (`${key}` === 'avatar') {
                const imagesData = await MongooseModels.Image.findOne({userId: myId})
                if (imagesData) {
                    imagesData.images.unshift(ParamsModels.Image(imagesData._id, imgUrl))
                    userData.avatar = imgUrl
                    await imagesData.save()
                } else {
                    const newImagesData = await MongooseModels.Image.create({userId: myId})
                    newImagesData.images.unshift(ParamsModels.Image(newImagesData._id, imgUrl))
                    userData.avatar = imgUrl
                    await newImagesData.save()
                }
            }
            await userData.save()
        });
        return response
    }

}

module.exports = new FileService();
