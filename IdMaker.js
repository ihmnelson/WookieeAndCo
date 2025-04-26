import fs from 'fs';
import path from 'path';

/**
 * Generates a unique ID, checks for its existence in a JSON file, and returns it.
 *
 * @param {string} filepath - The path to the JSON file.
 * @returns {string|null} - A unique ID that is not already a key in the JSON file,
 * or null if there are issues with file access or JSON handling.
 */
function generateUniqueId(filepath) {
    try {
        // Ensuring the directory exists
        const directory = path.dirname(filepath);
        if (directory && !fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        let existingData = {};
        if (fs.existsSync(filepath)) {
            try {
                const fileContent = fs.readFileSync(filepath, 'utf8');
                existingData = fileContent ? JSON.parse(fileContent) : {};
            } catch (error) {
                console.warn("Warning: JSON file is empty or invalid. Returning a new ID.");
                existingData = {};
            }
        }

        // Generating and checking ID:
        while (true) {
            const newId = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Generate a 4-digit ID
            if (!(newId in existingData)) {
                return newId; // Found a unique ID, return it
            }
            // console.log(`Collision: ID ${newId} already exists. Retrying.`);
        }
    } catch (error) {
        console.error(`Error: Could not read or create file: ${error}`);
        return null;
    }
}

export default generateUniqueId;
