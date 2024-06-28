import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "project",
    })
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e));
};