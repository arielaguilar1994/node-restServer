const express = require('express');
const router = express.Router();

const { getUser,
        putUser,
        postUser,
        deleteUser } = require('../controllers/user.controller');

// const router = Router();

router.get( '/', getUser );

router.put( '/:id', putUser );

router.post('/', postUser );

router.delete('/', deleteUser );

module.exports = router;