require('dotenv').config();

const fs = require('fs');

//Check if the given directory exists
if (!fs.existsSync(process.env.DIRECTORY)) {
    return console.error(`Directory "${process.env.DIRECTORY}" does not exist!`)
}

console.log(process.env.DIRECTORY);

let directories = [process.env.DIRECTORY];
let files = [];

while (directories.length) {
    let directory = fs.readdirSync(directories[0], { withFileTypes: true });

    for (i = 0; i < directory.length; i++) {
        if (directory[i].isFile()) {
            files.push(`${directories[0]}/${directory[i].name}`);
        } else if (directory[i].isDirectory()) {
            directories.push(`${directories[0]}/${directory[i].name}`);
        }
    }

    directories.shift();
}

if (!fs.existsSync('files.txt')) {
    fs.writeFileSync('files.txt', files.join('\n'));

    return console.log('New file "files.txt" created successfully!');
}

let oldFiles = fs.readFileSync('files.txt', 'utf-8').split('\n');

let deletion = false;

for (let i = 0; i < oldFiles.length && !deletion; i++) {
    if (!files.includes(oldFiles[i])) {
        console.log(`File "${oldFiles[i]}" has been deleted!`);
        deletion = true;
    }
}

fs.writeFileSync('files.txt', files.join('\n'));

//if(!deletion) {
//    return console.log('No files have been deleted!');
//}

// Do a webrequest to finish the gamify task using the api
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

fetch(process.env.API_URL);

console.log('Done');