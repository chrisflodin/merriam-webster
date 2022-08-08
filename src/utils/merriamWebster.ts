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

export const deserializeMerriamData = (data: RootObject): MerriamWord => {
  return {
    id: data.meta.id,
    senses: data.meta.syns.map((word, i) => {
      return {
        meaning: data.shortdef[i],
        synonyms: data.meta.syns[i],
        antonyms: data.meta.ants[i],
      };
    }),
  };
};
