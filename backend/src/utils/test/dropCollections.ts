import mongoose from "mongoose";

const CONNECTED_STATE = 2;

export const dropCollections = async () => {
  mongoose.connections.forEach(async (con) => {
    if (con.readyState === CONNECTED_STATE) {
      if (!(await con.db)) return;

      const collections = await con.db.collections();
      collections.forEach(async (col) => {
        col.drop();
      });
    }
  });

  //   const collections = await mongoose.connection.db.collections();
  //   collections.forEach(async (col) => {
  //     await col.drop();
  //   });
};
