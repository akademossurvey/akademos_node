const auth = require('../middleware/authentication');
const router = require('express').Router();
const Survey = require('../controllers/survey-controller');

router.post('/create', Survey.createSurvey)
router.post('/update/:id', Survey.updateSurvey)
router.get('/allsurveys', auth, Survey.getAllSurveys)
router.get('/surveyById/:id', Survey.getSurveyById)
router.get('/getPendingSurveysByUser/:id', Survey.getPendingSurveysOfUser)
router.get('/getCompletedSurveysByUser/:id', Survey.getCompletedSurveysOfUser)
router.post('/create-library', auth, Survey.createLibrary)
router.post('/update-library', auth, Survey.updateLibrary)
router.get('/all-library', auth, Survey.getAllLibrary)
router.get('/library-by-id/:id', auth, Survey.getLibraryById)

module.exports = router;