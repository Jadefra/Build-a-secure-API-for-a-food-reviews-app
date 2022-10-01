const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user'); 

const verifyPassword = require('../middleware/verifyPassword');

//Import to connect new users controllers/users
router.post('/signup', verifyPassword, userCtrl.signup); 
//Import to connect existing users controllers/users
router.post('/login', userCtrl.login); 

module.exports = router;