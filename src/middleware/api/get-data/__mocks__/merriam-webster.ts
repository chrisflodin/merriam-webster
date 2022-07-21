import fs from "fs";

const filePath = "src/middleware/api/get-data/__tests__/merriam-mock-data.json";

export const fetchWord = async (search: string) => {
  return new Promise(async (resolve) => {
    await fs.readFile(filePath, (err, data) => {
      const jsonData = JSON.parse(data.toString());
      resolve(jsonData);
    });
  });
};
