const jwt = require('jsonwebtoken');
const {MongooseModels} = require('../schema/models')


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.LIFE_TIME_ACCESS_TOKEN})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.LIFE_TIME_REFRESH_TOKEN})
        return {
            accessToken,
            refreshToken,
        }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (e) {
            return null
        }
    }

    async findToken(refreshToken) {
        const token = await MongooseModels.Token.findOne({refreshToken})
        return token
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await MongooseModels.Token.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        } else {
            return await MongooseModels.Token.create({user: userId, refreshToken})
        }
    }

    async tokenDecode(token) {
        const accessToken = token.split(' ')[1]
        return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    }


    async removeToken(refreshToken) {
        await MongooseModels.Token.deleteOne({refreshToken})
    }
}

module.exports = new TokenService();
