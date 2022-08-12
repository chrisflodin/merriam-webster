import { MerriamWord } from "../types/merriamWebster";

interface Target {
  tuuid: string;
  tsrc: string;
}

interface Meta {
  id: string;
  uuid: string;
  src: string;
  section: string;
  target: Target;
  stems: string[];
  syns: string[][];
  ants: string[][];
  offensive: boolean;
}

interface Hwi {
  hw: string;
}

interface Def {
  sseq: any[][][];
}

export interface RootObject {
  meta: Meta;
  hwi: Hwi;
  fl: string;
  def: Def[];
  shortdef: string[];
}

export const deserializeMerriamData = (data: [RootObject]): MerriamWord => {
  const word = data[0];
  const { meta, shortdef } = word;

  return {
    id: meta.id,
    senses: meta.syns.map((word, i) => {
      return {
        meaning: shortdef[i],
        synonyms: meta.syns[i],
        antonyms: meta.ants[i],
      };
    }),
  };
};
