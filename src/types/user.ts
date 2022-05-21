import { ObjectId } from "mongoose";

export default interface User {
  id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
}
