//Routing logic
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); 
const multer = require('../middleware/multer-config'); 

const app = require('../app');

const saucesCtrl = require('../controllers/sauces'); 

//Import controllers/sauces.js

//Route to get all the sauces
router.get('/', auth, saucesCtrl.getAllSauce); 
//Route to create a sauce
router.post('/', auth, multer, saucesCtrl.createSauce); 
//Route to get a precise sauce
router.get('/:id', auth, saucesCtrl.getOneSauce);
//Route to modify a sauce
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
//Route to remove a sauce
router.delete('/:id', auth, saucesCtrl.deleteSauce);
//Route to manage likes
router.post('/:id/like', auth, saucesCtrl.likeDislike)

module.exports = router;