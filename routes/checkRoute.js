const express = require('express');
const router = express.Router();
const authMW = require('../middleware/authMW')

const checkController = require('../controllers/checkController');

router.post('/', authMW,checkController.createCheck);
router.post('/stop', authMW,checkController.stopCheck);
router.delete('/delete', authMW,checkController.deleteCheck);



module.exports = router;