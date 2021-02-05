const express = require('express');

const PersonalDataCtrl = require('../controllers/personaldata-ctrl');

const router = express.Router();

router.post('/personaldata', PersonalDataCtrl.createPersonalData);
router.put('/personaldata/:id', PersonalDataCtrl.updatePersonaldata);
router.delete('/personaldata/:id', PersonalDataCtrl.deletePersonalData);
router.get('/personaldata/:id', PersonalDataCtrl.getPersonalDataById);
router.get('/personaldatas', PersonalDataCtrl.getPersonalDatas);

module.exports = router;