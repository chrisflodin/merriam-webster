import request from "supertest";
import { createApp } from "../../app";
import { shutDownDb, startDb } from "../../utils/db";
import { deleteAllUsers } from "../../services/user";
import { createMockUser } from "../../utils/createMockUser";
import { Credentials } from "../../types/user";

interface SaveUserResponse {
  savedUser: {
    email: string;
    _id: string;
    password: string;
  };
  token: string;
}

const app = createApp();

const userCredentials: Credentials = {
  email: "chris.flodin@gmail.com",
  password: "1234",
};

describe("User routes", () => {
  beforeAll(async () => {
    await startDb();
  });

  afterEach(async () => {
    await deleteAllUsers();
  });

  afterAll(async () => {
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
          })
        );
      });

      it("should only return: EMAIL, ID, TOKEN", async () => {
        const { body }: { status: number; body: SaveUserResponse } = await request(app)
          .post("/user/new")
          .send(userCredentials);

        const { savedUser } = body;

        expect(Object.keys(body)).toEqual(["savedUser", "token"]);
        expect(body).toEqual(
          expect.objectContaining({
            savedUser: expect.any(Object),
            token: expect.any(String),
          })
        );

        expect(Object.keys(savedUser)).toEqual(["email", "_id"]);
        expect(savedUser).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            email: expect.any(String),
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

    describe("given user already exists", () => {
      beforeAll(async () => {
        await createMockUser(userCredentials);
      });

      it("should return a 400 status code", async () => {
        await request(app).post("/user/new").send(userCredentials).expect(400);
      });
    });
  });

  describe("Route: /user/login", () => {
    beforeEach(async () => {
      await createMockUser(userCredentials);
    });

    describe("given user has valid credentials", () => {
      it("should return a 200 status code", async () => {
        await request(app).post("/user/login").send(userCredentials).expect(200);
      });

      it("should only return: EMAIL, ID, TOKEN", async () => {
        const { body }: { status: number; body: SaveUserResponse } = await request(app)
          .post("/user/login")
          .send(userCredentials);

        const { savedUser } = body;

        expect(Object.keys(body)).toEqual(["savedUser", "token"]);
        expect(body).toEqual(
          expect.objectContaining({
            savedUser: expect.any(Object),
            token: expect.any(String),
          })
        );

        expect(Object.keys(savedUser)).toEqual(["email", "_id"]);
        expect(savedUser).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            email: expect.any(String),
          })
        );
      });
    });

    describe("given user has invalid credentials", () => {
      it("should return a 400 status code", async () => {
        await request(app)
          .post("/user/login")
          .send({ email: "invalid email", password: "invalid password" })
          .expect(400);
      });
    });

    describe("given user has no credentials", () => {
      it("should return a 400 status code", async () => {
        await request(app).post("/user/login").expect(400);
      });
    });
  });
});
