import request from "supertest";
import app from "../../../../app";
import { User } from "../../../../models/user";
import { shutDownDb, startDb } from "../../../../utils/db";

beforeAll(async () => {
  startDb();
})

afterAll(() => {
  shutDownDb();
})

beforeEach(async () => {
  await User.deleteMany();
})

test("Create user", async () => {  
    await request(app)
      .post("/user/new")
      .send({ email: "dcflodin@gmail.com", password: "1234"})
      .expect(200);
});