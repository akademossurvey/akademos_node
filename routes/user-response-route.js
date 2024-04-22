const auth = require('../middleware/authentication');
const router = require('express').Router();
const Userresponse = require('../controllers/user-response-controller');


router.post('/create', Userresponse.createUserResponse)
router.get('/get-all-user-responses', auth, Userresponse.getAllUserResponses)
router.get('/get-user-responseById/:id/:surveyId', Userresponse.getUserResponsesBySurveyUserId)
router.get('/get-user-responseBySurveyId/:surveyId', Userresponse.getUserResponsesBySurveyId)
router.post('/update/:id', Userresponse.updateUserResponse)

module.exports = router;