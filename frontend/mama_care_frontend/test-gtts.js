const gTTS = require('gtts');

const langs = ['en', 'yo', 'ig', 'ha'];

for (const lang of langs) {
  try {
    const gtts = new gTTS('Hello', lang);
    console.log(`Successfully initialized gTTS for ${lang}`);
  } catch (error) {
    console.error(`Error for ${lang}:`, error.message);
  }
}
