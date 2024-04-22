const auth = require('../middleware/authentication');
const router = require('express').Router();
const Notification = require('../controllers/notification-controller');

router.get('/all', Notification.getAllNotification)
router.get('/getByUserId/:id', Notification.getNotificationByUserId)
router.get('/deleteByUserId/:_id', Notification.deleteByUserId)
router.get('/allNotification', auth, Notification.getAllAdminNotification)
router.post('/send', Notification.sendAdminNotification)
router.post('/deleteByNotifId', Notification.deleteAdminNotification)

module.exports = router;