import fs from "fs";
import path from "path";
import { RootObject } from "../../utils/merriamWebster";

const filePath = path.join(path.join(__dirname), "/", "merriam-mock-data.json");

export const mockFetchWord = (): Promise<RootObject | null> => {
  const mockPromise: Promise<RootObject | null> = new Promise(async (resolve, reject) => {
    await fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      const jsonData: RootObject = JSON.parse(data.toString());
      resolve(jsonData);
    });
  });

  return mockPromise;
};
