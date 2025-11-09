const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken, authorizePermission } = require('../middleware/authMiddleware');

router.route('/')
    .post(
        authenticateToken,
        authorizePermission(['orders:create']),
        orderController.createOrder
    )
    .get(
        authenticateToken,
        authorizePermission(['orders:read']),
        orderController.getOrders
    );

// (GET) by ID
router.route('/:id')
    .get(
        authenticateToken,
        authorizePermission(['orders:read']),
        orderController.getOrderById
    );
    

module.exports = router;