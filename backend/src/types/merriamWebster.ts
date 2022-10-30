export interface Word {
  meaning: string;
  synonyms: string[];
  antonyms: string[];
}

export interface MerriamWord {
  id: string;
  senses: Word[];
}
