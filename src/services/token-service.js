const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require("uuid");
const Tokens = require('../schema/models/token/mongoose-token-models');


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
        const token = await Tokens.findOne({refreshToken})
        return token
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Tokens.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        } else {
            return await Tokens.create({user: userId, refreshToken})
        }
    }

    async tokenDecode(token) {
        const accessToken = token.split(' ')[1]
        return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    }


    async removeToken(refreshToken) {
        await Tokens.deleteOne({refreshToken})
    }
}

module.exports = new TokenService();