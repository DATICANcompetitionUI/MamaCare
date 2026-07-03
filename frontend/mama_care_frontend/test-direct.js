const https = require('https');

const text = "Ẹ n lẹ o";
const lang = "yo";
const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};

https.get(url, options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers['content-type']);
  res.on('data', () => {});
  res.on('end', () => console.log('Done'));
});
