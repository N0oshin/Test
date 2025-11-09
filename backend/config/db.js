// config/db.js

const { Pool } = require('pg');

// Configuration object for the PostgreSQL connection pool
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

/**
 * Function to test the database connection.
 */
const connectDB = async () => {
    try {
        await pool.query('SELECT NOW()'); 
        console.log('🔗 PostgreSQL connected successfully.');
    } catch (err) {
        console.error('❌ PostgreSQL connection error:', err.message);
        // Exit process on failure (critical step)
        process.exit(1);
    }
};

// Export the pool instance for executing queries, and the connection function.
module.exports = {
    pool,
    connectDB,
};