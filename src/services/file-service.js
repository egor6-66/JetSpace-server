const AWS = require('aws-sdk');
const {v4: uuidv4} = require("uuid");
const Users = require('../schema/models/user/mongoose-user-models');
const Images = require("../schema/models/image/mongoose-image-models");


const s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: process.env.BUCKET_NAME
});

const imageParams = (parentId, path) => {
    return {
        parentId: parentId,
        id: uuidv4(),
        path: path,
    }
}

const deleteBeforeAdd = async (filePath) => {
    const path = filePath.split('/').slice(-3).join('/')
    console.log(path)
    const awsParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: path
    }

    await s3bucket.deleteObject(awsParams, async function (err, data) {
        err && console.log(err)
        data && console.log(data)
    })

}

const getFileKey = (key, userId, file) => {
    if (`${key}` === 'headerAvatar') return `${userId}/${key}/${uuidv4()}`
    if (`${key}` === 'avatar') return `${userId}/${key}s/${file[key].name}`
}

class FileService {
    async uploadFile(file, userId) {
        const key = Object.keys(file)
        const userData = await Users.findById(userId)

        const awsParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: getFileKey(key, userId, file),
            Body: file[key].data,
        }

        if (`${key}` === 'headerAvatar') {
            userData.headerAvatar && await deleteBeforeAdd(userData.headerAvatar)
        }

        await s3bucket.upload(awsParams, async function (err, data) {
            if (err) {
                console.log(err);
            }

            if (`${key}` === 'avatar') {
                const imagesData = await Images.findOne({userId: userId})
                if (imagesData) {
                    imagesData.images.unshift(imageParams(imagesData._id, `${process.env.DOMAIN_NAME}/${data.key}`))
                    await imagesData.save()
                } else {
                    const newImagesData = await Images.create({userId: userId})
                    newImagesData.images.unshift(imageParams(newImagesData._id, `${process.env.DOMAIN_NAME}/${data.key}`))
                    await newImagesData.save()
                }
            }
            userData[key] = `${process.env.DOMAIN_NAME}/${data.key}`
            await userData.save()
        });
    }

}

module.exports = new FileService();
