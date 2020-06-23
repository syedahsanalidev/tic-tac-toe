let express = require('express');
let router = express.Router();

router.use('/v1/games', require('./v1/games'));

module.exports = router;
