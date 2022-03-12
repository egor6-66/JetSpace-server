const FileService = require('../services/file-service');
const TokenService = require('../services/token-service');


class FileController {
    async fileUpload(req, res, next) {
        try {
            const userData = await TokenService.tokenDecode(req.headers.authorization)
            const {id, name, lastName} = userData
            await FileService.uploadFile(req.files, id, name, lastName)
            return res.json('sucess')
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new FileController();
