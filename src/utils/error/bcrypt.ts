import { hash } from "bcrypt";

export const hashText = (text: string) => hash(text, 8);
