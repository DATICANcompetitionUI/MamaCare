import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, language } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Using Bella (a standard free-tier voice that won't trigger the "paid plan required" error)
    const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; 

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY as string,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2', // Supports Yoruba, Igbo, and Hausa
        voice_settings: { stability: 0.5, similarity_boost: 0.75 }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API Error:', errorText);
      throw new Error(`ElevenLabs API returned ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    
    // Return the raw audio data directly as an MP3 audio file
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline; filename="report.mp3"',
      },
    });

  } catch (error) {
    console.error('TTS Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate audio' }, { status: 500 });
  }
}
