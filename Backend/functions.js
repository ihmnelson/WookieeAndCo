// functions for server.js

function generateDailyGame() {
return Array.from({ length: 24 }, () => Math.floor(Math.random() * 100));
}

function generateID() {
    const userDataRaw = fs.readFileSync('./data/data.json', 'utf-8');
    const userData = JSON.parse(userDataRaw);
    const newID = randomInt(1000,9999);
    if (userData[newID]) {
        return generateID();
    } else {
        return newID;
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


  
module.exports = generateDailyGame;