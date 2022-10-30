import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { createApp } from "../../app";
import { shutDownDb, startDb } from "../../utils/db";
import { UserModel } from "../../models/user";
import * as merriamWebster from "../../services/merriamService";
import { mockFetchWord } from "../../services/mocks/merriamWebster";
import { createUser, deleteAllUsers, saveUser } from "../../services/userService";
import { JWT_SECRET } from "../../consts";
import { UserDTO } from "../../types/user";

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

const validCredentials: UserDTO = {
  email: "test@gmail.com",
  password: "1234",
};

beforeAll(async () => {
  // await startDb();
  await deleteAllUsers();
});

afterAll(async () => {
  // await shutDownDb();
});

afterEach(async () => {
  await deleteAllUsers();
});

describe("Route: /fetch-data/?search=value", () => {
  describe("given a valid query string", () => {
    it("should return a 200 status code", async () => {
      // Arrange
      const res = await createUser(validCredentials);
      const fetchWordMock = jest.spyOn(merriamWebster, "fetchWord").mockReturnValue(mockFetchWord());

      // Act
      const { status } = await request(app)
        .get("/fetch-data/?search=strength")
        .set("Authorization", `Bearer ${res.token}`);

      // Assert
      expect(status).toBe(200);
      expect(fetchWordMock).toHaveBeenCalled();
    });
  });

  describe("given no query string", () => {
    it("should return a 401 status code", async () => {
      // Arrange
      const res = await createUser(validCredentials);

      // Act
      const { status } = await request(app).get("/fetch-data").set("Authorization", `Bearer ${res.token}`);

      // Assert
      expect(status).toBe(401);
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
