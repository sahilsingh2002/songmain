const {Router} = require('express');
const { login,callback } = require('../controllers/authControllers');
const router = Router();
router.get('/login',login);
router.get('/callback',callback);
module.exports = router;