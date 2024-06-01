const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// Checks endpoint for get and post routes, runs associated function if present
router.route('/').get(getAllUsers).post(createUser);

// Checks endpoint for get, put, and delete routes and runs associated function if present
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);

// Checks endpoint for post and delete routes, runs associated function if present
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;