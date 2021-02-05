const express = require('express');

const EdDataCtrl = require('../controllers/eddata-ctr');

const router = express.Router();

router.post('/eddata', EdDataCtrl.createEdData);
router.put('/eddata/:id', EdDataCtrl.updateEdData);
router.delete('/eddata/:id', EdDataCtrl.deleteEdData);
router.get('/eddata/:id', EdDataCtrl.getEdDataById);
router.get('/eddatas', EdDataCtrl.getEdDatas);

module.exports = router;