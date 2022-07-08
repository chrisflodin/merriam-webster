import { User } from "../../../../models/user";
import { shutDownDb, startDb } from "../../../../utils/db";
import { fakeCreateUser, fakeLoginUser } from "../../../../utils/tests/userSuperTest";

beforeAll(async () => {
  startDb();
});

beforeEach(async () => {
  await User.deleteMany();
});

describe("User", () => {
  test("Create user", async () => {
    await fakeCreateUser();
  });

  test("Log in user", async () => {
    await fakeCreateUser();
    await fakeLoginUser();
  });
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(() => {
  shutDownDb();
});
