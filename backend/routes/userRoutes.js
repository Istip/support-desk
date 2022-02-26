const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
// Second argument is a function to protect the route
router.get('/me', protect, getMe);

module.exports = router;
