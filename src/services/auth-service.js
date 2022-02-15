const bcrypt = require("bcrypt");
const {v4: uuidv4} = require('uuid');

const UserModel = require('../models/user-model');
const UserDto = require('../dtos/user-dto');
const TokenService = require('../services/token-service');
const MailService = require('../services/mail-service');
const ApiError = require('../exceptions/api-error');

class AuthService {
    async registration(name, email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь ${email} уже зарегистрирован!`)
        } else {
            const hashPassword = await bcrypt.hash(password, 3)
            const activationLink = uuidv4()
            const user = await UserModel.create({name, email, password: hashPassword, activationLink})
            await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
            const userDto = new UserDto(user) //id email isActivated
            const tokens = TokenService.generateTokens({...userDto})
            await TokenService.saveToken(userDto.id, tokens.refreshToken)
            return {...tokens, user: userDto}
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (user) {
            user.isActivated = true
            await user.save()
            return user.id
        } else {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (user) {
            const isPassEquals = await bcrypt.compare(password, user.password)
            if (isPassEquals) {
                const userDto = new UserDto(user) //id email isActivated
                const tokens = TokenService.generateTokens({...userDto})
                await TokenService.saveToken(userDto.id, tokens.refreshToken)
                return {...tokens, user: userDto}
            } else {
                throw ApiError.BadRequest(`Неверный пароль`)
            }
        } else {
            throw ApiError.BadRequest(`Пользователь ${email} не найден`)
        }
    }

    async logout(refreshToken) {
        await TokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!!refreshToken) {
            const userData = TokenService.validateRefreshToken(refreshToken)
            const tokenFromDB = await TokenService.findToken(refreshToken)
            if (userData || tokenFromDB) {
                const user = await UserModel.findById(userData.id)
                const userDto = new UserDto(user) //id email isActivated
                const tokens = TokenService.generateTokens({...userDto})
                await TokenService.saveToken(userDto.id, tokens.refreshToken)
                return {...tokens, user: userDto}
            } else {
                throw ApiError.UnauthorizedError()
            }
        } else {
            throw ApiError.UnauthorizedError()
        }
    }
    async getUsers(){
        const users = UserModel.find({})
        return users
    }
}

module.exports = new AuthService();
