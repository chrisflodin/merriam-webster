export const WordFilterMap: Map<string, boolean> = new Map();

["strength", "intellect", "dexterity"].forEach((word, i, arr) => {
  if (i === 0) {
    WordFilterMap.set(word, true);
    return;
  }
  WordFilterMap.set(word, false);
});

export const DefaultWord = Array.from(WordFilterMap)[0][0] || "";
