const express = require('express');
const homeController = require('../controller/homeController');
const router = express.Router();

router.get('/',homeController.home);
router.get('/login',homeController.loginPage);
router.get('/signup',homeController.signupPage);

router.post('/signup',homeController.signup);
router.post('/login', homeController.login);

module.exports = router;