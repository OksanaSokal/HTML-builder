const fs = require('fs');
const readLine = require('readline');
const process = require('process');

const path = require('path');
const pathFile = path.join(__dirname, '.text.txt');

const writeStream = fs.createWriteStream(pathFile, { flags: 'a' });

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Write your text here:\n');

rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
    process.exit(0);
  } else {
    writeStream.write(`${input}\n`);
  }
});

rl.on('close', () => {
  console.log('Good bay\n');
  process.exit(0);
});
process.on('SIGINT', () => {
  console.log('Good bay\n');
  rl.close();
});
