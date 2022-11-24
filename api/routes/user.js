const express = require('express');
const { addUser, getUsers } = require('../controllers/user');
const router = express.Router();

router.post('/user', addUser);
router.get('/users', getUsers);

module.exports = router;
