/**
 * Created by austin on 3/3/17.
 */
const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api/', apiRoutes);

module.exports = router;
