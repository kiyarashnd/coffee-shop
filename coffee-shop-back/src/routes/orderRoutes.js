const express = require('express');
const router = express.Router();
const { getAllOrders } = require('../controllers/orderController');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', authenticateToken, isAdmin, getAllOrders);
router.get('/my', authenticateToken, getMyOrders);

module.exports = router;
