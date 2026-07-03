const { EdgeTTS } = require('node-edge-tts');

async function test() {
  const tts = new EdgeTTS({
    voice: 'en-US-AriaNeural',
    lang: 'en-US',
    outputFormat: 'audio-24khz-96kbitrate-mono-mp3'
  });
  console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(tts)));
}

test();
