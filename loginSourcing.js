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
    * Verifies the provided username and password against the stored hashed password.
    * @param {string} username The username of the user trying to log in.
    * @param {string} password The password provided by the user.
    * @returns {object|null} -  The user's data if the password is correct, null otherwise.
    */
    async verifyLogin(username, password) {
      for (const userId in this.data) {
        const user = this.data[userId];
        if (user.username === username) {
          try {
            if (await bcrypt.compare(password, user.cached_password)) {
              return user; // Return the whole user object if verification is successful
            } else {
              return null; // Password incorrect
            }
          } catch (error) {
            console.error('Error comparing passwords:', error);
            return null; // Error during comparison
          }
        }
      }
      return null; // User not found
    }

    /**
    * Retrieves user data after successful login.  This function now exists
    * @param {string} username The username of the logged-in user.
    * @returns {object|null} - The user's data, or null if not found.
    */
    async getUserDataAfterLogin(username) {
      const user = await this.verifyLogin(username, password); // Reuse the verifyLogin function
      if (user) {
        return {
          streak: user.streak,
          todays_data: user.todays_data,
          //total_blackouts: user.total_blackouts,
        };
      }
      return null;
    }
  
    addUser(userData) {
      const newUserId = this.generateUniqueId(); // Generate a unique ID
      const newUser = {
        ...userData, // Copy existing user data
        streak: 0,
        todays_data: Array(25).fill(false), // Initialize with 25 false
      };
      this.data[newUserId] = userData; // Add the new user data with the ID as the key.
      this.writeData(this.data); // Write the updated data to the JSON file
      return newUserId; // Return the new user ID
    }


    /**
    * Updates user data based on changes from the frontend.
    * @param {string} userId The ID of the user to update.
    * @param {object} newData An object containing the updated user data.
    * This object should contain only the fields that need to be updated.
    * e.g., { streak: 5, todays_data: [1, 0, 1, ...] }
    * @returns {boolean} True if the update was successful, false otherwise.
    */
    updateUserData(userId, newData) {
      const user = this.findUserById(userId);
      if (!user) {
        return false; // User not found
      }

      // Update the user's data with the new values.
      //  Iterate through the keys in newData, and only update the properties that are provided.
      for (const key in newData) {
        if (newData.hasOwnProperty(key)) {
          user[key] = newData[key];
        }
      }
      this.writeData(this.data); // Save the changes to the JSON file.
      return true; // Update successful
    }
}