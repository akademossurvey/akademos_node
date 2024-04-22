const auth = require('../middleware/authentication');
const router = require('express').Router();
const Admin = require('../controllers/admin-controller');

router.post('/create', Admin.createAdmin)
router.get('/allAdmin', auth, Admin.getAllAdmins)
router.post('/update/:id', Admin.updateAdmin)
router.post('/login', Admin.adminLogin)

module.exports = router;