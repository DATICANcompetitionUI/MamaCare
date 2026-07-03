const https = require('https');
const fs = require('fs');

const data = JSON.stringify({
  text: 'Hello, this is a test from MamaCare.',
  model_id: 'eleven_multilingual_v2'
});

const options = {
  hostname: 'api.elevenlabs.io',
  path: '/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL', // Bella (premade free voice)
  method: 'POST',
  headers: {
    'Accept': 'audio/mpeg',
    'Content-Type': 'application/json',
    'xi-api-key': 'sk_10032dafb4a389c67f96bbd6351e638b3492616e02e59479'
  }
};

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  const chunks = [];
  res.on('data', (chunk) => chunks.push(chunk));
  res.on('end', () => {
    const body = Buffer.concat(chunks);
    if (res.statusCode === 200) {
      console.log('Success! Audio buffer length:', body.length);
    } else {
      console.log('Error Body:', body.toString());
    }
  });
});

req.on('error', (error) => {
  console.error('Request Error:', error);
});

req.write(data);
req.end();
