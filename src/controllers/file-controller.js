const FileService = require('../services/file-service');
const TokenService = require('../services/token-service');


class FileController {
    async fileUpload(req, res, next) {
        try {
            const userData = await TokenService.tokenDecode(req.headers.authorization)
            const {id} = userData
            const response = await FileService.uploadFile(req.files, id, req.body.userId)
            const data = {
                path: `${process.env.S3_PREFIX_PATH}/${response.service.config.params.Key}`
            }
            return res.json(data)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new FileController();
