const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authenticateToken, authorizePermission } = require('../middleware/authMiddleware');

// CREATE (POST) and READ ALL (GET)
router.route('/')
    .post(
        authenticateToken,
        authorizePermission(['comments:create']),
        commentController.createComment
    )
    .get(
        authenticateToken,
        authorizePermission(['comments:read']),
        commentController.getComments
    );

// READ ONE (GET), UPDATE (PUT), DELETE (DELETE) by ID
router.route('/:id')
    .get(
        authenticateToken,
        authorizePermission(['comments:read']),
        commentController.getCommentById
    )
    .put(
        authenticateToken,
        authorizePermission(['comments:update']),
        commentController.updateComment
    )
    .delete(
        authenticateToken,
        authorizePermission(['comments:delete']),
        commentController.deleteComment
    );

module.exports = router;