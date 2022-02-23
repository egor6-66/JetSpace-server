const AWS = require('aws-sdk');
const Users = require('../schema/models/user/mongoose-user-models');
const Images = require("../schema/models/image/mongoose-image-models");


const s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: process.env.BUCKET_NAME
});

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
            await Users.findByIdAndUpdate(userId, {
                $set: {
                    avatar: `${process.env.DOMAIN_NAME}/${data.key}`
                },
            }, {new: true});

            const imagesData = await Images.findOne({userId: userId})
            if (imagesData) {
                imagesData.images.unshift({
                    path: `${process.env.DOMAIN_NAME}/${data.key}`,
                })
                await imagesData.save()
            } else {
                await Images.create({
                    userId: userId,
                    userName: userName,
                    userLastName: userLastName,
                    images: [
                        {path: `${process.env.DOMAIN_NAME}/${data.key}`}
                    ],
                })
            }
        });
    }
}

module.exports = new FileService();
