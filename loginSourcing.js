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
  
    findUserById(userId) {
      return this.data[userId] || null;
    }
  }