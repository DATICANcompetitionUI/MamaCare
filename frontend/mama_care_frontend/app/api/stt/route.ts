import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
    }

    // Prepare the form data for ElevenLabs
    const elevenLabsFormData = new FormData();
    elevenLabsFormData.append('file', file, 'audio.webm');
    elevenLabsFormData.append('model_id', 'scribe_v2');

    const response = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY as string,
      },
      body: elevenLabsFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs STT Error:', errorText);
      throw new Error(`ElevenLabs STT API returned ${response.status}`);
    }

    const data = await response.json();
    
    // data.text contains the full transcribed string
    return NextResponse.json({ text: data.text });

  } catch (error) {
    console.error('Speech to Text Error:', error);
    return NextResponse.json({ error: 'Failed to transcribe audio' }, { status: 500 });
  }
}
