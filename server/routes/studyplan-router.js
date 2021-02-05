const express = require('express');

const StudyPlanCtrl = require('../controllers/studyplan-ctr');

const router = express.Router();

router.post('/studyplan', StudyPlanCtrl.createStudyPlan);
router.put('/studyplan/:id', StudyPlanCtrl.updateStudyPlan);
router.delete('/studyplan/:id', StudyPlanCtrl.deleteStudyPlan);
router.get('/studyplan/:id', StudyPlanCtrl.getStudyPlanById);
router.get('/studyplans', StudyPlanCtrl.getStudyPlans);

module.exports = router;