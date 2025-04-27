// functions for server.js

function generateDailyGame() {
return Array.from({ length: 24 }, () => Math.floor(Math.random() * 100));
}
  
module.exports = generateDailyGame;