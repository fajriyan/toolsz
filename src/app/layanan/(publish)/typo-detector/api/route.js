import loadDictionary from "../lib/spellchecker";

export async function POST(req) {
  const { text, lang, exclude } = await req.json();
  const spell = loadDictionary(lang);

  const excludedWords = exclude
    ? exclude.split(",").map((w) => w.trim().toLowerCase())
    : [];

  const words = text.split(/\s+/);
  const errors = [];

  for (const word of words) {
    const cleanWord = word.replace(/[.,!?;:()"]/g, ""); // bersihkan tanda baca
    if (!cleanWord) continue;

    if (excludedWords.includes(cleanWord.toLowerCase())) {
      continue; // skip kata yg ada di exclude list
    }

    if (!spell.correct(cleanWord)) {
      errors.push({
        word: cleanWord,
        suggestions: spell.suggest(cleanWord),
      });
    }
  }

  return Response.json({ errors });
}
