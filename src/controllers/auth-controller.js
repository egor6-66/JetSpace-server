const {validationResult} = require('express-validator');

const UserService = require('../services/auth-service')
const ApiError = require('../exceptions/api-error');


class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
            }
            const {name, email, password} = req.body
            const userData = await UserService.registration(name, email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    };

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            const userId = await UserService.activate(activationLink)
            return res.redirect(`${process.env.CLIENT_URL}/user:${userId}`)
        } catch (e) {
            next(e)
        }
    };

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await UserService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    };

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const {userId} = req.body
            const token = await UserService.logout(refreshToken, userId)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    };

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await UserService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController();
