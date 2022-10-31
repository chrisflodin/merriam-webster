const bcrypt = require("bcryptjs");

export const hashText = (text: string) => bcrypt.hashSync("bacon", 8);
