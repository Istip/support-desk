const express = require('express');
const router = express.Router();
const {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getTickets);
router.get('/:id', protect, getTicket);
router.delete('/:id', protect, deleteTicket);
router.put('/:id', protect, updateTicket);
router.post('/', protect, createTicket);

module.exports = router;
