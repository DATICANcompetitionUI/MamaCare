const https = require('https');

const data = JSON.stringify({
  text: 'Hello world',
  model_id: 'eleven_multilingual_v2'
});

const options = {
  hostname: 'api.elevenlabs.io',
  path: '/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL',
  method: 'POST',
  headers: {
    'Accept': 'audio/mpeg',
    'Content-Type': 'application/json',
    'xi-api-key': 'sk_bec7103085a953fb1429b83fc9a454452eeeec9273e75b78'
  }
};

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
