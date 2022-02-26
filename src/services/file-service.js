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

class FileService {
    async uploadFile(file, filesType, userId, userName, userLastName) {

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `${userId}/${filesType}/${file.name}`,
            Body: file.data,
        };

        await s3bucket.upload(params, async function (err, data) {
            if (err) {
                console.log(err);
            }
            console.log(data)
            await Users.findByIdAndUpdate(userId, {
                $set: {
                    avatar: `${process.env.DOMAIN_NAME}/${data.key}`
                },
            }, {new: true});

            const imagesData = await Images.findOne({userId: userId})
            if (imagesData) {
                imagesData.images.unshift(imageParams(imagesData._id, `${process.env.DOMAIN_NAME}/${data.key}`))
                await imagesData.save()
            } else {
                const newImagesData = await Images.create({userId: userId,})
                newImagesData.images.unshift(imageParams(newImagesData._id, `${process.env.DOMAIN_NAME}/${data.key}`))
                await newImagesData.save()
            }
        });
    }
}

module.exports = new FileService();
