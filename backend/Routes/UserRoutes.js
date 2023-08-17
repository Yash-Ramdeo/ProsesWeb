const express = require('express');
const { registerUser, authUser, allUsers, updateUsers, deleteUser } = require('../Controllers/userController');
const { protect } = require('../Middleware/authMiddleware.js');

const router = express.Router()

router.route('/').post(registerUser).get(protect, allUsers)
router.post('/login', authUser)
router.route('/update').post(updateUsers)
router.route('/delete').post(deleteUser)

module.exports = router;