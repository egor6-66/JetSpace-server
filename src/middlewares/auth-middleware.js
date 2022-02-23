const ApiError = require('../exceptions/api-error');
const TokenService = require('../services/token-service');


module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if (authorizationHeader) {
            const accessToken = authorizationHeader.split(' ')[1]
            if (accessToken) {
                const userData = TokenService.validateAccessToken(accessToken)
                if (userData) {
                    req.user = userData
                    next()
                } else {
                    return next(ApiError.UnauthorizedError())
                }
            } else {
                return next(ApiError.UnauthorizedError())
            }
        } else {
            return next(ApiError.UnauthorizedError())
        }
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
};
