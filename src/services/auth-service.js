const bcrypt = require("bcrypt");
const {v4: uuidv4} = require('uuid');

const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const Users = require('../schema/models/user/mongoose-user-models');
const TokenService = require('./token-service');
const MailService = require('./mail-service');


class AuthService {
    async registration(name, email, password) {
        const candidate = await Users.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь ${email} уже зарегистрирован!`)
        } else {
            const hashPassword = await bcrypt.hash(password, 3)
            const activationLink = uuidv4()
            const user = await Users.create({
                name,
                email,
                password: hashPassword,
                activationLink
            })
            await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
            const userDto = new UserDto(user) //id email isActivated
            const tokens = TokenService.generateTokens({...userDto})
            await TokenService.saveToken(userDto.id, tokens.refreshToken)
            return {...tokens, user: userDto}
        }
    }

    async activate(activationLink) {
        const user = await Users.findOne({activationLink})
        if (user) {
            user.isActivated = true
            user.isOnline = true
            await user.save()
            return user.id
        } else {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
    }

    async login(email, password) {
        const user = await Users.findOne({email})
        if (user) {
            const isPassEquals = await bcrypt.compare(password, user.password)
            if (isPassEquals) {
                const userDto = new UserDto(user)
                const tokens = TokenService.generateTokens({...userDto})
                await TokenService.saveToken(userDto.id, tokens.refreshToken)
                user.isOnline = true
                await user.save()
                return {...tokens, user: userDto}
            } else {
                throw ApiError.BadRequest(`Неверный пароль`)
            }
        } else {
            throw ApiError.BadRequest(`Пользователь ${email} не найден`)
        }
    }

    async logout(refreshToken, userId) {
        const user = await Users.findById(userId)
        user.isOnline = false
        await user.save()
        await TokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!!refreshToken) {
            const userData = TokenService.validateRefreshToken(refreshToken)
            const tokenFromDB = await TokenService.findToken(refreshToken)
            if (userData || tokenFromDB) {
                const user = await Users.findById(userData.id)
                const userDto = new UserDto(user) //id email isActivated
                const tokens = TokenService.generateTokens({...userDto})
                await TokenService.saveToken(userDto.id, tokens.refreshToken)
                return {...tokens, user: {...userDto}}
            } else {
                throw ApiError.UnauthorizedError()
            }
        } else {
            throw ApiError.UnauthorizedError()
        }
    }
}

module.exports = new AuthService();
