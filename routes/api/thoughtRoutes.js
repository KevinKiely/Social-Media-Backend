const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtsController');

// Checks endpoint for get route, if not present then tries post route
router.route('/').get(getAllThoughts).post(createThought);

// Checks endpoint for get route route, then put route, then delete route
router.route('/:thoughtId').get(getThoughtsById).put(updateThought).delete(deleteThought);

// Checks endpoint for post route
router.route('/:thoughtId/reactions').post(createReaction);

// Checks endpoint for delete route
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;