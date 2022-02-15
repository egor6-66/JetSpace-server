const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require("uuid");
const TokenModel = require('../models/token-model');


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
       const token = await TokenModel.findOne({refreshToken})
        return token
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        } else {
            return await TokenModel.create({user: userId, refreshToken})
        }
    }

    async removeToken(refreshToken) {
        await TokenModel.deleteOne({refreshToken})
    }
}

module.exports = new TokenService();