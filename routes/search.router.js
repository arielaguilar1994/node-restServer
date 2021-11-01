const { Router } = require('express');

const { searchObject } = require('../controllers/search.controller');

const router = Router();

router.get('/:collection/:word', searchObject);

module.exports = router;