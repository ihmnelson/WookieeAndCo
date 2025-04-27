const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const fs = require('fs');
const generateDailyGame = require('./functions');

app.use(cors()); // ← this is all you need for CORS
app.use(express.json()); // to accept JSON body data if needed

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/users/:id', (req, res) => {
  // asks the server for an id's username, today's game, and streak
});

app.post('/users/signup/:id', (req,res) => {
  // tells the server to sign up a new user, returns a signal to send the user to the login page
}); 

app.post('/users/login/:id', (req, res) => {
  // tells the server to login with credentials
});

app.patch('/users/changepassword/:id', (req, res) => {
  // tells the server that the user changed their password
});

app.patch('/users/changeusername/:id', (req, res) => {
  // tells the server that the user changed their name
});

app.patch('/game/update/:id', (req, res) => {
  // tells the server that the user clicked a tile
});

app.get('/game/today', (req, res) => {
  // Read existing games
  const dataRaw = fs.readFileSync('./data/days.json', 'utf8');
  const data = JSON.parse(dataRaw);

  // Get today's date
  const today = new Date().toISOString().split('T')[0];

  // See if today's game already exists
  let todays_game = data[today];

  if (!todays_game) {
    // If not, generate it
    const newGame = generateDailyGame();
    data[today] = newGame;
    todays_game = newGame;

    // Save it to the file immediately
    fs.writeFileSync('./data/days.json', JSON.stringify(data, null, 2));
  }

  // Now ALWAYS respond with today's game
  res.json(todays_game);
});
