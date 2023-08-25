const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
} = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser);

module.exports = router;