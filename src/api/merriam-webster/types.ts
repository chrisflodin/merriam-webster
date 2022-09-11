export interface MerriamWord {
  id: string;
  senses: Word[];
}

export interface Word {
  meaning: string;
  synonyms: string[];
  antonyms: string[];
}
