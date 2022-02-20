const Router = require('express').Router;
const { body } = require('express-validator');

const authMiddleware = require('../middlewares/auth-middleware');
const authController = require('../controllers/auth-controller');
const fileController = require('../controllers/file-controller');

const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 5, max: 50}),
    authController.registration
);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
// router.post('/imgUpload',authMiddleware, fileController.imgUpload);
router.post('/imgUpload', fileController.imgUpload);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);

module.exports = router;
