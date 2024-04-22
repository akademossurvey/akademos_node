const auth = require('../middleware/authentication');
const router = require('express').Router();
const Settings = require('../controllers/settings-controller');

router.post('/create/:id', auth, Settings.createSettings)
router.get('/getsettings', Settings.getSettings)

module.exports = router;