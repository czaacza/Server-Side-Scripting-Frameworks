const fs = require('fs');
const fsp = require('fs/promises');

function rename() {
  fs.rename('fs/before.json', 'fs/after.json', (err) => {
    if (err) {
      return console.error(err);
    }
  });
}

async function example() {
  const fileName = 'fs/datafile.txt';
  try {
    const data = await fsp.readFile(fileName, 'utf-8');
    console.log(data);
    const content = 'Some content!';
    await fsp.writeFile(fileName, content);
    console.log('Wrote some content!');
    const newData = await fsp.readFile(fileName, 'utf-8');
    console.log(newData);
  } catch (err) {
    console.log(err);
  }
}

example();
