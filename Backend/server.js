const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const fs = require('fs');
const generateDailyGame = require('./functions');
const bcrypt = require('bcrypt');
const generateID = require('./functions');


// On runtime define data to memory
const challengeDataRaw = fs.readFileSync('./data/days.json', 'utf8');
const challengeData = JSON.parse(challengeDataRaw);

const userDataRaw = fs.readFileSync('./data/data.json', 'utf-8');
const userData = JSON.parse(userDataRaw);
const passDataRaw = fs.readFileSync('./data/pass_hashes.json', 'utf-8');
const passData = JSON.parse(passDataRaw);

app.use(cors()); // ← this is all you need for CORS
app.use(express.json()); // to accept JSON body data if needed

// Example API route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/users/:id/:test', (req, res) => {
  // asks the server for an id's username, today's game, and streak
  if (req.params.test === "false") {
    curUser = userData[req.params.id];
  } else if (req.params.test === "true") {
    const testUserDataRaw = fs.readFileSync('./data/data_test.json', 'utf-8');
    const testUserData = JSON.parse(testUserDataRaw);
    curUser = testUserData[req.params.id];
  }else {
    res.status(202).json({message: "bad url (also not sure if 202 is correct code"});
  }

  if (curUser) {
    res.json(curUser);
  } else {
    res.status(404).json({message: 'User not found'});
  }
});

app.post('/users/signup/:test', async (req,res) => {
  if (req.params.test === "false") {
    workingData = userData;
    workingHashes = passData;
  } else if (req.params.test === "true") {
    const testUserDataRaw = fs.readFileSync('./data/data_test.json', 'utf-8');
    const testUserData = JSON.parse(testUserDataRaw);
    const testHashesRaw = fs.readFileSync('./data/pass_hashes_test.json', 'utf-8');
    const testHashes = JSON.parse(testHashesRaw);
    workingData = testUserData;
  }else {
    res.status(202).json({message: "bad url (also not sure if 202 is correct code"});
  }
  // tells the server to sign up a new user, returns a signal to send the user to the login page
    const userId = generateID;   // <-- from the URL
    const { username, password } = req.body;  // <-- from the POST body

    try {
      // Hash the password
      const saltRounds = 10;  // standard secure number
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      console.log('User ID:', userId);
      console.log('Username:', username);
      console.log('Hashed Password:', hashedPassword);
  
      workingData[userID] = {
        "username" : username,
        "streak": 0,
        "todays_data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "friends_ids": []
      }
      // NEED TO ADD PASSWORD STUFF
      workingHashes[userID] = hashedPassword;
  
      res.json({ message: 'Signup successful!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error signing up.' });
    }
  
    // You can now create a user, save them, etc.
    res.json({ message: 'Signup received!' });
});

app.post('/users/login/:id', (req, res) => {
  // tells the server to login with credentials
});

app.patch('/users/changepassword/:id', (req, res) => {
  // tells the server that the user changed their password NOT IMPORTANT FOR NOW
});

app.patch('/users/changeusername/:id', (req, res) => {
  // tells the server that the user changed their name NOT IMPORTANT FOR NOW
});

app.patch('/game/update/:id/:index/:nowselected/:test', (req, res) => {
  // tells the server that the user clicked a tile
  if (req.params.test === "false") {
    curUser = userData[req.params.id];
  } else if (req.params.test === "true") {
    const testUserDataRaw = fs.readFileSync('./data/data_test.json', 'utf-8');
    const testUserData = JSON.parse(testUserDataRaw);
    curUser = testUserData[req.params.id];
  }else {
    res.status(202).json({message: "bad url (also not sure if 202 is correct code"});
  }

  if (req.params.nowselected === "true") {
    var isSelected = 1;
  } else if (req.params.nowselected === "false") {
    var isSelected = 0;
  } else {
    res.status(202).json({message: "you messed up"});
  }

  curUser["todays_data"][req.params.index] = isSelected;
  userData[req.params.id] = curUser;
  fs.writeFileSync('./data/data.json', JSON.stringify(userData, null, 2));
  fs.writeFileSync('./data/data_test.json', JSON.stringify(testUserData, null, 2));
  fs.writeFileSync('./data/pass_hashes.json', JSON.stringify(userData, null, 2));
  fs.writeFileSync('./data/pass_hashes_test.json', JSON.stringify(testUserData, null, 2));

  res.json({curUser});
});

app.get('/game/today', (req, res) => {
  // Read existing games
  // Get today's date
  const today = new Date().toISOString().split('T')[0];

  // See if today's game already exists
  let todays_game = challengeData[today];

  if (!todays_game) {
    // If not, generate it
    const newGame = generateDailyGame();
    data[today] = newGame;
    todays_game = newGame;

    // Save it to the file immediately
    fs.writeFileSync('./data/days.json', JSON.stringify(challengeData, null, 2));
  }

  // Now ALWAYS respond with today's game
  res.json(todays_game);
});
