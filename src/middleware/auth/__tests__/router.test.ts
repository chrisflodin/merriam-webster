import { UserModel } from "../../../models/user";
import { IUser } from "../../../types/user";
import { shutDownDb, startDb } from "../../../utils/db";
import { promiseHandler } from "../../../utils/promise-handler";

describe("Authentication", () => {
  beforeAll(async () => {
    const mockUser: IUser = {
      email: "alba.cross@gmail.com",
      password: "1234",
      tokens: [],
    };

    await startDb();
    await UserModel.deleteMany();
    const user = new UserModel(mockUser);
    user.generateAuthToken!();
    const [err, savedUser] = await promiseHandler(user.save());
  });

  afterAll(async () => {
    await UserModel.deleteMany();
    await shutDownDb();
  });

  it("should log in the user", () => {});
});
