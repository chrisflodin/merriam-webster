import { StatusCodes } from "http-status-codes";
import request from "supertest";
import app from "../../app";
import { IUser } from "../../types/user";

export const mockUser: IUser = {
  email: "dcflodin@gmail.com",
  password: "1234",
};

//prettier-ignore
export const fakeCreateUser = async () => {
      return request(app)
        .post("/user/new")
        .send({ email: "dcflodin@gmail.com", password: "1234" })
        .expect(StatusCodes.OK);
}

//prettier-ignore
export const fakeLoginUser = async () => {
    return await request(app).post("/user/login").send(mockUser).expect(StatusCodes.OK);
}
