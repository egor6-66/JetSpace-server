const AuthService = require('./auth-service');
const TokenService= require('./token-service');
const FileService = require('./file-service');
const MailService = require('./mail-service');
const NotificationService = require('./notification-service');


const Services = {
    AuthService,
    TokenService,
    FileService,
    MailService,
    NotificationService,
}

module.exports = Services;
