import request from "supertest";
import { HTTPError } from "superagent";
import { createApp } from "../../app";
import { createUser, deleteAllUsers } from "../../services/userService";
import { UserDTO, SaveUserResponse } from "../../types/user";
import { ServerError } from "../../types/response";

const app = createApp();

const validCredentials: UserDTO = {
  email: "test@gmail.com",
  password: "1234",
};

const invalidCredentials: UserDTO = {
  email: "testgmail.com",
  password: "123",
};

afterEach(async () => {
  await deleteAllUsers();
});

describe("Route: /user/new", () => {
  describe("given user has valid credentials", () => {
    it("should return 201 and possess a correct object structure", async () => {
      const response = await request(app).post("/user/new").send(validCredentials).expect(201);
      const body = response.body as SaveUserResponse;

      expect(response.status).toBe(201);
      expect(body).toEqual(
        expect.objectContaining({
          user: expect.objectContaining({
            _id: expect.any(String),
            email: expect.any(String),
          }),
          token: expect.any(String),
        })
      );
    });
  });
  describe("given user has invalid credentials", () => {
    it("should return 400", async () => {
      await request(app).post("/user/new").send(invalidCredentials).expect(400);
    });
  });
  describe("given user has no credentials", () => {
    it("should return 400", async () => {
      await request(app).post("/user/new").send().expect(400);
    });
  });
  describe("given user already exists", () => {
    it("should return 400", async () => {
      // Arrange
      await createUser(validCredentials);

      // Act & Assert
      const res = await request(app).post("/user/new").send(validCredentials).expect(400);
      const error = res.error as HTTPError;
      const serverError = JSON.parse(error.text) as ServerError;
      expect(serverError.error).toBe("User already exists");
    });
  });
});
