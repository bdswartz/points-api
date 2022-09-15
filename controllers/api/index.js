const router = require('express').Router();
const transactionRoutes = require('./transactionRoutes');

router.use(transactionRoutes);

module.exports = router;