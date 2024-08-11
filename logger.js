const fs = require('fs');
const path = require('path');

// Define the path for the log file
const logFilePath = path.join(__dirname, 'search-log.txt');

// Function to log search queries
function logSearch(userId, query) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - User ID: ${userId} - Query: ${query}\n`;

    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Failed to write to log file', err);
        }
    });
}

module.exports = { logSearch };