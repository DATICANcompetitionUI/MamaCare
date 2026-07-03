const { EdgeTTS } = require('node-edge-tts');

async function test() {
  const tts = new EdgeTTS({
    voice: 'yo-NG-OpeyemiNeural',
    lang: 'yo-NG',
    outputFormat: 'audio-24khz-96kbitrate-mono-mp3'
  });
  
  await tts.ttsPromise('Ẹ n lẹ o. Báwo ni nǹkan?', './test-yo.mp3');
  console.log('Successfully saved to test-yo.mp3');
}

test().catch(console.error);
