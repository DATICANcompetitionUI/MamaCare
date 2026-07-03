const fs = require('fs');

async function test() {
  const { EdgeTTS } = require('edge-tts-universal');
  const tts = new EdgeTTS({ voice: "yo-NG-OpeyemiNeural" });
  
  // It probably just uses tts.synthesize(text)
  // or maybe it's `new Communicate(text, voice)`
  const { Communicate } = require('edge-tts-universal');
  const communicate = new Communicate("Ẹ n lẹ o. Báwo ni nǹkan?", "yo-NG-OpeyemiNeural");
  
  const chunks = [];
  for await (const chunk of communicate.stream()) {
    if (chunk.type === 'audio') {
      chunks.push(chunk.data);
    }
  }
  const buffer = Buffer.concat(chunks);
  console.log('Buffer length from stream:', buffer.length);
}

test().catch(console.error);
