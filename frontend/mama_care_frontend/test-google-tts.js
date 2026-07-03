const googleTTS = require('google-tts-api');

(async () => {
  try {
    const url = googleTTS.getAudioUrl('Ẹ n lẹ o', {
      lang: 'yo',
      slow: false,
      host: 'https://translate.google.com',
    });
    console.log(url);
    
    // Also test getAudioBase64
    const base64 = await googleTTS.getAudioBase64('Ẹ n lẹ o', {
      lang: 'yo',
      slow: false,
      host: 'https://translate.google.com',
      timeout: 10000,
    });
    console.log("Base64 length:", base64.length);
  } catch (error) {
    console.error(error);
  }
})();
