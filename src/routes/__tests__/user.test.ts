import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { createApp } from "../../app";
import { IUser } from "../../types/user";
import { shutDownDb, startDb } from "../../utils/db";
import { UserModel } from "../../models/user";
import * as merriamWebster from "../../services/merriamWebster";
import { mockFetchWord } from "../../services/mocks/merriamWebster";
import { deleteAllUsers, saveUser } from "../../services/user";

interface SaveUserResponse {
  savedUser: {
    email: string;
    _id: string;
    __v: number;
  };
  token: string;
}

const app = createApp();

const userCredentials = {
  email: "chris@gmail.com",
  password: "1234",
};

describe("User Routes", () => {
  beforeAll(async () => {
    await startDb();
  });

  afterAll(async () => {
    await deleteAllUsers();
    await shutDownDb();
  });

  describe("Route: /user/new", () => {
    describe("given user has valid credentials", () => {
      it("should return a 201 status code", async () => {
        const { status, body }: { status: number; body: SaveUserResponse } = await request(app)
          .post("/user/new")
          .send(userCredentials);

        const { savedUser, token } = body;

        expect(status).toBe(201);
        expect(token).toEqual(expect.any(String));
        expect(savedUser).toEqual(
          expect.objectContaining({
            email: expect.any(String),
            _id: expect.any(String),
            __v: expect.any(Number),
          })
        );
      });
    });

    describe("given user has invalid credentials", () => {
      it("should return a 400 status code", async () => {
        await request(app).post("/user/new").send({ email: "invalid email", password: "invalid password" }).expect(400);
      });
    });

    describe("given user has no credentials", () => {
      it("should return a 400 status code", async () => {
        await request(app).post("/user/new").expect(400);
      });
    });
  });
});
