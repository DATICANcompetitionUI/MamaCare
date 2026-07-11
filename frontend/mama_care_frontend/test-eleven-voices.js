const https = require('https');

const options = {
  hostname: 'api.elevenlabs.io',
  path: '/v1/voices',
  method: 'GET',
  headers: {
    'xi-api-key': 'sk_10032dafb4a389c67f96bbd6351e638b3492616e02e59479'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      if (response.voices) {
        const premade = response.voices.filter(v => v.category === 'premade');
        console.log(`Found ${premade.length} premade voices.`);
        if (premade.length > 0) {
          console.log(`Using ${premade[0].name}: ${premade[0].voice_id}`);
        }
      } else {
        console.log('Error:', data);
      }
    } catch (e) {
      console.log('Parse Error:', e.message, data);
    }
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
