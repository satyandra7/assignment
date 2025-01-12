const router = require('express').Router();
const { getCryptoData, getCryptoDataByCoin, getCryptoDataByDeviation } = require('./controller');


// Crypto routes
router.get('/', getCryptoData);
router.post('/stats', getCryptoDataByCoin);
router.post('/deviation', getCryptoDataByDeviation);

module.exports = router;
