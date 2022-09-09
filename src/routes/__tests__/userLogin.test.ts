it("is Work in progress!", () => {});

// import request from "supertest";
// import { createApp } from "../../app";
// import { shutDownDb, startDb } from "../../utils/db";
// import { createUser, deleteAllUsers } from "../../services/user";
// import { Credentials } from "../../types/user";
// import mongoose from "mongoose";
// import { UserModel } from "../../models/user";

// interface SaveUserResponse {
//   user: {
//     email: string;
//     _id: string;
//     password: string;
//   };
//   token: string;
// }

// const app = createApp();

// const userCredentials: Credentials = {
//   email: "chris.flodinn@gmail.com",
//   password: "1234",
// };

// describe("Route: /user/login", () => {
//   beforeAll(async () => {
//     await startDb();
//   });

//   afterEach(async () => {
//     await deleteAllUsers();
//   });

//   afterAll(async () => {
//     await shutDownDb();
//   });

//   beforeEach(async () => {
//     await createUser(userCredentials);
//   });

//   describe("given user has valid credentials", () => {
//     it("should return a 200 status code", async () => {
//       await request(app).post("/user/login").send(userCredentials).expect(200);
//     });

//     it("should only return: EMAIL, ID, TOKEN", async () => {
//       const { body }: { status: number; body: SaveUserResponse } = await request(app)
//         .post("/user/login")
//         .send(userCredentials);

//       const { user } = body;

//       expect(Object.keys(body)).toEqual(["user", "token"]);
//       expect(body).toEqual(
//         expect.objectContaining({
//           user: expect.any(Object),
//           token: expect.any(String),
//         })
//       );

//       expect(Object.keys(user)).toEqual(["email", "_id"]);
//       expect(user).toEqual(
//         expect.objectContaining({
//           _id: expect.any(String),
//           email: expect.any(String),
//         })
//       );
//     });
//   });

//   describe("given user has invalid credentials", () => {
//     it("should return a 400 status code", async () => {
//       await request(app).post("/user/login").send({ email: "invalid email", password: "invalid password" }).expect(400);
//     });
//   });

//   describe("given user has no credentials", () => {
//     it("should return a 400 status code", async () => {
//       await request(app).post("/user/login").expect(400);
//     });
//   });
// });
