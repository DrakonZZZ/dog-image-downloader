const fs = require('node:fs');
const path = require('node:path');
const { json } = require('stream/consumers');

const getData = async (data) => {
  try {
    const endpoint = await fetch(`https://dog.ceo/api/breed/${data}/images`);

    const parseData = await endpoint.json();
    if (endpoint.status !== 200) {
      throw new Error('Page not found ');
    } else {
      fs.writeFile(
        'dog-image-sourec.txt',
        JSON.stringify(parseData.message),
        (err) => {
          if (err) throw err;
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

fs.readFile(path.join(__dirname, 'dog.txt'), 'utf8', (err, data) => {
  if (err) throw err;
  getData(data);
});
