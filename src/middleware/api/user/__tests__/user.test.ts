import { User } from "../../../../models/user";
import { shutDownDb, startDb } from "../../../../utils/db";
import request from "supertest";
import { IUser } from "../../../../types/user";
import { StatusCodes } from "http-status-codes";
import app from "../../../../app";

const mockUser: IUser = {
  email: "dcflodin@gmail.com",
  password: "1234",
};

describe("User", () => {
  beforeEach(async () => {
    await startDb();
    await User.deleteMany();
  });

  test("Create user", async () => {
    await testCreateUser();
  });

  test("Log in user", async () => {
    await testCreateUser();
    await fakeLoginUser();
  });

  afterEach(async () => {
    await User.deleteMany();
    await shutDownDb();
  });
});

const testCreateUser = async () => {
  return request(app)
    .post("/user/new")
    .send({ email: "dcflodin@gmail.com", password: "1234" })
    .expect(StatusCodes.CREATED);
};

const fakeLoginUser = async () => {
  return await request(app).post("/user/login").send(mockUser).expect(StatusCodes.OK);
};
