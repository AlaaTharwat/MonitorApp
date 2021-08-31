
const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController')

router.post('/register' , userController.createUser);
router.get('/confirmation/:id/:token', userController.emailConfirmation);



module.exports = router;
