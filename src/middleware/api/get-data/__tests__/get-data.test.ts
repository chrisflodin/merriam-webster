import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../../../app";
import { IUser } from "../../../../types/user";
import mongoose from "mongoose";
import { User } from "../../../../models/user";
import { shutDownDb, startDb } from "../../../../utils/db";
jest.mock("../merriam-webster");

const userId = new mongoose.Types.ObjectId();

const userData: IUser = {
  _id: userId.toString(),
  email: "alba.cross@gmail.com",
  password: "1234",
  tokens: [
    {
      token: jwt.sign({ _id: userId.toString() }, process.env.JWT_SECRET!),
    },
  ],
};

describe("Fetch data", () => {
  test("temp", () => {});
  beforeAll(async () => {
    await startDb();
    await User.deleteMany();
    const user = await new User(userData).save();
  });

  it("should fetch merriam webster data", async () => {
    await request(app)
      .get("/user/fetch-data/?search=strength")
      .set("Authorization", `Bearer ${userData.tokens![0].token}`)
      .expect(200);
  });

  afterAll(async () => {
    await User.deleteMany();
    await shutDownDb();
  });
});
