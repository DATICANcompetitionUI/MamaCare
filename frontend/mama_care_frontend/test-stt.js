const fs = require('fs');

async function testSTT() {
  const fileBuffer = fs.readFileSync('test.mp3');
  const blob = new Blob([fileBuffer], { type: 'audio/mpeg' });
  
  const formData = new FormData();
  formData.append('file', blob, 'test.mp3');
  formData.append('model_id', 'scribe_v2');
  
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
      method: 'POST',
      headers: {
        'xi-api-key': 'sk_10032dafb4a389c67f96bbd6351e638b3492616e02e59479'
      },
      body: formData
    });
    
    console.log(`STATUS: ${response.status}`);
    const text = await response.text();
    console.log('RESPONSE:', text);
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

testSTT();
