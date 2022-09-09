import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { createApp } from "../../app";
import { shutDownDb, startDb } from "../../utils/db";
import { UserModel } from "../../models/user";
import * as merriamWebster from "../../services/merriamService";
import { mockFetchWord } from "../../services/mocks/merriamWebster";
import { deleteAllUsers, saveUser } from "../../services/userService";
import { JWT_SECRET } from "../../consts";

const app = createApp();

const userId = new mongoose.Types.ObjectId();
const token = jwt.sign({ _id: userId.toString() }, JWT_SECRET);

const userData = {
  _id: userId.toString(),
  email: "chris.flodin@gmail.com",
  password: "1234",
  tokens: [
    {
      token: token,
    },
  ],
};

describe("Merriam webster Routes", () => {
  describe("Route: /fetch-data/?search=value", () => {
    beforeAll(async () => {
      await startDb();
      const user = await new UserModel(userData);
      await saveUser(user);
    });

    afterAll(async () => {
      await deleteAllUsers();
      await shutDownDb();
    });

    describe("given a valid query string", () => {
      it("should return a 200 status code", async () => {
        const fetchWordMock = jest.spyOn(merriamWebster, "fetchWord").mockReturnValue(mockFetchWord());

        await request(app)
          .get("/fetch-data/?search=strength")
          .set("Authorization", `Bearer ${userData.tokens![0].token}`)
          .expect(200);

        expect(fetchWordMock).toHaveBeenCalled();
      });
    });

    describe("given no query string", () => {
      it("should return a 401 status code", async () => {
        await request(app).get("/fetch-data").set("Authorization", `Bearer ${userData.tokens![0].token}`).expect(401);
      });
    });

    describe("given the user does not have a JWT", () => {
      it("should return a 401 status code", async () => {
        await request(app).get("/fetch-data/?search=strength").expect(401);
      });
    });

    describe("given the user has an invalid JWT", () => {
      it("should return a 401 status code", async () => {
        await request(app).get("/fetch-data/?search=strength").set("Authorization", `Bearer 1234`).expect(401);
      });
    });
  });
});
