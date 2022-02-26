const FileService = require('../services/file-service');
const TokenService = require('../services/token-service');


class FileController {
    async imgUpload(req, res, next) {
        try {
            const userData = await TokenService.tokenDecode(req.headers.authorization)
            const {id, name, lastName} = userData
            await FileService.uploadFile(req.files.image, 'img', id, name, lastName)
            return res.json('sucess')
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new FileController();
