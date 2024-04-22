const auth = require('../middleware/authentication');
const router = require('express').Router();
const User = require('../controllers/user-controller');

router.post('/create', User.createUser)
router.post('/LoginSignup', User.loginSignup)
router.post('/update/:id', User.updateUser)
router.get('/allCounts', auth, User.getAllCounts)
router.get('/allusers', User.getAllUsers)
router.get('/getByUserId/:id', User.getUserById)
router.post('/logout_fcm', User.userLogout)
router.get('/download/:id', User.download)

module.exports = router;