import fs from 'fs';
import path from 'path';

class UserData {
    constructor(filepath) {
      this.filepath = filepath;
      this.data = this.readData();
    }
  
    readData() {
      try {
        const fileContent = fs.readFileSync(this.filepath, 'utf8');
        return JSON.parse(fileContent);
      } catch (error) {
        console.error(`Error: Could not read or parse JSON file: ${error}`);
        return {}; // Returning an empty object to avoid errors
      }
    }
  
    writeData(data) {
      try {
        const jsonString = JSON.stringify(data, null, 2);
        fs.writeFileSync(this.filepath, jsonString);
      } catch (error) {
        console.error(`Error writing to JSON file: ${error}`);
      }
    }
  
    findUserById(userId) {
      return this.data[userId] || null;
    }

    findUserByUsername(username) {
      for (const userId in this.data) {
        if (this.data[userId].username === username) {
          return this.data[userId]; // Return the whole user object
        }
      }
      return null; // User not found
    }

    /**
   * Verifies the provided password against the stored hashed password.
   * @param {string} username The username of the user trying to log in.
   * @param {string} password The password provided by the user.
   * @returns {boolean} True if the password is correct, false otherwise.
   */
    async verifyPassword(username, password) {
      const user = this.findUserByUsername(username);
      if (!user) {
        return false; // User not found
      }

      try {
        // Using bcrypt.compare() to compare the provided password with the stored hashed password.
        return await bcrypt.compare(password, user.cached_password);
      } catch (error) {
        console.error('Error comparing passwords:', error);
        return false; // Error during comparison
      }
    }
  
    addUser(userData) {
      const newUserId = this.generateUniqueId(); // Generate a unique ID
      this.data[newUserId] = userData; // Add the new user data with the ID as the key.
      this.writeData(this.data); // Write the updated data to the JSON file
      return newUserId; // Return the new user ID
    }
  }