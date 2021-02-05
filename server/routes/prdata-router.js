const express = require('express');

const PrDataCtrl = require('../controllers/prdata-ctr');

const router = express.Router();

router.post('/prdata', PrDataCtrl.createPrData);
router.put('/prdata/:id', PrDataCtrl.updatePrData);
router.delete('/prdata/:id', PrDataCtrl.deletePrData);
router.get('/prdata/:id', PrDataCtrl.getPrDataById);
router.get('/prdatas', PrDataCtrl.getPrDatas);

module.exports = router;