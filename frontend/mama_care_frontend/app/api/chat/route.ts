import { NextResponse } from 'next/server';

const MOCK_RESPONSES: Record<string, string[]> = {
  en: [
    "Hello! I am MamaCare AI. How are you feeling today?",
    "That sounds completely normal for this stage of your pregnancy. Make sure to drink plenty of water.",
    "If your headache persists for more than a few hours, please visit your nearest clinic.",
    "Eating leafy greens like spinach will help boost your iron levels. Do you have any other questions?"
  ],
  yo: [
    "Ẹ n lẹ o. Èmi ni MamaCare AI. Báwo ni ara yín ṣe rí lónìí?",
    "Ìyẹn jẹ́ nǹkan tó wọ́pọ̀ lásìkò oyún yìí. Ẹ rí i pé ẹ ń mu omi dáadáa.",
    "Tí ẹ̀fọ́rí yẹn kò bá lọ lẹ́yìn wákàtí díẹ̀, ẹ jọ̀wọ́ ẹ lọ sí ilé-ìwòsàn tó súnmọ́ yín jù.",
    "Jíjẹ ẹ̀fọ́ yóò ṣèrànwọ́ láti fún ẹ̀jẹ̀ yín lókun. Ṣé ẹ tún ní ìbéèrè míì?"
  ],
  ig: [
    "Ndewo! Abụ m MamaCare AI. Kedu ka ahụ gị dị taa?",
    "Nke ahụ bụ ihe kwesịrị ekwesị n'oge afọ ime a. Biko hụ na ị na-aṅụ mmiri nke ọma.",
    "Ọ bụrụ na isi ọwụwa ahụ akwụsịghị mgbe awa ole na ole gasịrị, biko gaa ụlọ ọgwụ kacha nso.",
    "Iri inine ga-enyere aka ịbawanye ọbara gị. Ị nwere ajụjụ ọzọ?"
  ],
  ha: [
    "Sannu! Ni ce MamaCare AI. Yaya jikin naki yau?",
    "Wannan abu ne na al'ada a wannan lokacin na ciki. Ki tabbatar kina shan ruwa sosai.",
    "Idan ciwon kai ya ci gaba fiye da 'yan sa'o'i, don Allah ki je asibiti mafi kusa.",
    "Cin ganyayyaki zai taimaka wajen kara yawan jininki. Ko kina da wata tambaya?"
  ]
};

export async function POST(req: Request) {
  try {
    const { text, language } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const lang = language?.toLowerCase().trim() || 'en';
    
    // Select a random response from the language array, or fallback to English
    const responses = MOCK_RESPONSES[lang] || MOCK_RESPONSES['en'];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Simulate AI processing delay (1 to 2.5 seconds)
    const delay = Math.floor(Math.random() * 1500) + 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    return NextResponse.json({ 
      response: randomResponse 
    });

  } catch (error) {
    console.error('Chat AI Error:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
