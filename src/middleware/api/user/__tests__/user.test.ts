import request from "supertest";
import { UserModel } from "../../../../models/user";
import { shutDownDb, startDb } from "../../../../utils/db";
import { createApp } from "../../../../app";
import { IUser } from "../../../../types/user";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

const app = createApp();

const mockUser: IUser = {
  email: "dcflodin@gmail.com",
  password: "1234",
};

describe("User", () => {
  beforeEach(async () => {
    await startDb();
    await UserModel.deleteMany();
  });

  it("creates a user", async () => {
    await testCreateUser();
  });

  test("login user", async () => {
    await testCreateUser();
    await fakeLoginUser();
  });

  afterEach(async () => {
    await UserModel.deleteMany();
    await shutDownDb();
  });
});

const testCreateUser = async () => {
  return request(app).post("/user/new").send(mockUser).expect(StatusCodes.CREATED);
};

const fakeLoginUser = async () => {
  return await request(app).post("/user/login").send(mockUser).expect(StatusCodes.OK);
};
