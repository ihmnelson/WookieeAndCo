const fs = require('fs');
const path = require('path');


function newDataFile() {
    let identity = randomizeID();
    let isUnique = false;
    while(!isUnique) {
        identity = randomizeID();
    }
    

    const jsonData = JSON.stringify(identity, null, 2); // The '2' adds indentation for readability

    const filePath = path.join(__dirname, 'ID.json'); // Define the file path

    fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("Successfully wrote to file");
        }
    });
}

function randomizeID() {
    let builder = "";
    for(let i = 0; i < 4; i++) {
        let randNum = Math.floor(Math.random()*10);
        builder.concat(randNum);
    }

    return randNum;

}

//function for id (takes filename to write)
function newID(filepath) {

}

//function for writing to the json file containing id.
function verifyID(filepath) {
    
}



function IDLocator(ID) {
    const jsonString = JSON.stringify("data_test.json");
    return jsonString.includes(ID);
}
