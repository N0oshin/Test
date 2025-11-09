const { pool } = require('../config/db'); 

exports.createComment = async (req, res) => {
    const { content } = req.body;
    const author_id = req.user.id; 

    if (!content) {
        return res.status(400).json({ msg: 'Comment content is required.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO comments (content, author_id) VALUES ($1, $2) RETURNING *',
            [content, author_id]
        );
        res.status(201).json({
            msg: 'Comment created successfully',
            comment: result.rows[0]
        });
    } catch (err) {
        console.error("Database error in createComment:", err.message);
        res.status(500).json({ msg: 'Server error during comment creation.' });
    }
};

// READ All Comments 
exports.getComments = async (req, res) => {
    try {
        // join with the users table to show the author's name
        const query = `
            SELECT c.id, c.content, c.created_at, u.name AS author_name, u.email AS author_email
            FROM comments c
            JOIN users u ON c.author_id = u.id
            ORDER BY c.created_at DESC;
        `;
        const result = await pool.query(query);
        res.status(200).json({
            count: result.rowCount,
            comments: result.rows
        });
    } catch (err) {
        console.error("Database error in getComments:", err.message);
        res.status(500).json({ msg: 'Server error retrieving comments.' });
    }
};

//READ Single Comment by ID 
exports.getCommentById = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `
            SELECT c.id, c.content, c.created_at, u.name AS author_name, u.email AS author_email
            FROM comments c
            JOIN users u ON c.author_id = u.id
            WHERE c.id = $1
        `;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ msg: 'Comment not found.' });
        }

        res.status(200).json({ comment: result.rows[0] });
    } catch (err) {
        console.error("Database error in getCommentById:", err.message);
        res.status(500).json({ msg: 'Server error retrieving comment.' });
    }
};

// UPDATE Comment
exports.updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const user_id = req.user.id;

    if (!content) {
        return res.status(400).json({ msg: 'Comment content is required.' });
    }
    
    try {    
        const result = await pool.query(
            'UPDATE comments SET content = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
            [content, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ msg: 'Comment not found.' });
        }

        res.status(200).json({
            msg: 'Comment updated successfully',
            comment: result.rows[0]
        });
    } catch (err) {
        console.error("Database error in updateComment:", err.message);
        res.status(500).json({ msg: 'Server error during comment update.' });
    }
};

// DELETE Comment 
exports.deleteComment = async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await pool.query('DELETE FROM comments WHERE id = $1 RETURNING id', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ msg: 'Comment not found.' });
        }

        res.status(200).json({ msg: `Comment with ID ${id} deleted successfully.` });
    } catch (err) {
        console.error("Database error in deleteComment:", err.message);
        res.status(500).json({ msg: 'Server error during comment deletion.' });
    }
};