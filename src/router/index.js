const Router = require('express').Router;
const {body} = require('express-validator');

const authController = require('../controllers/auth-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 5, max: 50}),
    authController.registration
);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);
router.get('/users',authMiddleware, authController.getUsers);

module.exports = router;