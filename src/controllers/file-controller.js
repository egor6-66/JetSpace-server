const FileService = require('../services/file-service');
const TokenService = require('../services/token-service');

class FileController {

    async imgUpload(req, res, next) {
        console.log()
        try {
            const userData = await TokenService.tokenDecode(req.headers.authorization)
            const {id, name, lastName} = userData
            await FileService.uploadFile(req.files.image, 'img', id, name, lastName)
            const img = {
                name: name,
                path: `${process.env.DOMAIN_NAME}/${id}/img/${req.files.image.name}`,
            }
            return res.json(img)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new FileController();
