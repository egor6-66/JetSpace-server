const S3 = require("aws-sdk/clients/s3");


const s3 = new S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    endpoint: process.env.S3_ENDPOINT,
    s3ForcePathStyle: true,
    region: 'ru-1',
    apiVersion: 'latest'
});

module.exports = s3;
