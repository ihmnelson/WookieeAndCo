const helperFunctions = require('./functions/myFunctions');
console.log(add(2, 3)); // 5
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors()); // ← this is all you need for CORS
app.use(express.json()); // to accept JSON body data if needed

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.post('/api/signup', (req,res) => {
  // needs to be implemented (NEW USER)
}); 

app.patch('/api/game', (req, res) => {
  // needs to be implemented (USER CHECKS OR UNCHECKS BOX, maybe saves? anyways EXISTING USER PLAYS)
=======
app.get('/users/:id', (req, res) => {
  // TODO: show specific user
});

app.post('/users/signup/:id', (req,res) => {
  // TODO: SIGNUP
}); 

app.post('/users/login/:id', (req, res) => {
  // TODO: LOGIN
});

app.patch('/users/changepassword/:id', (req, res) => {
  // TODO: update user file (new password)
});

app.patch('/users/changeusername/:id', (req, res) => {
  // TODO: update user file (new username)
});

app.patch('/game/update/:id', (req, res) => {
  // TODO: update user file (gameplay)
});

app.get('/api/game', (req, res) => {
  // needs to be implemented 
});