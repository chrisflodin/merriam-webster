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

interface RootObject {
  meta: Meta;
  hwi: Hwi;
  fl: string;
  def: Def[];
  shortdef: string[];
}

export const deserializeMerriamData = (data: [RootObject]): MerriamWord => {
  const rootObj = data[0];

  return {
    id: rootObj.meta.id,
    senses: rootObj.meta.syns.map((word, i) => {
      return {
        meaning: rootObj.shortdef[i],
        synonyms: rootObj.meta.syns[i],
        antonyms: rootObj.meta.ants[i],
      };
    }),
  };
};
