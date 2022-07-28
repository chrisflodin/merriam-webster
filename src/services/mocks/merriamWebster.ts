import fs from "fs";
import { Response } from "../../types/response";
import path from "path";
import { promiseHandler } from "../../utils/promise-handler";

const filePath = path.join(path.join(__dirname), "/", "merriam-mock-data.json");

export const mockFetchWord = async () => {
  const mockPromise = new Promise(async (resolve, reject) => {
    await fs.readFile(filePath, (err, data) => {
      if (err) return reject(err);
      const jsonData = JSON.parse(data.toString());

      resolve(jsonData);
    });
  });

  return promiseHandler(mockPromise);
};