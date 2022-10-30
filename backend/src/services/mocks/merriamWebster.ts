import fs from "fs";
import path from "path";
import { MerriamWord } from "../../types/merriamWebster";
import { deserializeMerriamData, RootObject } from "../../utils/merriamWebster";

const filePath = path.join(path.join(__dirname), "/", "merriam-mock-data.json");

export const mockFetchWord = (): Promise<MerriamWord> => {
  const mockPromise: Promise<MerriamWord> = new Promise(async (resolve, reject) => {
    await fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      const jsonData: [RootObject] = JSON.parse(data.toString());
      resolve(deserializeMerriamData(jsonData));
    });
  });

  return mockPromise;
};
