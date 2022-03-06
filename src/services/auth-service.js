const {MongooseModels} = require('../schema/models');
const {MailService, TokenService,} = require('../services')
const ApiError = require('../exceptions/api-error');
const UserDto = require('../dtos/user-dto');
const bcrypt = require("bcrypt");
const {v4: uuidv4} = require('uuid');


class AuthService {
    async registration(name, email, password) {
        const candidate = await MongooseModels.User.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь ${email} уже зарегистрирован!`)
        } else {
            const hashPassword = await bcrypt.hash(password, 3)
            const activationLink = uuidv4()
            const user = await MongooseModels.User.create({
                name,
                email,
                password: hashPassword,
                activationLink
            })
            await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)
            const userDto = UserDto(user)
            const tokens = TokenService.generateTokens({...userDto})
            await TokenService.saveToken(userDto.id, tokens.refreshToken)
            return {...tokens, user: userDto}
        }
    }

    async activate(activationLink) {
        const user = await MongooseModels.User.findOne({activationLink})
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
        const user = await MongooseModels.User.findOne({email})
        if (user) {
            const isPassEquals = await bcrypt.compare(password, user.password)
            if (isPassEquals) {
                // const userDto = new UserDto(user)
                const userDto = UserDto(user)
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
        const user = await MongooseModels.User.findById(userId)
        user.isOnline = false
        await user.save()
        await TokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!!refreshToken) {
            const userData = TokenService.validateRefreshToken(refreshToken)
            const tokenFromDB = await TokenService.findToken(refreshToken)
            if (userData || tokenFromDB) {
                const user = await MongooseModels.User.findById(userData.id)
                const userDto = UserDto(user)
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
