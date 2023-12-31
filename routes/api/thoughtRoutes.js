const router = require('express').Router();
//requireing all functions for routing
const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');
//creating endpoints
router.route('/')
    .get(getThoughts)
    .post(createThought);

router.route('/:thoughtId')
    .get(getOneThought)
    .put(updateThought);

router.route('/:thoughtId/:userId')
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(createReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);
module.exports = router;