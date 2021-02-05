const express = require('express');

const FamilyDataCtrl = require('../controllers/familydata-ctrl');

const router = express.Router();

router.post('/familydata', FamilyDataCtrl.createFamilyData);
router.put('/familydata/:id', FamilyDataCtrl.updateFamilyData);
router.delete('/familydata/:id', FamilyDataCtrl.deleteFamilyData);
router.get('/familydata/:id', FamilyDataCtrl.getFamilyDataById);
router.get('/familydatas', FamilyDataCtrl.getFamilyDatas);

module.exports = router;